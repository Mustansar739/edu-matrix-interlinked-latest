import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password | Edu Matrix",
  description: "Reset your Edu Matrix password",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
