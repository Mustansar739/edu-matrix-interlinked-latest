"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle, Mail, RefreshCw } from "lucide-react"
import Link from "next/link"
import axios from "axios"

export function EmailVerificationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [resendEmail, setResendEmail] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    }
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post("/api/auth/verify-email", {
        token: verificationToken
      })

      setIsVerified(true)
      
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        router.push("/auth/signin?message=Email verified successfully! Please sign in.")
      }, 3000)

    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Failed to verify email. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResending(true)
    setError("")
    setResendSuccess(false)

    try {
      await axios.put("/api/auth/verify-email", {
        email: resendEmail
      })

      setResendSuccess(true)
      setResendEmail("")
      
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Failed to resend verification email. Please try again.")
      }
    } finally {
      setIsResending(false)
    }
  }

  // Success state
  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-bold text-green-800">Email Verified!</h2>
              <p className="text-muted-foreground">
                Your email has been successfully verified. Welcome to Edu Matrix!
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to sign in page...
              </p>
              <div className="pt-4">
                <Link href="/auth/signin">
                  <Button className="w-full">
                    Continue to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Loading state for token verification
  if (isLoading && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-blue-500" />
              <h2 className="text-2xl font-bold">Verifying Email...</h2>
              <p className="text-muted-foreground">
                Please wait while we verify your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main verification page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {token && error ? (
              <>
                <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
                Verification Failed
              </>
            ) : (
              <>
                <Mail className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                Verify Your Email
              </>
            )}
          </CardTitle>
          <CardDescription className="text-center">
            {token && error 
              ? "There was a problem verifying your email address."
              : "Check your email for a verification link, or resend it below."
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Verification email sent successfully! Please check your inbox.
              </AlertDescription>
            </Alert>
          )}

          {!token && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Didn't receive the email?</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your email address below and we'll resend the verification link.
                </p>
              </div>

              <form onSubmit={handleResendVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resend-email">Email Address</Label>
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="Enter your email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isResending}>
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {token && error && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  The verification link may have expired or is invalid. 
                  You can request a new verification email below.
                </p>
              </div>

              <form onSubmit={handleResendVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resend-email">Email Address</Label>
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="Enter your email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isResending}>
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Send New Verification Email
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </CardContent>

        <div className="px-6 pb-6">
          <div className="text-sm text-center text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/auth/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
