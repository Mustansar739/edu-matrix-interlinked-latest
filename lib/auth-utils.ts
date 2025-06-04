// ==========================================
// AUTH UTILITIES - NEXTAUTH V5 OFFICIAL HELPERS
// ==========================================

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import crypto from 'crypto';

// ==========================================
// SERVER-SIDE AUTH UTILITIES
// ==========================================

/**
 * Get current session on server side - Official NextAuth v5 method
 */
export async function getSession() {
  return await auth()
}

/**
 * Get current user on server side - Official NextAuth v5 method
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

/**
 * Require authentication - Redirect if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    redirect("/auth/signin")
  }
  
  return session
}

// ==========================================
// CLIENT-SIDE AUTH UTILITIES
// ==========================================

/**
 * Check if user is authenticated (client-side)
 */
export function isAuthenticated(session: any) {
  return !!session?.user
}

/**
 * Check if user is verified (client-side)
 */
export function isVerified(session: any) {
  return session?.user?.isVerified === true
}

// ==========================================
// TOKEN GENERATION UTILITIES
// ==========================================

/**
 * Generate a secure password reset token
 */
export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate a secure email verification token
 */
export function generateEmailVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate a secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash a password using crypto.pbkdf2Sync
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against its hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

/**
 * Generate a secure random string
 */
export function generateSecureString(length: number = 32): string {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

/**
 * Create a secure hash of a string
 */
export function createHash(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Verify a hash against input
 */
export function verifyHash(input: string, hash: string): boolean {
  return createHash(input) === hash;
}

/**
 * Generate a time-based expiration timestamp
 */
export function generateExpirationTime(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

/**
 * Check if a timestamp has expired
 */
export function isExpired(expirationTime: Date): boolean {
  return new Date() > expirationTime;
}
