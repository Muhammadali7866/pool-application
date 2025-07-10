'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
}
