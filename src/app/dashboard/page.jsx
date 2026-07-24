'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Activity,
  Brain,
  FolderGit2,
  Lock,
  RefreshCw,
  Zap,
  Radio,
  Server,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  ArrowUpRight,
  Globe,
  Sliders,
  Database,
  Cpu,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ContactCTA from '@/components/sections/ContactCTA';
import { dashboardData } from '@/data/dashboard';
import { projectsData } from '@/data/projects';
import { researchData } from '@/data/research';

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [liveStream, setLiveStream] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState('Just now');
  const [refreshing, setRefreshing] = useState(false);
  const [manuscriptStatus, setManuscriptStatus] = useState(researchData.manuscripts[0].status);
  const [editingManuscript, setEditingManuscript] = useState(false);
  const [manuscriptInput, setManuscriptInput] = useState(manuscriptStatus);
  const [projectsList, setProjectsList] = useState(projectsData);
  const [taskFilter, setTaskFilter] = useState('All');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString());
    }, 600);
  };

  const handleSaveManuscript = () => {
    setManuscriptStatus(manuscriptInput);
    setEditingManuscript(false);
  };

  const { systemOverview, modelTelemetry, authSessions, taskQueue } = dashboardData;

  const filteredTasks = taskFilter === 'All'
    ? taskQueue
    : taskQueue.filter(t => t.state === taskFilter);

  return (
    <div className="pt-24 pb-16 bg-tactical-grid min-h-screen">
      <Container className="max-w-7xl mx-auto space-y-8">
        
        {/* ==================== OWNER COMMAND CENTER HEADER ==================== */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-dark-surface/90 border border-brand-cyan/30 shadow-2xl backdrop-blur-xl">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Owner Identity Info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  OWNER CONTROL & TELEMETRY SUITE
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  System Operational (99.98% SLA)
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-text tracking-tight font-sans">
                  Kibret Mulugeta Executive Command Center
                </h1>
                <p className="text-xs sm:text-sm font-mono text-brand-muted mt-1">
                  Private Administration Hub • AI/ML Research Telemetry, OAuth 2.0 Logs & System Control
                </p>
              </div>
            </div>

            {/* Quick Action Control Bar */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setLiveStream(!liveStream)}
                className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                  liveStream
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/5'
                    : 'bg-white/5 border-white/10 text-brand-muted hover:text-brand-text'
                }`}
                title="Toggle Real-Time Telemetry Streaming"
              >
                <Radio className={`w-3.5 h-3.5 ${liveStream ? 'animate-pulse text-emerald-400' : ''}`} />
                <span>{liveStream ? 'Live Telemetry: Active' : 'Live Telemetry: Paused'}</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-3.5 py-2 rounded-xl bg-dark-bg border border-white/10 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/30 transition-all flex items-center gap-2"
                title="Refresh Telemetry Metrics"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-brand-cyan' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>

              <Link
                href="/"
                className="px-3.5 py-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 transition-all flex items-center gap-1.5 font-bold"
              >
                <span>View Public Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Sub-Bar Info */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-brand-subtle">
            <div className="flex items-center gap-4">
              <span>Owner Account: <strong className="text-brand-text">kibretmail@gmail.com</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Role: <strong className="text-brand-cyan">System Administrator</strong></span>
            </div>
            <div>
              <span>Last Refreshed: <strong className="text-brand-text">{lastRefreshed}</strong></span>
            </div>
          </div>
        </div>

        {/* ==================== TOP KPI SUMMARY MATRIX ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 bg-dark-surface/90 border-white/10 hover:border-brand-cyan/40 transition-all group">
            <div className="flex items-center justify-between text-brand-subtle font-mono text-xs mb-2">
              <span>API Request Volume</span>
              <Activity className="w-4 h-4 text-brand-cyan group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-brand-text">{systemOverview.totalRequests}</div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 mt-1">
              <span>↑ +12.4% vs last period</span>
              <span className="text-brand-subtle">({systemOverview.avgLatencyMs}ms avg)</span>
            </div>
          </Card>

          <Card className="p-5 bg-dark-surface/90 border-white/10 hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between text-brand-subtle font-mono text-xs mb-2">
              <span>Primary Model Dice Score</span>
              <Brain className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-emerald-400">
              {(modelTelemetry.diceScore * 100).toFixed(1)}%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-brand-muted mt-1">
              <span>IoU Accuracy: {(modelTelemetry.iouScore * 100).toFixed(1)}%</span>
            </div>
          </Card>

          <Card className="p-5 bg-dark-surface/90 border-white/10 hover:border-sky-500/40 transition-all group">
            <div className="flex items-center justify-between text-brand-subtle font-mono text-xs mb-2">
              <span>Active JWT Sessions</span>
              <Lock className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-brand-text">{systemOverview.activeSessions}</div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-sky-400 mt-1">
              <span>Google & GitHub OAuth 2.0</span>
            </div>
          </Card>

          <Card className="p-5 bg-dark-surface/90 border-white/10 hover:border-indigo-500/40 transition-all group">
            <div className="flex items-center justify-between text-brand-subtle font-mono text-xs mb-2">
              <span>Research Paper Status</span>
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-sm font-extrabold font-mono text-brand-cyan truncate mt-1">
              Scientific Reports
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 font-semibold">
              {manuscriptStatus}
            </div>
          </Card>
        </div>

        {/* ==================== NAVIGATION TAB SELECTION ==================== */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-dark-surface border border-white/10">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'telemetry'
                ? 'bg-brand-cyan text-dark-bg shadow-lg shadow-brand-cyan/20'
                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>01. Infrastructure & API Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'research'
                ? 'bg-brand-cyan text-dark-bg shadow-lg shadow-brand-cyan/20'
                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>02. AI/ML Research Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-brand-cyan text-dark-bg shadow-lg shadow-brand-cyan/20'
                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>03. Portfolio Projects Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-brand-cyan text-dark-bg shadow-lg shadow-brand-cyan/20'
                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>04. OAuth Security & Task Queue</span>
          </button>
        </div>

        {/* ==================== TAB CONTENT PANELS ==================== */}

        {/* TAB 1: TELEMETRY & INFRASTRUCTURE */}
        {activeTab === 'telemetry' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Real-Time Request Volume Chart */}
            <Card className="p-6 bg-dark-surface/90 border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-base font-bold font-mono text-brand-text flex items-center gap-2">
                    <Server className="w-4 h-4 text-brand-cyan" />
                    <span>24-Hour API Request Throughput & Latency Profile</span>
                  </h3>
                  <p className="text-xs font-mono text-brand-muted mt-0.5">
                    FastAPI microservices & Next.js Vercel Edge performance tracking
                  </p>
                </div>
                <span className="text-xs font-mono text-brand-cyan font-bold bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/30">
                  Peak Traffic: 5,200 req/hr
                </span>
              </div>

              {/* Bar Visualizer */}
              <div className="h-48 flex items-end gap-3 pt-6 pb-2 border-b border-white/10 px-2">
                {systemOverview.requestVolume24h.map((item, i) => {
                  const maxReq = 5200;
                  const heightPct = Math.round((item.requests / maxReq) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-dark-bg border border-brand-cyan/40 px-2.5 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap z-20 shadow-2xl pointer-events-none">
                        <div className="text-brand-cyan font-bold">{item.requests} requests/hr</div>
                        <div className="text-brand-muted text-[10px]">Latency: {item.latency}ms</div>
                      </div>

                      <div className="w-full bg-white/5 rounded-t-lg overflow-hidden h-full flex items-end">
                        <div
                          style={{ height: `${heightPct}%` }}
                          className="w-full bg-gradient-to-t from-brand-indigo/50 via-brand-cyan/70 to-emerald-400 group-hover:from-brand-cyan group-hover:to-emerald-300 transition-all rounded-t-lg"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-brand-subtle">{item.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Microservices Endpoint Health Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-3.5 rounded-xl bg-dark-bg border border-white/5 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-brand-subtle">
                    <span>/api/v1/segmentation</span>
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  </div>
                  <div className="text-brand-text font-semibold">Brain MRI Stroke U-Net</div>
                  <div className="text-[11px] text-brand-muted">Latency: 14.8ms • SLA 99.9%</div>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-bg border border-white/5 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-brand-subtle">
                    <span>/api/v1/auth/jwt</span>
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  </div>
                  <div className="text-brand-text font-semibold">OAuth2 Token Exchange</div>
                  <div className="text-[11px] text-brand-muted">Latency: 8.2ms • HS256 Verified</div>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-bg border border-white/5 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-brand-subtle">
                    <span>/api/v1/tasks/queue</span>
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  </div>
                  <div className="text-brand-text font-semibold">Asynchronous Work Scheduler</div>
                  <div className="text-[11px] text-brand-muted">Latency: 11.5ms • Priority Active</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 2: AI/ML RESEARCH STUDIO */}
        {activeTab === 'research' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Manuscript Status Editor Box */}
            <Card className="p-6 bg-dark-surface/90 border-emerald-500/30">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-base font-bold font-mono text-brand-text flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Research Manuscript Submission Tracker</span>
                  </h3>
                  <p className="text-xs text-brand-muted font-sans mt-0.5">
                    Target Venue: <strong className="text-emerald-400 font-mono">Scientific Reports</strong> (Springer Nature)
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {manuscriptStatus}
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-brand-subtle text-[11px]">Paper Title:</span>
                  <p className="text-brand-text font-bold text-sm mt-0.5">
                    {researchData.manuscripts[0].title}
                  </p>
                </div>

                <div>
                  <span className="text-brand-subtle text-[11px]">Public Submission Status Controls:</span>
                  <div className="flex items-center gap-3 mt-1.5">
                    {editingManuscript ? (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-xl">
                        <input
                          type="text"
                          value={manuscriptInput}
                          onChange={(e) => setManuscriptInput(e.target.value)}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-dark-bg border border-brand-cyan text-brand-text font-mono text-xs focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <Button onClick={handleSaveManuscript} variant="primary" size="sm">
                            Save Changes
                          </Button>
                          <Button onClick={() => setEditingManuscript(false)} variant="ghost" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 rounded-lg bg-dark-bg border border-white/10 text-brand-cyan font-bold">
                          {manuscriptStatus}
                        </span>
                        <button
                          onClick={() => setEditingManuscript(true)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-brand-cyan/20 text-brand-cyan transition-colors"
                          title="Edit Status"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Model Architecture & Preprocessing Pipeline Latency */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-dark-surface/90 border-white/10">
                <h4 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>MRI Image Preprocessing Pipeline Breakdown</span>
                </h4>
                <div className="space-y-3">
                  {modelTelemetry.preprocessingSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-dark-bg border border-white/5 font-mono text-xs">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-brand-text font-semibold">{step.step}</span>
                      </div>
                      <span className="text-brand-cyan font-bold px-2.5 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20">
                        {step.latency}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Confusion Matrix */}
              <Card className="p-6 bg-dark-surface/90 border-white/10">
                <h4 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>Segmentation Confusion Matrix (ATLAS v2.0 Dataset)</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs text-center">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-[11px] text-brand-subtle block mb-1">True Positive (Stroke Lesion)</span>
                    <span className="text-2xl font-extrabold text-emerald-400">{modelTelemetry.confusionMatrix.tp}%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <span className="text-[11px] text-brand-subtle block mb-1">False Positive (Noise)</span>
                    <span className="text-2xl font-extrabold text-amber-400">{modelTelemetry.confusionMatrix.fp}%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                    <span className="text-[11px] text-brand-subtle block mb-1">False Negative (Missed)</span>
                    <span className="text-2xl font-extrabold text-rose-400">{modelTelemetry.confusionMatrix.fn}%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30">
                    <span className="text-[11px] text-brand-subtle block mb-1">True Negative (Healthy Tissue)</span>
                    <span className="text-2xl font-extrabold text-brand-cyan">{modelTelemetry.confusionMatrix.tn}%</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PORTFOLIO PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-dark-surface/90 border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-base font-bold font-mono text-brand-text">
                    Manage Portfolio Core Projects
                  </h3>
                  <p className="text-xs text-brand-muted font-sans mt-0.5">
                    Review and verify qualitative case study reports across medical AI & software engineering.
                  </p>
                </div>
                <span className="text-xs font-mono text-brand-cyan font-bold bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/30">
                  {projectsList.length} Active Core Projects
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {projectsList.map((project, idx) => (
                  <div
                    key={project.slug}
                    className="p-5 rounded-2xl bg-dark-bg border border-white/5 hover:border-brand-cyan/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-brand-cyan font-bold text-sm">0{idx + 1}.</span>
                        <span className="text-brand-text font-bold text-sm">{project.title}</span>
                        <Badge variant="cyan">{project.category}</Badge>
                      </div>
                      <p className="text-brand-muted text-xs font-sans max-w-3xl leading-relaxed">
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-brand-subtle border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                        {project.status}
                      </span>
                      <Link
                        href={`/work/${project.slug}`}
                        className="px-3.5 py-2 rounded-xl bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 transition-all font-bold flex items-center gap-1.5"
                      >
                        <span>Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 4: SECURITY & TASK QUEUE */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Active JWT Sessions Table */}
            <Card className="p-6 bg-dark-surface/90 border-white/10 overflow-x-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h3 className="text-base font-bold font-mono text-brand-text flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>Authenticated OAuth 2.0 & JWT Sessions</span>
                </h3>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                  {authSessions.length} Active Sessions Verified
                </span>
              </div>

              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-brand-subtle text-[11px]">
                    <th className="pb-3 font-normal">SESSION ID & PROVIDER</th>
                    <th className="pb-3 font-normal">USER CLAIMS (EMAIL & ROLE)</th>
                    <th className="pb-3 font-normal">IP ADDRESS</th>
                    <th className="pb-3 font-normal">EXPIRATION COUNTDOWN</th>
                    <th className="pb-3 font-normal text-right">JWT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {authSessions.map((sess) => (
                    <tr key={sess.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5">
                        <div className="font-bold text-brand-text">{sess.id}</div>
                        <div className="text-[11px] text-brand-cyan">{sess.provider}</div>
                      </td>
                      <td className="py-3.5">
                        <div className="text-brand-text">{sess.claims.email}</div>
                        <div className="text-[11px] text-brand-subtle">{sess.claims.role}</div>
                      </td>
                      <td className="py-3.5 text-brand-muted">
                        <span className="inline-flex items-center gap-1">
                          <Globe className="w-3 h-3 text-brand-subtle" />
                          {sess.ipAddress}
                        </span>
                      </td>
                      <td className="py-3.5 text-brand-muted">
                        Expires in <span className="text-amber-400 font-bold">{sess.expiresInMinutes}m</span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Badge variant="cyan">{sess.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Task Scheduler Queue */}
            <Card className="p-6 bg-dark-surface/90 border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                <h3 className="text-base font-bold font-mono text-brand-text flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-cyan" />
                  <span>Asynchronous Work Scheduler & Task Queue</span>
                </h3>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-bg border border-white/10 font-mono text-xs">
                  {['All', 'Pending', 'Processing', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setTaskFilter(st)}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        taskFilter === st
                          ? 'bg-brand-cyan text-dark-bg font-bold'
                          : 'text-brand-muted hover:text-brand-text'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {filteredTasks.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-dark-bg border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-brand-text">
                        <span>{t.id}</span>
                        <span className="text-brand-subtle font-normal">• {t.name}</span>
                      </div>
                      <div className="text-[11px] text-brand-subtle">Category: {t.category} | Priority: <strong className="text-brand-cyan">{t.priority}</strong></div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-32 space-y-1">
                        <div className="flex justify-between text-[10px] text-brand-subtle">
                          <span>{t.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            style={{ width: `${t.progressPercent}%` }}
                            className={`h-full transition-all ${
                              t.progressPercent === 100 ? 'bg-emerald-400' : 'bg-brand-cyan'
                            }`}
                          />
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-text font-bold text-[11px] shrink-0">
                        {t.state}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

      </Container>
    </div>
  );
}
