"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Eye, EyeOff, User, CheckCircle, Check, X, AlertCircle, GraduationCap, Network, BookOpen, Sparkles, RefreshCw, Clock } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { debounce } from "lodash"

interface UsernameCheckResult {
  available: boolean
  username: string
  message: string
  error?: string
  status?: string
  suggestions?: string[]
  note?: string
  details?: {
    reason: string
    timeRemainingHours: number
    suggestion: string
  }
}

interface UnverifiedAccountResponse {
  message: string
  status: string
  email: string
  username: string
  name: string
  timeRemainingMinutes: number
  options: {
    resendVerification: {
      action: string
      endpoint: string
      description: string
    }
    replaceAccount: {
      action: string
      endpoint: string
      description: string
    }
    continueWithExisting: {
      action: string
      description: string
    }
  }
}

interface PasswordValidation {
  minLength: boolean
  hasLetter: boolean
  hasNumber: boolean
  hasSpecial: boolean
  score: number
}

export function RegisterForm() {const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean
    result: UsernameCheckResult | null
  }>({ checking: false, result: null })
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false,
    score: 0
  })
  const [unverifiedAccount, setUnverifiedAccount] = useState<UnverifiedAccountResponse | null>(null)
  const [processingAction, setProcessingAction] = useState<string | null>(null)
  const router = useRouter()
  // Validate username format
  const validateUsernameFormat = (username: string): { valid: boolean; message?: string } => {
    if (username.length < 3) {
      return { valid: false, message: "Username must be at least 3 characters" }
    }
    
    if (username.length > 30) {
      return { valid: false, message: "Username must be no more than 30 characters" }
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return { valid: false, message: "Username can only contain letters, numbers, underscores, and hyphens" }
    }
      return { valid: true }
  }

  // Generate username from name and email
  const generateUsernameFromData = useCallback((firstName: string, lastName: string, email: string): string => {
    // Clean and prepare base components
    const cleanFirstName = firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const cleanLastName = lastName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    
    // Generate different username patterns (client-side suggestions)
    const patterns = [
      `${cleanFirstName}${cleanLastName}`,
      `${cleanFirstName}.${cleanLastName}`,
      `${cleanFirstName}_${cleanLastName}`,
      `${cleanFirstName}${cleanLastName.charAt(0)}`,
      `${cleanFirstName.charAt(0)}${cleanLastName}`,
      `${emailPrefix}`,
      `${cleanFirstName}${cleanLastName}${new Date().getFullYear()}`,
      `${cleanFirstName}${cleanLastName}edu`,
    ]
    
    // Return first valid pattern (length >= 3)
    for (const pattern of patterns) {
      if (pattern.length >= 3) {
        return pattern
      }
    }
    
    // Fallback
    return `user${Date.now().toString().slice(-6)}`
  }, [])

  // Simple username generation function
  const generateSimpleUsername = (name: string, email: string) => {
    const firstName = name.trim().split(' ')[0] || ''
    const emailPrefix = email.split('@')[0] || ''
    
    const cleanName = firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const cleanEmail = emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '')
    
    // Just generate a different random number each time
    const randomNum = Math.floor(Math.random() * 99999) + 1000
    
    let username = ''
    if (cleanName.length >= 2) {
      username = `${cleanName}${randomNum}`
    } else if (cleanEmail.length >= 2) {
      username = `${cleanEmail}${randomNum}`
    } else {
      username = `user${randomNum}`
    }
    
    return username
  }
  // Debounced username availability check (faster response)
  const checkUsernameAvailability = useCallback(
    debounce(async (username: string) => {
      if (username.length < 3) {
        setUsernameStatus({ checking: false, result: null })
        return
      }

      // Validate format first
      const formatValidation = validateUsernameFormat(username)
      if (!formatValidation.valid) {
        setUsernameStatus({
          checking: false,
          result: {
            available: false,
            username,
            message: formatValidation.message || "Invalid username format",
            error: "validation_failed"
          }
        })
        return
      }

      setUsernameStatus(prev => ({ ...prev, checking: true }))

      try {
        const response = await axios.post("/api/auth/check-username", { username })
        setUsernameStatus({
          checking: false,
          result: response.data
        })
      } catch (error: any) {
        console.error("Username check error:", error)
        
        // Handle API validation errors
        if (error.response?.status === 400 && error.response?.data) {
          setUsernameStatus({
            checking: false,
            result: error.response.data
          })
        } else {
          setUsernameStatus({
            checking: false,
            result: {
              available: false,
              username,
              message: "Error checking username availability",
              error: "Network error"
            }
          })
        }      }
    }, 300), // Reduced from 500ms to 300ms for faster response
    []
  )

  // Validate password strength (made very easy)
  const validatePassword = useCallback((password: string): PasswordValidation => {
    const minLength = password.length >= 6 // Easy: just 6 characters
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    let score = 0
    if (minLength) score++
    if (hasLetter) score++
    if (hasNumber) score++
    if (hasSpecial) score++

    return {
      minLength,
      hasLetter,
      hasNumber,
      hasSpecial,
      score
    }
  }, [])  // Smart username generator with progressive digit retry
  const generateSmartUsername = async (firstName: string, lastName: string, attemptCount: number = 0): Promise<string> => {
    const cleanFirstName = firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const cleanLastName = lastName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const baseUsername = cleanFirstName + cleanLastName
    
    // If this is the first attempt, try without any digits
    if (attemptCount === 0) {
      return baseUsername
    }
    
    // Progressive digit count: 3 → 4 → 5 → 6 digits max
    const digitCount = Math.min(2 + attemptCount, 6)
    const maxNumber = Math.pow(10, digitCount) - 1
    const minNumber = Math.pow(10, digitCount - 1)
    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
    
    return `${baseUsername}${randomNumber}`
  }

  // Generate and check username availability with retry logic
  const generateAndCheckUsername = async (firstName: string, lastName: string, maxAttempts: number = 5) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const candidateUsername = await generateSmartUsername(firstName, lastName, attempt)
      
      try {
        const response = await axios.post('/api/auth/check-username', {
          username: candidateUsername
        })
        
        if (response.data.available) {
          return candidateUsername // Found available username
        }
      } catch (error) {
        console.error('Username check failed:', error)
        // Continue to next attempt on error
      }
    }
    
    // If all attempts failed, return a timestamped username as fallback
    const timestamp = Date.now().toString().slice(-6)
    return `${firstName.toLowerCase()}${lastName.toLowerCase()}${timestamp}`  }

  // Manual username regeneration button handler
  const regenerateUsername = useCallback(async () => {    if (formData.firstName && formData.lastName) {
      setUsernameStatus({ checking: true, result: null })
      
      try {
        const newUsername = await generateAndCheckUsername(formData.firstName, formData.lastName)
        setFormData(prev => ({ ...prev, username: newUsername }))
        // Final check to update UI state
        setTimeout(() => checkUsernameAvailability(newUsername), 100)
      } catch (error) {
        console.error('Failed to generate username:', error)
        setUsernameStatus({ 
          checking: false, 
          result: { available: false, username: '', message: "Failed to generate username. Please try again." }
        })
      }
    }
  }, [formData.firstName, formData.lastName])
  // Handle input changes
  const handleInputChange = async (field: string, value: string) => {
    console.log('📝 Form field changed:', { field, value });
    
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    setTouchedFields(prev => ({ ...prev, [field]: true }))

    // Auto-generate username when firstName or lastName changes (if username is empty)
    if ((field === 'firstName' || field === 'lastName') && !formData.username) {
      const firstName = field === 'firstName' ? value : newFormData.firstName
      const lastName = field === 'lastName' ? value : newFormData.lastName
      
      if (firstName.length >= 2 && lastName.length >= 2) {
        setUsernameStatus({ checking: true, result: null })
        
        try {
          const generatedUsername = await generateAndCheckUsername(firstName, lastName)
          setFormData(prev => ({ ...prev, username: generatedUsername }))
          // Check availability to update UI state
          setTimeout(() => checkUsernameAvailability(generatedUsername), 200)
        } catch (error) {
          console.error('Auto-generation failed:', error)
        }
      }
    }

    // Clear general error when user starts typing/selecting
    if (error) {
      setError("")
    }

    // Real-time username checking
    if (field === "username") {
      checkUsernameAvailability(value)    }

    // Real-time password validation
    if (field === "password") {
      setPasswordValidation(validatePassword(value))
    }
  }

  // Validate form
  const validateForm = () => {
    // Check individual fields with specific messages
    if (!formData.email) {
      setError("Email address is required")
      return false
    }
    
    if (!formData.username) {
      setError("Username is required")
      return false
    }
    
    if (!formData.password) {
      setError("Password is required")
      return false
    }
      if (!formData.firstName) {
      setError("First name is required")
      return false
    }
      if (!formData.lastName) {
      setError("Last name is required")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    // Easy password requirement: just 2 out of 4 criteria
    if (passwordValidation.score < 2) {
      setError("Password must meet at least 2 requirements (6+ characters, letter, number, or special character)")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }    if (usernameStatus.result && !usernameStatus.result.available) {
      // Allow temporarily reserved usernames to proceed (they'll be cleaned up during registration)
      if (usernameStatus.result.status !== 'temporarily_reserved') {
        setError("Please choose an available username")
        return false
      }
    }return true
  }
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Form submission attempted with data:', formData);
    setIsLoading(true)
    setError("")    // Mark all fields as touched to show validation errors
    setTouchedFields({
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
      name: true
    })

    if (!validateForm()) {
      console.log('❌ Form validation failed');
      setIsLoading(false)
      return
    }    console.log('✅ Form validation passed, proceeding with registration');    try {      console.log("🔍 Submitting registration for user:", formData.email)
      
      const response = await axios.post("/api/auth/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })

      console.log("✅ Registration response:", response.data)

      // Handle successful registration
      if (response.status === 201) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      }

      // Handle unverified account found scenario
      if (response.status === 200 && response.data.status === "unverified_account_found") {
        setUnverifiedAccount(response.data)
        setError("") // Clear any previous errors
        console.log("🔍 Unverified account found, showing options to user")
      }

    } catch (error: any) {
      console.error("❌ Registration error:", error.response?.data || error.message)
      
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }


  // Handle unverified account actions
  const handleResendVerification = async () => {
    if (!unverifiedAccount) return
    
    setProcessingAction("resend_verification")
    try {
      const response = await axios.post("/api/auth/resend-verification", {
        email: unverifiedAccount.email
      })
      
      setError("")
      setSuccess(true)
      console.log("✅ Verification email resent successfully")
      
      // Show success message and redirect
      setTimeout(() => {
        router.push("/auth/signin")
      }, 3000)
      
    } catch (error: any) {
      console.error("❌ Failed to resend verification:", error.response?.data || error.message)
      setError(error.response?.data?.message || "Failed to resend verification email")
    } finally {
      setProcessingAction(null)
    }
  }

  const handleReplaceAccount = async () => {
    if (!unverifiedAccount) return
    
    setProcessingAction("replace_account")
    try {
      // First delete the unverified account
      const deleteResponse = await axios.post("/api/auth/replace-unverified", {
        email: unverifiedAccount.email,
        confirmReplace: true
      })
      
      console.log("✅ Unverified account replaced successfully")
        // Now try registration again
      const response = await axios.post("/api/auth/register", {
        email: formData.email,
        username: formData.username,        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })

      if (response.status === 201) {
        setUnverifiedAccount(null) // Clear the unverified account state
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      }
      
    } catch (error: any) {
      console.error("❌ Failed to replace account:", error.response?.data || error.message)
      setError(error.response?.data?.message || "Failed to replace unverified account")
    } finally {
      setProcessingAction(null)
    }
  }

  const handleContinueWithExisting = () => {
    // Clear the unverified account state and redirect to sign in
    setUnverifiedAccount(null)
    router.push("/auth/signin")
  }

  const handleTryDifferentCredentials = () => {
    // Clear the unverified account state and let user try different credentials
    setUnverifiedAccount(null)
    setError("")
    setFormData(prev => ({ ...prev, email: "", username: "" }))
  }

  const getPasswordStrengthColor = () => {
    if (passwordValidation.score <= 1) return "text-red-500"
    if (passwordValidation.score === 2) return "text-yellow-500"
    if (passwordValidation.score === 3) return "text-blue-500"
    return "text-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordValidation.score <= 1) return "Weak"
    if (passwordValidation.score === 2) return "Fair"
    if (passwordValidation.score === 3) return "Good"
    return "Strong"  }
  
  // Show unverified account options if found
  if (unverifiedAccount) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100 p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-bold text-center text-orange-800">
                Account Already Exists
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-sm">
                We found an unverified account with this email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-800">Account Found</h3>
                </div>
                <div className="text-sm text-orange-700 space-y-1">
                  <p><strong>Email:</strong> {unverifiedAccount.email}</p>
                  <p><strong>Username:</strong> {unverifiedAccount.username}</p>
                  <p><strong>Name:</strong> {unverifiedAccount.name}</p>
                  <p><strong>Time remaining:</strong> {unverifiedAccount.timeRemainingMinutes} minutes</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-800 text-center">What would you like to do?</h4>
                
                {/* Resend Verification Option */}
                <Button
                  onClick={handleResendVerification}
                  disabled={processingAction === "resend_verification"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {processingAction === "resend_verification" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                {/* Replace Account Option */}
                <Button
                  onClick={handleReplaceAccount}
                  disabled={processingAction === "replace_account"}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  {processingAction === "replace_account" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Replacing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create New Account (Replace Old)
                    </>
                  )}
                </Button>

                {/* Continue with Existing Option */}
                <Button
                  onClick={handleContinueWithExisting}
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check Email & Verify Existing Account
                </Button>

                {/* Try Different Credentials Option */}
                <Button
                  onClick={handleTryDifferentCredentials}
                  variant="ghost"
                  className="w-full text-gray-600 hover:bg-gray-50"
                >
                  <User className="mr-2 h-4 w-4" />
                  Try Different Email/Username
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-300 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800 text-sm">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 p-6">
          <div className="w-full max-w-sm">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6 pb-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                  <div>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h2>
                    <p className="text-gray-600 mb-4">
                      Welcome to Edu Matrix Interlinked, {formData.firstName} {formData.lastName}!
                    </p>
                    <p className="text-gray-500 text-sm">
                      Please check your email to verify your account before signing in.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium">
                      🎉 Your educational journey begins now!
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Redirecting to sign in page in a few seconds...                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-6">
        <div className="w-full max-w-sm">          {/* Mobile Brand Header */}
          <div className="lg:hidden text-center mb-3">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="relative">
                <GraduationCap className="h-6 w-6 text-purple-600" />
                <Network className="h-3 w-3 text-purple-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  Edu Matrix
                </h1>
                <p className="text-xs text-purple-600 font-medium tracking-wide">
                  Interlinked
                </p>
              </div>
            </div>
          </div>          
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-bold text-center text-gray-900">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-xs">
                Join the Next Gen Edu Matrix interlinked today
              </CardDescription>
            </CardHeader>
              <CardContent className="space-y-1">
              {error && (
                <Alert variant="destructive" className="border-red-300 bg-red-50 mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800 text-sm font-medium">{error}</AlertDescription>
                </Alert>
              )}              <form onSubmit={handleSubmit} className="space-y-3">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10 h-9 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10 h-9 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 h-9 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>                {/* Username with availability check */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="username" className="text-gray-700 font-medium text-sm">Username</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={regenerateUsername}
                      disabled={!formData.firstName || !formData.lastName || !formData.email}
                      className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Generate New
                    </Button>
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />                    <Input
                      id="username"
                      type="text"
                      placeholder="Auto-generated (you can edit)"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className={`pl-10 pr-9 h-9 text-sm transition-all duration-200 ${
                        usernameStatus.checking ? 'border-blue-300 ring-1 ring-blue-200' :
                        usernameStatus.result?.available === false ? 'border-red-300 ring-1 ring-red-200' :
                        usernameStatus.result?.available === true ? 'border-green-300 ring-1 ring-green-200' : 
                        'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                      }`}
                      required
                    />                    <div className="absolute right-3 top-2.5 h-4 w-4">
                      {usernameStatus.checking ? (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        </div>
                      ) : usernameStatus.result?.available === true ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : usernameStatus.result?.available === false ? (
                        <X className="h-4 w-4 text-red-500" />
                      ) : formData.username.length >= 3 ? (
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="h-1 w-1 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                      ) : null}
                    </div>
                  </div>                  {(usernameStatus.checking || (usernameStatus.result && formData.username.length >= 3)) && (
                    <div className="space-y-2 animate-in fade-in-0 duration-300">
                      {usernameStatus.checking ? (
                        <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Checking availability...
                        </div>
                      ) : usernameStatus.result && (                        <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-200 ${
                          usernameStatus.result.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {usernameStatus.result.available ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          {usernameStatus.result.message}
                        </div>                      )}
                    </div>
                  )}
                  {!formData.username && formData.firstName && formData.lastName && formData.email && (
                    <p className="text-xs text-blue-600">
                      💡 Username will be auto-generated based on your name and email
                    </p>
                  )}                </div>

                {/* Password with strength indicator */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-gray-700 font-medium text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-9 h-9 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-9 h-9 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300' : ''
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600">Passwords do not match</p>
                  )}                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-9 text-sm bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 shadow-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-1 ">
              <div className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-purple-600 hover:text-purple-800 hover:underline font-semibold transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </div>
              
              <div className="text-xs text-center text-gray-500 ">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Edu Matrix Interlinked. All rights reserved.</p>
          </div>
        </div>
      </div>
    )
  }
