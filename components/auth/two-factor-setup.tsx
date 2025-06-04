'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export function TwoFactorSetup() {
  const router = useRouter();
  const [step, setStep] = useState<'generate' | 'verify'>('generate');
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTwoFactor = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate 2FA setup');
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setSecret(data.secret);
      setStep('verify');
    } catch (error) {
      console.error('Error generating 2FA:', error);
      toast.error('Failed to generate 2FA setup');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: verificationCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }

      const data = await response.json();
      setBackupCodes(data.backupCodes);
      toast.success('Two-factor authentication enabled successfully!');
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      toast.error('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copySecret = async () => {
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    toast.success('Secret key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const copyBackupCodes = async () => {
    await navigator.clipboard.writeText(backupCodes.join('\n'));
    toast.success('Backup codes copied to clipboard');
  };

  const finishSetup = () => {
    router.push('/dashboard');
  };

  if (backupCodes.length > 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle>Two-Factor Authentication Enabled</CardTitle>
          <CardDescription>
            Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              {backupCodes.map((code, index) => (
                <div key={index} className="p-2 bg-white dark:bg-gray-700 rounded text-center">
                  {code}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={copyBackupCodes} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy Codes
            </Button>
            <Button onClick={finishSetup} className="flex-1">
              Complete Setup
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              Store these codes securely. They will not be shown again and each can only be used once.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle>Set Up Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 'generate' ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Two-factor authentication adds an extra layer of security to your account by requiring a code from your authenticator app when signing in.
            </p>
            <Button onClick={generateTwoFactor} disabled={isLoading} className="w-full">
              {isLoading ? 'Generating...' : 'Set Up 2FA'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              {qrCode && (
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeSVG value={qrCode} size={200} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secret">Or enter this secret key manually:</Label>
              <div className="flex gap-2">
                <Input 
                  id="secret"
                  value={secret} 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button 
                  onClick={copySecret} 
                  size="sm" 
                  variant="outline"
                  className="flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification">Enter verification code from your app:</Label>
              <Input
                id="verification"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            <Button 
              onClick={verifyAndEnable} 
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full"
            >
              {isLoading ? 'Verifying...' : 'Verify & Enable'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
