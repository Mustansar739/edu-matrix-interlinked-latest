import { EmailVerificationForm } from "@/components/auth/email-verification-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify Email | Edu Matrix Interlinked",
  description: "Verify your email address to complete registration",
}

export default function VerifyEmailPage() {
  return <EmailVerificationForm />
}
