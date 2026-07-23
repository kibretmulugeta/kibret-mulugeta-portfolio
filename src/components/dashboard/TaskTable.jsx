'use client';

import React, { useState } from 'react';
import { ListFilter, Clock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const states = ["All", "Pending", "Processing", "Completed"];

export default function TaskTable({ tasks }) {
  const [selectedState, setSelectedState] = useState("All");

  const filteredTasks = selectedState === "All"
    ? tasks
    : tasks.filter(t => t.state === selectedState);

  const getPriorityStyle = (p) => {
    switch(p) {
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'High': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Medium': return 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30';
      default: return 'text-brand-muted bg-white/5 border-white/10';
    }
  };

  const getStateIcon = (s) => {
    switch(s) {
      case 'Completed': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Processing': return <Loader2 className="w-3.5 h-3.5 text-brand-cyan animate-spin" />;
      default: return <Clock className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-sm font-mono font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
          <ListFilter className="w-4 h-4" />
          <span>Panel D: Task Queue & Asynchronous Work Scheduler</span>
        </h3>

        {/* Filter State Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-dark-surface border border-white/10">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                selectedState === st
                  ? 'bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/30'
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-5 bg-dark-surface/80 border-white/10 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 text-brand-subtle text-[11px]">
              <th className="pb-3 font-normal">TASK ID & NAME</th>
              <th className="pb-3 font-normal">DOMAIN CATEGORY</th>
              <th className="pb-3 font-normal">PRIORITY</th>
              <th className="pb-3 font-normal">EXECUTION PROGRESS</th>
              <th className="pb-3 font-normal text-right">SCHEDULER STATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTasks.map((t) => (
              <tr key={t.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3">
                  <div className="font-bold text-brand-text flex items-center gap-2">
                    <span>{t.id}</span>
                    <span className="text-brand-subtle font-normal">• {t.name}</span>
                  </div>
                  <div className="text-[10px] text-brand-subtle mt-0.5">Queued at: {t.timestamp}</div>
                </td>
                <td className="py-3 text-brand-muted">{t.category}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getPriorityStyle(t.priority)}`}>
                    {t.priority}
                  </span>
                </td>
                <td className="py-3">
                  <div className="w-36 space-y-1">
                    <div className="flex justify-between text-[10px] text-brand-subtle">
                      <span>{t.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-dark-bg overflow-hidden">
                      <div
                        style={{ width: `${t.progressPercent}%` }}
                        className={`h-full transition-all ${
                          t.progressPercent === 100 ? 'bg-emerald-400' : 'bg-brand-cyan'
                        }`}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-text">
                    {getStateIcon(t.state)}
                    <span>{t.state}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
