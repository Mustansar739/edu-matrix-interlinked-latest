import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { TwoFactorSetup } from '@/components/auth/two-factor-setup';
import { Loader2 } from 'lucide-react';

async function TwoFactorSetupContent() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <TwoFactorSetup />
    </div>
  );
}

export default function TwoFactorSetupPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <TwoFactorSetupContent />
    </Suspense>
  );
}
