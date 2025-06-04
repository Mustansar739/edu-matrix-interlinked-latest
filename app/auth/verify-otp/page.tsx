import { Suspense } from 'react';
import { OTPVerificationForm } from '@/components/auth/otp-verification-form';
import { Loader2 } from 'lucide-react';

function OTPVerificationContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <OTPVerificationForm purpose="login" />
    </div>
  );
}

export default function OTPVerificationPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <OTPVerificationContent />
    </Suspense>
  );
}
