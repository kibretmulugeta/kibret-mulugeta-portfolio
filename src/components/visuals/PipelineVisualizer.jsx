'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const pipelineNodes = [
  {
    id: 'input',
    title: '1. Input MRI Volume',
    subtitle: 'T1 / T2 / FLAIR Brain Scans',
    icon: Brain,
    details: 'Multi-modal NIfTI brain volumetric tensors loaded with spatial voxel metadata.',
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
  },
  {
    id: 'preprocessing',
    title: '2. Anatomical Preprocessing',
    subtitle: 'Skull Stripping & Normalization',
    icon: Layers,
    details: 'N4 bias field correction, background removal, z-score intensity normalization, and wavelet denoising.',
    color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
  },
  {
    id: 'unet',
    title: '3. U-Net Backbone',
    subtitle: 'Encoder / Decoder Architecture',
    icon: Cpu,
    details: '4-stage hierarchical convolutional downsampling bottleneck with feature-map skip connections.',
    color: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    id: 'plasticity',
    title: '4. Neuro-Plasticity Layer',
    subtitle: 'Reward-Driven Optimization',
    icon: Sparkles,
    details: 'Biologically inspired local reward modulation dynamically scaling gradient weight updates at tissue boundary interfaces.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  },
  {
    id: 'output',
    title: '5. Segmentation Output',
    subtitle: 'Dice & IoU Evaluation',
    icon: CheckCircle2,
    details: 'High-precision binary tissue contour mask evaluated with Dice Similarity Coefficient.',
    color: 'from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400',
  },
];

export default function PipelineVisualizer() {
  const [activeNode, setActiveNode] = useState(pipelineNodes[3]);

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden my-8">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
            Interactive Architecture Diagram
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-brand-text mt-1">
            Neuro-Inspired U-Net Segmentation Pipeline
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-brand-muted bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span>Click any node to inspect data flow</span>
        </div>
      </div>

      {/* Pipeline Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
        {pipelineNodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = activeNode.id === node.id;

          return (
            <div key={node.id} className="flex flex-col">
              <motion.button
                onClick={() => setActiveNode(node)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 p-4 rounded-xl text-left border transition-all duration-300 relative ${
                  isSelected
                    ? `bg-gradient-to-b ${node.color} shadow-lg ring-1 ring-brand-cyan/40`
                    : 'bg-dark-card/60 border-white/10 hover:border-white/20 hover:bg-dark-hover'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/10 text-brand-text' : 'bg-dark-surface text-brand-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-brand-subtle font-bold">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="font-mono text-xs font-bold text-brand-text mb-1">
                  {node.title.split('. ')[1]}
                </h4>
                <p className="text-[11px] text-brand-muted line-clamp-1">
                  {node.subtitle}
                </p>
              </motion.button>

              {/* Arrow Connector for Desktop */}
              {index < pipelineNodes.length - 1 && (
                <div className="hidden md:flex justify-center my-2 text-brand-subtle">
                  <ArrowRight className="w-4 h-4 text-white/20" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Node Detail Box */}
      <motion.div
        key={activeNode.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 p-5 rounded-xl bg-dark-bg/80 border border-white/10 font-mono text-xs text-brand-text flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-brand-cyan font-bold">SYSTEM STAGE:</span>
            <span className="text-brand-text font-semibold">{activeNode.title}</span>
          </div>
          <p className="text-brand-muted text-xs leading-relaxed font-sans mt-1">
            {activeNode.details}
          </p>
        </div>
        <div className="shrink-0 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-brand-cyan text-[11px]">
          {activeNode.subtitle}
        </div>
      </motion.div>
    </div>
  );
}
