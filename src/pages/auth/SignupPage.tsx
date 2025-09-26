import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock } from 'lucide-react';
import { UserRole } from '../../types';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      setSuccess('Success! Please check your email to verify your account.');
      // Optionally navigate to a "check your email" page
      // navigate('/check-email');
    }
    
    setLoading(false);
  };

  return (
    <AuthLayout title="Create Account">
      {success ? (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-secondary-500">Registration Successful!</h2>
          <p className="text-text-secondary">{success}</p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            id="fullName"
            label="Full Name"
            placeholder="Ravi Kumar"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={<User className="w-5 h-5" />}
            required
          />
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
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5" />}
            required
          />
          
          <div>
            <label className="text-sm font-medium text-text-primary">I am a...</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {(['citizen', 'authority', 'ngo'] as UserRole[]).map((r) => (
                <Button
                  key={r}
                  type="button"
                  variant={role === r ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setRole(r)}
                  className="capitalize"
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-error text-center">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full !mt-6" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      )}

      {!success && (
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-500 hover:underline">
            Sign In
          </Link>
        </p>
      )}
    </AuthLayout>
  );
};

export default SignupPage;
