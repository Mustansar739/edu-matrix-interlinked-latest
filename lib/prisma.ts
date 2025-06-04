// ==========================================
// PRISMA CLIENT INSTANCE - OFFICIAL SETUP
// ==========================================
// Singleton Prisma client for NextAuth.js v5

import { PrismaClient } from '@prisma/client'

// ==========================================
// GLOBAL PRISMA INSTANCE FOR NEXTAUTH V5
// ==========================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
