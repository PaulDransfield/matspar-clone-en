'use client';

import type React from 'react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, CircleAlert, Loader2 } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);

      if (useAuthStore.getState().isAuthenticated) {
        addToast({
          title: 'Login Successful',
          description: 'Welcome back to Smart Shop!',
          type: 'success',
        });

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your Smart Shop account
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm flex items-center gap-2">
          <CircleAlert className="h-5 w-5 text-red-500" />
          <p>{error}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) clearError();
              }}
              required
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-green-600 hover:text-green-800 font-medium"
              onClick={() => {
                // This would be linked to a password recovery flow in a real app
                addToast({
                  title: 'Password Recovery',
                  description: 'This feature is not implemented in the demo.',
                  type: 'default',
                });
              }}
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) clearError();
            }}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onRegisterClick}
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Sign up
          </button>
        </p>

        {/* Demo account info */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-gray-500 text-xs">
            Demo Account: <span className="font-medium">user@example.com</span>
            <br />
            Password: <span className="font-medium">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
