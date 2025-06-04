// nextauth 5 latest official setup
// 
import NextAuth, { type User, type Session } from "next-auth"
import { type JWT } from "next-auth/jwt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { hashPassword, verifyPassword } from "@/lib/password-utils"
import { generateUniqueUsername } from "@/lib/username-generator"
import { generateVerificationToken, generateTokenExpiration } from "@/lib/verification-utils"
import { emailService } from "@/lib/email"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const { email, password, name, action } = credentials

        // Handle Registration
        if (action === "register") {
          if (!name) {
            throw new Error("Name is required for registration")
          }

          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: email as string }
          })

          if (existingUser) {
            throw new Error("User with this email already exists")
          }

          // Generate username from name and email using our utility
          const nameParts = (name as string).split(' ')
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''
          const username = await generateUniqueUsername(firstName, lastName, email as string)

          // Create new user with proper verification flow
          const hashedPassword = await hashPassword(password as string)
          
          // Generate verification token and expiration
          const verificationToken = generateVerificationToken()
          const tokenExpiration = generateTokenExpiration()
          
          const newUser = await prisma.user.create({
            data: {
              email: email as string,
              username: username,
              password: hashedPassword,
              name: name as string,
              isVerified: false, // Require email verification
              emailVerificationToken: verificationToken,
              emailVerificationExpires: tokenExpiration,
            }
          })
          
          // Send verification email
          await emailService.sendEmailVerification({
            email: newUser.email,
            name: newUser.name,
            verificationToken
          })

          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            username: newUser.username,
            isVerified: newUser.isVerified
          }
        }

        // Handle Sign In with verification check
        const user = await prisma.user.findUnique({
          where: { email: email as string }
        })

        if (!user || !user.password) {
          throw new Error("Invalid email or password")
        }

        const isPasswordValid = await verifyPassword(password as string, user.password)
        if (!isPasswordValid) {
          throw new Error("Invalid email or password")
        }
        
        // Check if email is verified
        if (!user.isVerified) {
          // If the token is expired, generate a new one and send a new email
          if (user.emailVerificationExpires && new Date() > user.emailVerificationExpires) {
            const newToken = generateVerificationToken()
            const newExpiration = generateTokenExpiration()
            
            await prisma.user.update({
              where: { id: user.id },
              data: {
                emailVerificationToken: newToken,
                emailVerificationExpires: newExpiration
              }
            })
            
            // Send a new verification email
            await emailService.sendEmailVerification({
              email: user.email,
              name: user.name,
              verificationToken: newToken
            })
            
            throw new Error("Email not verified. A new verification email has been sent.")
          } else {
            throw new Error("Email not verified. Please check your email for verification link.")
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          isVerified: user.isVerified
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },  callbacks: {
    async signIn({ user }: { user: User }) {
      // Only allow credentials sign-in now
      return true
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.username) {
        session.user.username = token.username as string
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user?.username) {
        token.username = user.username
      }
      return token
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours - refresh session every day
  },  // Add custom verification handling
  events: {
    async signIn({ user }: { user: User }) {
      // Update last login timestamp
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            lastLogin: new Date(),
            loginCount: { increment: 1 }          }
        });      }
    }
  }
})
