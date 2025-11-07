'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { LogIn, Mail, Lock, AlertCircle, Loader2, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-white/70">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-600)] text-white py-3 px-4 rounded-lg hover:bg-[var(--color-brand-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-500)] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            {/* Register Link - Prominent */}
            <div className="text-center p-4 bg-gradient-to-r from-[var(--color-brand-50)] to-[var(--color-accent-50)] rounded-lg border border-[var(--color-brand-200)]">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Don&apos;t have an account yet?
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 px-6 py-2 bg-[var(--color-brand-600)] text-white rounded-lg hover:bg-[var(--color-brand-700)] transition font-medium text-sm"
              >
                <UserPlus className="h-4 w-4" />
                Create Account - It&apos;s Free!
              </Link>
              <p className="text-xs text-gray-600 mt-2">
                Join us and enjoy faster checkout, order tracking, and exclusive offers
              </p>
            </div>
            
            {/* Back to Home */}
            <p className="text-sm text-center">
              <Link 
                href="/" 
                className="text-gray-500 hover:text-gray-700 transition"
              >
                ← Back to home
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500 mb-2">Demo Credentials:</p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1">
              <p><strong>Username:</strong> testuser</p>
              <p><strong>Password:</strong> testpass123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/60">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-white/80">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-white/80">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

