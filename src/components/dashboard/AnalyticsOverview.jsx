'use client';

import React from 'react';
import { Activity, Server, Zap, ShieldAlert, Cpu } from 'lucide-react';
import Card from '../ui/Card';

export default function AnalyticsOverview({ data }) {
  const { totalRequests, avgLatencyMs, errorRatePercent, activeSessions, uptimePercent, requestVolume24h } = data;

  const maxReq = Math.max(...requestVolume24h.map(d => d.requests));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
          <Server className="w-4 h-4" />
          <span>Panel A: API Infrastructure & Request Telemetry</span>
        </h3>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          System Health: Optimal ({uptimePercent}% Uptime)
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-dark-surface/90 border-white/10">
          <div className="flex items-center justify-between text-brand-subtle text-xs font-mono mb-2">
            <span>Total API Requests</span>
            <Activity className="w-3.5 h-3.5 text-brand-cyan" />
          </div>
          <div className="text-2xl font-mono font-bold text-brand-text">{totalRequests}</div>
          <p className="text-[11px] font-mono text-brand-muted mt-1">Global HTTP / REST endpoints</p>
        </Card>

        <Card className="p-4 bg-dark-surface/90 border-white/10">
          <div className="flex items-center justify-between text-brand-subtle text-xs font-mono mb-2">
            <span>Avg Response Latency</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-brand-text">{avgLatencyMs} ms</div>
          <p className="text-[11px] font-mono text-emerald-400 mt-1">Sub-50ms target met</p>
        </Card>

        <Card className="p-4 bg-dark-surface/90 border-white/10">
          <div className="flex items-center justify-between text-brand-subtle text-xs font-mono mb-2">
            <span>HTTP Error Rate</span>
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-brand-text">{errorRatePercent}%</div>
          <p className="text-[11px] font-mono text-brand-muted mt-1">Nominal (4xx / 5xx)</p>
        </Card>

        <Card className="p-4 bg-dark-surface/90 border-white/10">
          <div className="flex items-center justify-between text-brand-subtle text-xs font-mono mb-2">
            <span>Active JWT Sessions</span>
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-brand-text">{activeSessions}</div>
          <p className="text-[11px] font-mono text-brand-cyan mt-1">Authenticated Bearer Tokens</p>
        </Card>
      </div>

      {/* Real-Time Request Volume Chart Visualizer */}
      <Card className="p-5 bg-dark-surface/80 border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider font-semibold">
            24-Hour Request Volume & Response Time Profile
          </span>
          <span className="text-[11px] font-mono text-brand-subtle">
            Peak: {maxReq} req/hr
          </span>
        </div>

        <div className="h-40 flex items-end gap-3 pt-6 pb-2 border-b border-white/10 px-2">
          {requestVolume24h.map((item, i) => {
            const heightPct = Math.round((item.requests / maxReq) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-dark-bg border border-white/20 px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap z-20 shadow-xl pointer-events-none">
                  <span className="text-brand-cyan font-bold">{item.requests} reqs</span> • {item.latency}ms
                </div>

                {/* Bar */}
                <div className="w-full bg-white/5 rounded-t-md overflow-hidden h-full flex items-end">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-gradient-to-t from-brand-indigo/40 to-brand-cyan/80 group-hover:from-brand-cyan group-hover:to-sky-400 transition-all rounded-t-md"
                  />
                </div>
                <span className="text-[10px] font-mono text-brand-subtle">{item.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
