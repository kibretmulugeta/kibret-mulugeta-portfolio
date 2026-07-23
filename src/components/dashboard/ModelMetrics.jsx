'use client';

import React from 'react';
import { Brain, Layers, Gauge, HardDrive, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

export default function ModelMetrics({ data }) {
  const { activeModel, architecture, diceScore, iouScore, inferenceSpeedMs, vramUsageGb, dataset, preprocessingSteps, confusionMatrix } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span>Panel B: AI/ML Model Telemetry & Medical Imaging Metrics</span>
        </h3>
        <span className="text-xs font-mono text-brand-subtle">
          Target Dataset: {dataset}
        </span>
      </div>

      {/* Model High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-dark-surface/90 border-brand-cyan/20">
          <div className="text-xs font-mono text-brand-subtle mb-1">Active Neural Model</div>
          <div className="text-lg font-mono font-bold text-brand-cyan">{activeModel}</div>
          <div className="text-[11px] font-mono text-brand-muted mt-1">{architecture}</div>
        </Card>

        <Card className="p-4 bg-dark-surface/90 border-emerald-500/20">
          <div className="text-xs font-mono text-brand-subtle mb-1">Dice Similarity Coefficient</div>
          <div className="text-2xl font-mono font-bold text-emerald-400">{(diceScore * 100).toFixed(1)}%</div>
          <div className="text-[11px] font-mono text-brand-muted mt-1">IoU Delineation: {(iouScore * 100).toFixed(1)}%</div>
        </Card>

        <Card className="p-4 bg-dark-surface/90 border-sky-500/20">
          <div className="text-xs font-mono text-brand-subtle mb-1">Inference & Memory Profile</div>
          <div className="text-2xl font-mono font-bold text-brand-text">{inferenceSpeedMs} ms/frame</div>
          <div className="text-[11px] font-mono text-sky-400 mt-1">VRAM Allocation: {vramUsageGb} GB / 8.0 GB</div>
        </Card>
      </div>

      {/* Preprocessing Pipeline & Confusion Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preprocessing Pipeline Stages */}
        <Card className="p-5 bg-dark-surface/80 border-white/10">
          <h4 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-cyan" />
            <span>Image Preprocessing Pipeline Latency</span>
          </h4>
          <div className="space-y-3">
            {preprocessingSteps.map((step, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-white/5 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-brand-text">{step.step}</span>
                </div>
                <span className="text-brand-cyan font-bold">{step.latency}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Qualitative Confusion Matrix */}
        <Card className="p-5 bg-dark-surface/80 border-white/10">
          <h4 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-4 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-brand-cyan" />
            <span>Normalized Medical Image Confusion Matrix (%)</span>
          </h4>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs text-center">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-[11px] text-brand-subtle block mb-1">True Positive (Lesion)</span>
              <span className="text-xl font-bold text-emerald-400">{confusionMatrix.tp}%</span>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <span className="text-[11px] text-brand-subtle block mb-1">False Positive (Artifact)</span>
              <span className="text-xl font-bold text-amber-400">{confusionMatrix.fp}%</span>
            </div>
            <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30">
              <span className="text-[11px] text-brand-subtle block mb-1">False Negative (Omission)</span>
              <span className="text-xl font-bold text-rose-400">{confusionMatrix.fn}%</span>
            </div>
            <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <span className="text-[11px] text-brand-subtle block mb-1">True Negative (Background)</span>
              <span className="text-xl font-bold text-brand-cyan">{confusionMatrix.tn}%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
