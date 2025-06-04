'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, User, Database, Shield, Users, BookOpen, Briefcase, DollarSign, Newspaper, MessageSquare, Bell, BarChart3, Building } from 'lucide-react';

interface ModuleVerificationResult {
  userId: string;
  hasAuthAccess: boolean;
  hasSocialAccess: boolean;
  hasCoursesAccess: boolean;
  hasJobsAccess: boolean;
  hasFreelancingAccess: boolean;
  hasNewsAccess: boolean;
  hasCommunityAccess: boolean;
  hasMessagingAccess: boolean;
  hasNotificationsAccess: boolean;
  hasStatisticsAccess: boolean;
  hasHubAccess: boolean;
  institutionConnections: string[];
  departmentConnections: string[];
  permissions: string[];
  missingConnections: string[];
}

const moduleConfig = [
  { key: 'hasAuthAccess', name: 'Authentication', icon: Shield, color: 'bg-blue-500' },
  { key: 'hasSocialAccess', name: 'Social Network', icon: Users, color: 'bg-purple-500' },
  { key: 'hasCoursesAccess', name: 'Courses', icon: BookOpen, color: 'bg-green-500' },
  { key: 'hasJobsAccess', name: 'Jobs', icon: Briefcase, color: 'bg-orange-500' },
  { key: 'hasFreelancingAccess', name: 'Freelancing', icon: DollarSign, color: 'bg-yellow-500' },
  { key: 'hasNewsAccess', name: 'News', icon: Newspaper, color: 'bg-red-500' },
  { key: 'hasCommunityAccess', name: 'Community', icon: MessageSquare, color: 'bg-indigo-500' },
  { key: 'hasMessagingAccess', name: 'Messaging', icon: MessageSquare, color: 'bg-pink-500' },
  { key: 'hasNotificationsAccess', name: 'Notifications', icon: Bell, color: 'bg-cyan-500' },
  { key: 'hasStatisticsAccess', name: 'Analytics', icon: BarChart3, color: 'bg-teal-500' },
  { key: 'hasHubAccess', name: 'Institution Hub', icon: Building, color: 'bg-slate-500' },
];

export default function UserModuleVerificationComponent() {
  const [userId, setUserId] = useState('');
  const [verificationResult, setVerificationResult] = useState<ModuleVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyUser = async () => {
    if (!userId.trim()) {
      setError('Please enter a valid User ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-user-modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify user modules');
      }

      const result = await response.json();
      setVerificationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupMissingConnections = async () => {
    if (!verificationResult) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/setup-user-modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: verificationResult.userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to setup user modules');
      }

      // Re-verify after setup
      await handleVerifyUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during setup');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessCount = () => {
    if (!verificationResult) return { total: 0, connected: 0 };
    
    const total = moduleConfig.length;
    const connected = moduleConfig.filter(module => 
      verificationResult[module.key as keyof ModuleVerificationResult] === true
    ).length;
    
    return { total, connected };
  };

  const { total, connected } = getAccessCount();
  const connectionPercentage = total > 0 ? Math.round((connected / total) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            User Module Connection Verification
          </CardTitle>
          <CardDescription>
            Verify that each user has proper access to all 12 modules in the Edu Matrix Interlinked system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter User ID to verify"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleVerifyUser} 
              disabled={isLoading}
              className="px-6"
            >
              {isLoading ? 'Verifying...' : 'Verify Access'}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {verificationResult && (
        <>
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Verification Summary
                </span>
                <Badge variant={verificationResult.missingConnections.length === 0 ? "default" : "destructive"}>
                  {connectionPercentage}% Connected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Module Access</p>
                  <p className="text-2xl font-bold">{connected}/{total}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${connectionPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Institution Connections</p>
                  <p className="text-2xl font-bold">{verificationResult.institutionConnections.length}</p>
                  <p className="text-xs text-gray-500">Active memberships</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Permissions</p>
                  <p className="text-2xl font-bold">{verificationResult.permissions.length}</p>
                  <p className="text-xs text-gray-500">Active permissions</p>
                </div>
              </div>

              {verificationResult.missingConnections.length > 0 && (
                <div className="mt-4">
                  <Alert>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      Missing connections: {verificationResult.missingConnections.join(', ')}
                      <Button 
                        onClick={handleSetupMissingConnections}
                        disabled={isLoading}
                        className="ml-4"
                        size="sm"
                      >
                        Auto-Setup Missing Connections
                      </Button>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Module Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleConfig.map((module) => {
              const hasAccess = verificationResult[module.key as keyof ModuleVerificationResult] as boolean;
              const Icon = module.icon;
              
              return (
                <Card key={module.key} className={`border-l-4 ${hasAccess ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${module.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{module.name}</h3>
                          <p className="text-xs text-gray-500">{module.key.replace('has', '').replace('Access', '')}</p>
                        </div>
                      </div>
                      {hasAccess ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Institution Connections</CardTitle>
              </CardHeader>
              <CardContent>
                {verificationResult.institutionConnections.length > 0 ? (
                  <div className="space-y-2">
                    {verificationResult.institutionConnections.map((institutionId, index) => (
                      <Badge key={index} variant="outline">
                        {institutionId}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No institution connections</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                {verificationResult.permissions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {verificationResult.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No active permissions</p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
