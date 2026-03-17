'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { authService } from '../../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await authService.forgotPassword(email);
      setStatus('success');
      setMessage('If an account with that email exists, we have sent a password reset link.');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Failed to process request. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
              Reset Password
            </CardTitle>
            <p className="text-sm text-gray-500">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">{message}</p>
                <div className="pt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Return to login</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r animate-in fade-in zoom-in-95">
                    {message}
                  </div>
                )}
                
                <div className="space-y-4">
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  isLoading={status === 'loading'}
                >
                  Send Reset Link
                </Button>
              </form>
            )}
          </CardContent>
          
          {status !== 'success' && (
            <CardFooter className="flex justify-center bg-transparent border-t-0 pb-6">
              <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors flex items-center">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to log in
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
