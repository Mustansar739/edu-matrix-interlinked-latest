/**
 * ==========================================
 * UNIFIED PROFESSION CONFIGURATION
 * ==========================================
 * Single source of truth for all profession definitions
 * Uses Prisma's UserProfession enum as the canonical source
 */

import { UserProfession } from "@prisma/client"

// Profession display configuration
export interface ProfessionOption {
  value: UserProfession
  label: string
  category: string
  description?: string
}

// Unified profession configuration - SINGLE SOURCE OF TRUTH
export const PROFESSION_CONFIG: ProfessionOption[] = [
  // Medical & Healthcare
  { value: UserProfession.DOCTOR, label: "Doctor", category: "Medical & Healthcare" },
  { value: UserProfession.NURSE, label: "Nurse", category: "Medical & Healthcare" },
  { value: UserProfession.PHARMACIST, label: "Pharmacist", category: "Medical & Healthcare" },
  { value: UserProfession.DENTIST, label: "Dentist", category: "Medical & Healthcare" },
  { value: UserProfession.THERAPIST, label: "Therapist", category: "Medical & Healthcare" },
  { value: UserProfession.MEDICAL_TECHNICIAN, label: "Medical Technician", category: "Medical & Healthcare" },
  { value: UserProfession.HEALTHCARE_ADMIN, label: "Healthcare Administrator", category: "Medical & Healthcare" },

  // Education
  { value: UserProfession.TEACHER, label: "Teacher", category: "Education" },
  { value: UserProfession.PROFESSOR, label: "Professor", category: "Education" },
  { value: UserProfession.PRINCIPAL, label: "Principal", category: "Education" },
  { value: UserProfession.STUDENT, label: "Student", category: "Education" },
  { value: UserProfession.RESEARCHER, label: "Researcher", category: "Education" },
  { value: UserProfession.ACADEMIC_ADMIN, label: "Academic Administrator", category: "Education" },
  { value: UserProfession.TUTOR, label: "Tutor", category: "Education" },

  // Technology & Engineering
  { value: UserProfession.SOFTWARE_ENGINEER, label: "Software Engineer", category: "Technology & Engineering" },
  { value: UserProfession.DATA_SCIENTIST, label: "Data Scientist", category: "Technology & Engineering" },
  { value: UserProfession.SYSTEM_ADMIN, label: "System Administrator", category: "Technology & Engineering" },
  { value: UserProfession.WEB_DEVELOPER, label: "Web Developer", category: "Technology & Engineering" },
  { value: UserProfession.MOBILE_DEVELOPER, label: "Mobile Developer", category: "Technology & Engineering" },
  { value: UserProfession.DEVOPS_ENGINEER, label: "DevOps Engineer", category: "Technology & Engineering" },
  { value: UserProfession.CYBERSECURITY_EXPERT, label: "Cybersecurity Expert", category: "Technology & Engineering" },
  { value: UserProfession.NETWORK_ENGINEER, label: "Network Engineer", category: "Technology & Engineering" },

  // Business & Finance
  { value: UserProfession.BUSINESS_ANALYST, label: "Business Analyst", category: "Business & Finance" },
  { value: UserProfession.PROJECT_MANAGER, label: "Project Manager", category: "Business & Finance" },
  { value: UserProfession.ACCOUNTANT, label: "Accountant", category: "Business & Finance" },
  { value: UserProfession.FINANCIAL_ADVISOR, label: "Financial Advisor", category: "Business & Finance" },
  { value: UserProfession.MARKETING_SPECIALIST, label: "Marketing Specialist", category: "Business & Finance" },
  { value: UserProfession.SALES_REPRESENTATIVE, label: "Sales Representative", category: "Business & Finance" },
  { value: UserProfession.HR_SPECIALIST, label: "HR Specialist", category: "Business & Finance" },
  { value: UserProfession.ENTREPRENEUR, label: "Entrepreneur", category: "Business & Finance" },

  // Legal & Government
  { value: UserProfession.LAWYER, label: "Lawyer", category: "Legal & Government" },
  { value: UserProfession.JUDGE, label: "Judge", category: "Legal & Government" },
  { value: UserProfession.PARALEGAL, label: "Paralegal", category: "Legal & Government" },
  { value: UserProfession.GOVERNMENT_OFFICER, label: "Government Officer", category: "Legal & Government" },
  { value: UserProfession.POLICY_ANALYST, label: "Policy Analyst", category: "Legal & Government" },

  // Arts & Media
  { value: UserProfession.GRAPHIC_DESIGNER, label: "Graphic Designer", category: "Arts & Media" },
  { value: UserProfession.CONTENT_WRITER, label: "Content Writer", category: "Arts & Media" },
  { value: UserProfession.PHOTOGRAPHER, label: "Photographer", category: "Arts & Media" },
  { value: UserProfession.VIDEO_EDITOR, label: "Video Editor", category: "Arts & Media" },
  { value: UserProfession.ARTIST, label: "Artist", category: "Arts & Media" },
  { value: UserProfession.MUSICIAN, label: "Musician", category: "Arts & Media" },

  // Trades & Services
  { value: UserProfession.ELECTRICIAN, label: "Electrician", category: "Trades & Services" },
  { value: UserProfession.PLUMBER, label: "Plumber", category: "Trades & Services" },
  { value: UserProfession.CARPENTER, label: "Carpenter", category: "Trades & Services" },
  { value: UserProfession.MECHANIC, label: "Mechanic", category: "Trades & Services" },
  { value: UserProfession.CHEF, label: "Chef", category: "Trades & Services" },
  { value: UserProfession.FARMER, label: "Farmer", category: "Trades & Services" },
  { value: UserProfession.CONSTRUCTION_WORKER, label: "Construction Worker", category: "Trades & Services" },

  // Other Professions
  { value: UserProfession.CONSULTANT, label: "Consultant", category: "Professional Services" },
  { value: UserProfession.FREELANCER, label: "Freelancer", category: "Professional Services" },
  { value: UserProfession.RETIRED, label: "Retired", category: "Other" },
  { value: UserProfession.UNEMPLOYED, label: "Unemployed", category: "Other" },
  { value: UserProfession.OTHER, label: "Other", category: "Other" },
]

// Group professions by category
export const PROFESSIONS_BY_CATEGORY = PROFESSION_CONFIG.reduce((acc, profession) => {
  if (!acc[profession.category]) {
    acc[profession.category] = []
  }
  acc[profession.category].push(profession)
  return acc
}, {} as Record<string, ProfessionOption[]>)

// Get all categories
export const PROFESSION_CATEGORIES = Object.keys(PROFESSIONS_BY_CATEGORY)

// Utility functions
export function getProfessionLabel(value: UserProfession): string {
  return PROFESSION_CONFIG.find(p => p.value === value)?.label || value
}

export function getProfessionCategory(value: UserProfession): string {
  return PROFESSION_CONFIG.find(p => p.value === value)?.category || "Other"
}

export function getProfessionsByCategory(category: string): ProfessionOption[] {
  return PROFESSIONS_BY_CATEGORY[category] || []
}

export function getAllProfessions(): ProfessionOption[] {
  return PROFESSION_CONFIG
}
