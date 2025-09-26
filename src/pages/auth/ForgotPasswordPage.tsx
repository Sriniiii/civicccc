import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // This should be a page to handle the reset
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset instructions have been sent to your email.');
    }

    setLoading(false);
  };

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={handlePasswordReset} className="space-y-6">
        <p className="text-sm text-text-secondary text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          required
        />
        
        {message && <p className="text-sm text-success text-center bg-green-50 p-3 rounded-lg">{message}</p>}
        {error && <p className="text-sm text-error text-center">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Remembered your password?{' '}
        <Link to="/login" className="font-medium text-primary-500 hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
