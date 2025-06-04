// ==========================================
// NEXTAUTH.JS V5 API ROUTE - OFFICIAL SETUP
// ==========================================
// Official NextAuth.js v5 API route handler

import { handlers } from "@/lib/auth"

// Export the handlers for Next.js App Router
export const { GET, POST } = handlers
