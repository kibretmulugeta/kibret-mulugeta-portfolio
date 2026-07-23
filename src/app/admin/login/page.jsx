'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Key, ShieldCheck, ArrowRight, LogIn, Terminal, AlertCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(profileData.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('kibret_admin_jwt');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate secure owner authentication validation
    setTimeout(() => {
      if (email.toLowerCase() === profileData.email.toLowerCase() && password === 'admin123') {
        // Issue Owner JWT Token
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const now = Math.floor(Date.now() / 1000);
        const payload = btoa(JSON.stringify({
          sub: profileData.email,
          name: profileData.name,
          role: "OWNER_ADMIN",
          iss: "https://kibretai.vercel.app",
          iat: now,
          exp: now + 86400 // 24 hours
        }));
        const signature = "sig_owner_" + Math.random().toString(36).substring(2, 15);
        const jwtToken = `${header}.${payload}.${signature}`;

        localStorage.setItem('kibret_admin_jwt', jwtToken);
        localStorage.setItem('kibret_admin_user', JSON.stringify({ email: profileData.email, name: profileData.name, role: 'OWNER_ADMIN' }));
        router.push('/admin/dashboard');
      } else {
        setError('Invalid owner credentials. Access restricted to Kibret Mulugeta.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-tactical-grid flex items-center justify-center">
      <Container className="max-w-md mx-auto">
        <Card className="border-brand-cyan/30 bg-dark-surface/90 shadow-2xl">
          <div className="text-center space-y-3 mb-8 pb-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-brand-text font-mono">
              OWNER ADMIN PORTAL
            </h1>
            <p className="text-xs text-brand-muted font-sans">
              Private management dashboard for Kibret Mulugeta.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-brand-muted mb-1 text-[11px]">Owner Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={profileData.email}
                className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-brand-muted mb-1 text-[11px]">Admin Key / Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Verifying Admin Token...' : 'Authenticate & Enter Dashboard'}</span>
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] font-mono text-brand-subtle">
            <span className="text-brand-cyan">Default Passcode:</span> admin123
          </div>
        </Card>
      </Container>
    </div>
  );
}
