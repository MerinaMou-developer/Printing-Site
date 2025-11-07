'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { UserPlus, Mail, Lock, User, Phone, AlertCircle, Loader2, CheckCircle2, LogIn } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-white/70">
            Join us and start ordering professional printing services
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
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                  placeholder="johndoe"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">This will be your login username</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
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
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Min. 8 characters</p>
              </div>

              <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password_confirm"
                    name="password_confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password_confirm}
                    onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
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
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            {/* Login Link - Prominent */}
            <div className="text-center p-4 bg-gradient-to-r from-[var(--color-brand-50)] to-[var(--color-accent-50)] rounded-lg border border-[var(--color-brand-200)]">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Already have an account?
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 px-6 py-2 bg-[var(--color-brand-600)] text-white rounded-lg hover:bg-[var(--color-brand-700)] transition font-medium text-sm"
              >
                <LogIn className="h-4 w-4" />
                Sign In Now
              </Link>
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

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-3 text-center">Why Create an Account?</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Track your orders</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Save cart items</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Faster checkout</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Order history</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/60">
          By creating an account, you agree to our{' '}
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

