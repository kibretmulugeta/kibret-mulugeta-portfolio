'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Key, ShieldCheck, ArrowRight, LogIn, Github, AlertCircle, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(profileData.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('kibret_admin_jwt');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handlePasscodeLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === profileData.email.toLowerCase() && password === 'admin123') {
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const now = Math.floor(Date.now() / 1000);
        const payload = btoa(JSON.stringify({
          sub: profileData.email,
          name: profileData.name,
          role: "OWNER_ADMIN",
          iss: "https://kibretai.vercel.app",
          iat: now,
          exp: now + 86400
        }));
        const signature = "sig_owner_" + Math.random().toString(36).substring(2, 15);
        const jwtToken = `${header}.${payload}.${signature}`;

        localStorage.setItem('kibret_admin_jwt', jwtToken);
        localStorage.setItem('kibret_admin_user', JSON.stringify({ email: profileData.email, name: profileData.name, role: 'OWNER_ADMIN' }));
        router.push('/dashboard');
      } else {
        setError('Invalid owner credentials. Access restricted to Kibret Mulugeta.');
        setLoading(false);
      }
    }, 400);
  };

  const handleOAuthLogin = async (provider) => {
    setOauthLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/auth/${provider}/callback`);
      const data = await res.json();

      if (data && data.token && data.user) {
        localStorage.setItem('kibret_admin_jwt', data.token);
        localStorage.setItem('kibret_admin_user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(`Failed to authenticate via ${provider} OAuth 2.0.`);
        setOauthLoading(false);
      }
    } catch (err) {
      setError(`OAuth 2.0 provider connection failed: ${err.message}`);
      setOauthLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-tactical-grid flex items-center justify-center">
      <Container className="max-w-md mx-auto">
        <Card className="border-brand-cyan/30 bg-dark-surface/95 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-3 mb-6 pb-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mx-auto shadow-lg shadow-brand-cyan/10">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-brand-text font-mono">
                OWNER CONTROL ACCESS
              </h1>
              <p className="text-xs text-brand-muted font-sans mt-1">
                Authenticate via OAuth 2.0 (Google / GitHub) or Owner Passcode to access Dashboard.
              </p>
            </div>
          </div>

          {/* Dual OAuth 2.0 Login Buttons */}
          <div className="space-y-3 mb-6 font-mono text-xs">
            <span className="text-[11px] text-brand-subtle uppercase tracking-wider block font-bold">
              Sign in with Verified OAuth 2.0
            </span>

            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              disabled={oauthLoading || loading}
              className="w-full py-3 px-4 rounded-xl bg-dark-bg border border-white/10 hover:border-brand-cyan/40 text-brand-text hover:text-brand-cyan transition-all flex items-center justify-between font-bold group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                  G
                </div>
                <span>Continue with Google OAuth 2.0</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-subtle group-hover:text-brand-cyan transition-colors" />
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin('github')}
              disabled={oauthLoading || loading}
              className="w-full py-3 px-4 rounded-xl bg-dark-bg border border-white/10 hover:border-brand-cyan/40 text-brand-text hover:text-brand-cyan transition-all flex items-center justify-between font-bold group shadow-md"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-brand-cyan" />
                <span>Continue with GitHub OAuth 2.0</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-subtle group-hover:text-brand-cyan transition-colors" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-dark-surface text-[10px] font-mono text-brand-subtle uppercase tracking-wider">
              Or Sign in with Email & Passcode
            </span>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handlePasscodeLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-brand-muted mb-1 text-[11px]">Owner Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={profileData.email}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-brand-muted mb-1 text-[11px]">Admin Key / Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode (default: admin123)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" variant="primary" size="md" className="w-full" disabled={loading || oauthLoading}>
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Verifying Credentials...' : 'Authenticate & Enter Dashboard'}</span>
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
