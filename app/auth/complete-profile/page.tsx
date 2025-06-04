import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile Complete | Edu Matrix Interlinked",
  description: "Your profile is complete",
}

export default async function CompleteProfilePage() {
  const session = await auth()
  
  // Redirect to sign in if not authenticated
  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Since we removed profession selection, redirect everyone to dashboard
  redirect("/dashboard")
}
