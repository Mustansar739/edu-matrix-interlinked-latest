import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password | Edu Matrix",
  description: "Reset your Edu Matrix password",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
