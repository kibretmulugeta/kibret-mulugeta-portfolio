'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-tactical-grid flex items-center justify-center font-mono text-xs text-brand-cyan">
      Navigating to Kibret Owner Command Center...
    </div>
  );
}
