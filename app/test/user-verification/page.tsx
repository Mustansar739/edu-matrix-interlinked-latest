import UserModuleVerificationComponent from '@/components/testing/user-module-verification';

export default function UserModuleVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Module Verification System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive verification system to ensure each user has proper access to all 12 modules 
            in the Edu Matrix Interlinked ecosystem. Verify connections, identify issues, and 
            automatically setup missing module access.
          </p>
        </div>
        
        <UserModuleVerificationComponent />
      </div>
    </div>
  );
}
