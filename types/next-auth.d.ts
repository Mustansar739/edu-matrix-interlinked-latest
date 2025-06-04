declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string | null
      username: string
      institutionId?: string | null
      isVerified: boolean
    }
  }

  interface User {
    id: string
    email: string
    name: string
    image?: string | null
    username: string
    institutionId?: string | null
    isVerified: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    username: string
    institutionId?: string | null
    isVerified: boolean
  }
}
