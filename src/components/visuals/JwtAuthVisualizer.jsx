'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, CheckCircle2, ArrowRight, LogIn, Globe, Github, Terminal, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function JwtAuthVisualizer() {
  const [activeTab, setActiveTab] = useState('sandbox');
  const [selectedProvider, setSelectedProvider] = useState('google');
  const [simulatedEmail, setSimulatedEmail] = useState('kibretmail@gmail.com');
  const [authResponse, setAuthResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [protectedTest, setProtectedTest] = useState(null);

  const handleSimulateOAuth = async (provider) => {
    setSelectedProvider(provider);
    setLoading(true);
    setAuthResponse(null);
    setProtectedTest(null);

    // Call API callback route for real verification flow
    try {
      const res = await fetch(`/api/auth/${provider}/callback`);
      const data = await res.json();
      setAuthResponse(data);
    } catch (err) {
      setAuthResponse({ error: 'Network error calling OAuth callback' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestProtectedEndpoint = async () => {
    if (!authResponse?.token) return;

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${authResponse.token}`,
        },
      });
      const data = await res.json();
      setProtectedTest(data);
    } catch (err) {
      setProtectedTest({ error: 'Protected route check failed' });
    }
  };

  return (
    <Card className="border-brand-cyan/30 my-8 bg-dark-surface/90">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-brand-text text-base font-mono">Dual OAuth 2.0 (Google & GitHub) + JWT Engine</h3>
              <Badge variant="cyan">OpenID Connect + Account Linking</Badge>
            </div>
            <p className="text-xs text-brand-muted mt-0.5 font-sans">
              Stateless HS256 JWT tokens, normalized user profile schema, and automatic cross-provider account linking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Stateless Bearer JWT Middleware</span>
        </div>
      </div>

      {/* Tabs Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'sandbox'
              ? 'bg-brand-cyan text-dark-bg shadow-lg shadow-brand-cyan/20'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>LIVE OAUTH & JWT SANDBOX</span>
        </button>

        <button
          onClick={() => setActiveTab('sequence')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'sequence'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>ARCHITECTURE & SEQUENTIAL FLOW</span>
        </button>
      </div>

      {/* Sandbox Tab Content */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Box: Provider Actions */}
            <div className="p-5 rounded-2xl bg-dark-bg border border-white/10 space-y-4">
              <span className="text-xs font-mono text-brand-cyan font-bold uppercase tracking-wider block pb-3 border-b border-white/10">
                1. Select Provider & Execute OAuth 2.0 Handshake
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleSimulateOAuth('google')}
                  disabled={loading}
                  className="p-4 rounded-xl bg-dark-surface border border-white/10 hover:border-brand-cyan/40 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold shrink-0">
                    G
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-text group-hover:text-brand-cyan">Google OAuth 2.0</span>
                    <span className="text-[11px] font-mono text-brand-subtle block">GET /api/auth/google</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateOAuth('github')}
                  disabled={loading}
                  className="p-4 rounded-xl bg-dark-surface border border-white/10 hover:border-brand-cyan/40 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-text shrink-0">
                    <Github className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-text group-hover:text-brand-cyan">GitHub OAuth 2.0</span>
                    <span className="text-[11px] font-mono text-brand-subtle block">GET /api/auth/github</span>
                  </div>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 text-xs font-mono space-y-1">
                <span className="text-brand-cyan font-bold">Account Linking Test Matrix:</span>
                <p className="text-brand-muted text-[11px] leading-relaxed">
                  Notice that logging in with Google (`kibretmail@gmail.com`) and then GitHub with the same email automatically links both provider IDs to the same internal user record (`usr_...`).
                </p>
              </div>
            </div>

            {/* Right Box: Token & User Schema Response */}
            <div className="p-5 rounded-2xl bg-dark-bg border border-white/10 space-y-4 font-mono text-xs">
              <span className="text-xs font-mono text-brand-text font-bold uppercase tracking-wider block pb-3 border-b border-white/10">
                2. Application JWT Token & Linked User Profile Output
              </span>

              {loading ? (
                <div className="p-8 text-center text-brand-cyan animate-pulse">
                  Exchanging Authorization Code & Minting JWT Token...
                </div>
              ) : authResponse ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] text-brand-subtle block mb-1">Minted Application JWT (`Bearer` Token):</span>
                    <div className="p-3 rounded-xl bg-dark-surface border border-brand-cyan/40 text-brand-cyan text-[11px] break-all font-mono">
                      {authResponse.token}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-brand-subtle block mb-1">Normalized Linked User Object:</span>
                    <pre className="p-3 rounded-xl bg-dark-surface border border-white/10 text-emerald-400 text-[11px] overflow-x-auto max-h-48">
                      {JSON.stringify(authResponse.user, null, 2)}
                    </pre>
                  </div>

                  <button
                    onClick={handleTestProtectedEndpoint}
                    className="w-full py-2.5 rounded-xl bg-brand-cyan text-dark-bg font-bold font-mono text-xs hover:bg-sky-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Test Protected Middleware API (GET /api/auth/me)</span>
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-brand-subtle border border-dashed border-white/10 rounded-xl">
                  Click Google or GitHub OAuth above to execute provider flow and generate token.
                </div>
              )}
            </div>

          </div>

          {/* Protected Test Output */}
          {protectedTest && (
            <div className="p-4 rounded-xl bg-dark-bg border border-emerald-500/40 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>HTTP 200 OK — Protected Route /api/auth/me Output:</span>
                <span className="text-brand-subtle text-[11px]">Middleware Validated</span>
              </div>
              <pre className="p-3 rounded bg-dark-surface border border-white/10 text-emerald-300 text-[11px]">
                {JSON.stringify(protectedTest, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Sequence Tab Content */}
      {activeTab === 'sequence' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-xl bg-dark-bg border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">1. Auth Redirect</span>
              <span className="text-brand-muted text-[11px]">User initiates GET /api/auth/google or /github.</span>
            </div>
            <div className="p-4 rounded-xl bg-dark-bg border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">2. Code Exchange</span>
              <span className="text-brand-muted text-[11px]">Callback handler exchanges code for provider claims.</span>
            </div>
            <div className="p-4 rounded-xl bg-dark-bg border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">3. Account Linking</span>
              <span className="text-brand-muted text-[11px]">Queries DB by email and links provider ID.</span>
            </div>
            <div className="p-4 rounded-xl bg-dark-bg border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">4. JWT Signing</span>
              <span className="text-brand-muted text-[11px]">Signs HS256 JWT with sub, email, provider, role claims.</span>
            </div>
            <div className="p-4 rounded-xl bg-dark-bg border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold block">5. Bearer Header</span>
              <span className="text-brand-muted text-[11px]">Client attaches Authorization: Bearer token to API calls.</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
