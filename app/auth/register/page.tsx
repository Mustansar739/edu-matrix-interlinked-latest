import { RegisterForm } from "@/components/auth/register-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | Edu Matrix Interlinked",
  description: "Create your Edu Matrix Interlinked account and join the educational revolution",
}

export default function RegisterPage() {
  return <RegisterForm />
}
