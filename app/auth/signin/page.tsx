import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Edu Matrix Interlinked",
  description: "Sign in to your Edu Matrix Interlinked account - connecting education, empowering futures",
}

export default function SignInPage() {
  return <LoginForm />
}
