'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthStore } from '@/lib/store/useAuthStore';

interface AuthModalProps {
  children?: React.ReactNode;
  defaultView?: 'login' | 'register';
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  children,
  defaultView = 'login',
  onClose
}) => {
  const [view, setView] = useState<'login' | 'register'>(defaultView);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleSuccess = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // If user is already authenticated, don't show the modal
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none">
        {view === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onRegisterClick={() => setView('register')}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onLoginClick={() => setView('login')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
