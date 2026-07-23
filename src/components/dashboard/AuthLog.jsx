'use client';

import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, Terminal, Globe, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function AuthLog({ sessions }) {
  const [showArchSpec, setShowArchSpec] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Panel C: Security & OAuth 2.0 / JWT Auth Session Activity</span>
        </h3>
        <button
          onClick={() => setShowArchSpec(!showArchSpec)}
          className="text-xs font-mono text-brand-cyan hover:underline flex items-center gap-1"
        >
          <span>{showArchSpec ? 'Hide Token Handshake Spec' : 'Show Token Handshake Spec'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showArchSpec ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* OAuth 2.0 / JWT Handshake Sequence Overview */}
      {showArchSpec && (
        <Card className="p-5 bg-dark-bg/90 border-brand-cyan/30">
          <h4 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-3 flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span>OAuth 2.0 Handshake & JWT Minting Architecture Protocol</span>
          </h4>
          <ol className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-[11px]">
            <li className="p-3 rounded-lg bg-dark-surface border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">1. OAuth Handshake</span>
              <span className="text-brand-muted block">Initiates via Google / GitHub OAuth endpoint.</span>
            </li>
            <li className="p-3 rounded-lg bg-dark-surface border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">2. Code Exchange</span>
              <span className="text-brand-muted block">Callback code exchanged for verified claims.</span>
            </li>
            <li className="p-3 rounded-lg bg-dark-surface border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">3. DB Resolution</span>
              <span className="text-brand-muted block">Query / instantiate user record in database.</span>
            </li>
            <li className="p-3 rounded-lg bg-dark-surface border border-white/10 space-y-1">
              <span className="text-brand-cyan font-bold block">4. JWT Minting</span>
              <span className="text-brand-muted block">Sign HS256 JWT with sub, role, and exp claims.</span>
            </li>
            <li className="p-3 rounded-lg bg-dark-surface border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold block">5. Cookie/Header</span>
              <span className="text-brand-muted block">Deliver via HttpOnly cookie or Bearer header.</span>
            </li>
          </ol>
        </Card>
      )}

      {/* Sessions Active Table */}
      <Card className="p-5 bg-dark-surface/80 border-white/10 overflow-x-auto">
        <h4 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-4">
          Active Verified JWT Bearer Tokens
        </h4>

        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 text-brand-subtle text-[11px]">
              <th className="pb-3 font-normal">SESSION ID & PROVIDER</th>
              <th className="pb-3 font-normal">USER CLAIMS (EMAIL & ROLE)</th>
              <th className="pb-3 font-normal">IP ADDRESS</th>
              <th className="pb-3 font-normal">EXPIRATION COUNTDOWN</th>
              <th className="pb-3 font-normal text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sessions.map((sess) => (
              <tr key={sess.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3">
                  <div className="font-bold text-brand-text">{sess.id}</div>
                  <div className="text-[11px] text-brand-cyan">{sess.provider}</div>
                </td>
                <td className="py-3">
                  <div className="text-brand-text">{sess.claims.email}</div>
                  <div className="text-[11px] text-brand-subtle font-mono">{sess.claims.role}</div>
                </td>
                <td className="py-3 text-brand-muted">
                  <span className="inline-flex items-center gap-1">
                    <Globe className="w-3 h-3 text-brand-subtle" />
                    {sess.ipAddress}
                  </span>
                </td>
                <td className="py-3 text-brand-muted">
                  Expires in <span className="text-amber-400 font-bold">{sess.expiresInMinutes}m</span>
                </td>
                <td className="py-3 text-right">
                  <Badge variant="cyan">{sess.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
