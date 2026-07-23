'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FolderGit2, FileText, Mail, LogOut, ShieldCheck, CheckCircle2, Edit3, Plus, Sparkles, Activity } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { projectsData } from '@/data/projects';
import { researchData } from '@/data/research';
import { profileData } from '@/data/profile';

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [projectsList, setProjectsList] = useState(projectsData);
  const [manuscriptStatus, setManuscriptStatus] = useState(researchData.manuscripts[0].status);
  const [editingStatus, setEditingStatus] = useState(false);
  const [statusInput, setStatusInput] = useState(manuscriptStatus);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('kibret_admin_jwt');
    const storedUser = localStorage.getItem('kibret_admin_user');

    if (!token || !storedUser) {
      router.push('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('kibret_admin_jwt');
    localStorage.removeItem('kibret_admin_user');
    router.push('/admin/login');
  };

  const handleSaveManuscriptStatus = () => {
    setManuscriptStatus(statusInput);
    setEditingStatus(false);
  };

  if (!user) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-tactical-grid flex items-center justify-center font-mono text-xs text-brand-muted">
        Validating Owner JWT Authentication...
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen bg-tactical-grid">
      <Container>
        
        {/* Dashboard Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-dark-surface border border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-brand-text font-mono">
                  OWNER DASHBOARD
                </h1>
                <Badge variant="cyan">{user.role}</Badge>
              </div>
              <p className="text-xs font-mono text-brand-muted">
                Authenticated Owner Session: <strong className="text-brand-text">{user.email}</strong>
              </p>
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Terminate Admin Session</span>
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-xl bg-dark-surface border border-white/10 max-w-2xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-brand-cyan text-dark-bg font-bold' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
              activeTab === 'projects' ? 'bg-brand-cyan text-dark-bg font-bold' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects Manager ({projectsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
              activeTab === 'research' ? 'bg-brand-cyan text-dark-bg font-bold' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research Status</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card className="bg-dark-surface">
                <div className="text-xs font-mono text-brand-subtle">Portfolio Projects</div>
                <div className="text-2xl font-bold font-mono text-brand-cyan mt-1">5 Core</div>
                <div className="text-[11px] text-brand-muted mt-1">100% Case Studies Ready</div>
              </Card>

              <Card className="bg-dark-surface">
                <div className="text-xs font-mono text-brand-subtle">Research Manuscripts</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">1 Primary</div>
                <div className="text-[11px] text-brand-muted mt-1">Scientific Reports (In Prep)</div>
              </Card>

              <Card className="bg-dark-surface">
                <div className="text-xs font-mono text-brand-subtle">Degrees Verified</div>
                <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">MSc + BSc</div>
                <div className="text-[11px] text-brand-muted mt-1">Bahir Dar & Debre Berhan</div>
              </Card>

              <Card className="bg-dark-surface">
                <div className="text-xs font-mono text-brand-subtle">Deployment Target</div>
                <div className="text-2xl font-bold font-mono text-brand-text mt-1">Vercel SSL</div>
                <div className="text-[11px] text-brand-muted mt-1">kibretai.vercel.app</div>
              </Card>
            </div>

            {/* Quick Profile Summary */}
            <Card className="border-brand-cyan/20">
              <h2 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-3">
                Owner Credentials & Metadata
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded bg-dark-bg border border-white/5 space-y-1">
                  <span className="text-brand-subtle">Primary Roles:</span>
                  <p className="text-brand-text font-semibold">{profileData.primaryTitle}</p>
                </div>

                <div className="p-3 rounded bg-dark-bg border border-white/5 space-y-1">
                  <span className="text-brand-subtle">Primary Email Target:</span>
                  <p className="text-brand-text font-semibold">{profileData.email}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Projects Manager */}
        {activeTab === 'projects' && (
          <Card>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="font-mono text-sm font-bold text-brand-text">
                Manage Portfolio Projects
              </h2>
              <span className="text-xs font-mono text-brand-cyan">5 Projects Active</span>
            </div>

            <div className="space-y-4">
              {projectsList.map((project, idx) => (
                <div
                  key={project.slug}
                  className="p-4 rounded-xl bg-dark-bg border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-brand-cyan font-bold">0{idx + 1}.</span>
                      <span className="text-brand-text font-semibold text-sm">{project.title}</span>
                      <Badge variant="cyan">{project.category}</Badge>
                    </div>
                    <p className="text-brand-muted text-[11px] font-sans">{project.tagline}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                      {project.status}
                    </span>
                    <a
                      href={`/work/${project.slug}`}
                      className="px-3 py-1.5 rounded bg-white/5 text-brand-cyan hover:bg-brand-cyan/10 transition-colors"
                    >
                      Inspect Case Study
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 3: Research Status */}
        {activeTab === 'research' && (
          <Card className="border-emerald-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="font-mono text-sm font-bold text-brand-text">
                  Research Manuscript Submission Tracker
                </h2>
                <p className="text-xs text-brand-muted font-sans mt-0.5">
                  Update public submission status for medical image segmentation manuscripts.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">Scientific Reports</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-bg border border-white/10 space-y-4 font-mono text-xs">
              <div>
                <span className="text-brand-subtle text-[11px]">Manuscript Title:</span>
                <p className="text-brand-text font-bold text-sm mt-0.5">
                  {researchData.manuscripts[0].title}
                </p>
              </div>

              <div>
                <span className="text-brand-subtle text-[11px]">Current Public Status:</span>
                <div className="flex items-center gap-3 mt-1">
                  {editingStatus ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded bg-dark-surface border border-brand-cyan/50 text-brand-text focus:outline-none"
                      />
                      <Button onClick={handleSaveManuscriptStatus} variant="primary" size="sm">
                        Save Status
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {manuscriptStatus}
                      </span>
                      <button
                        onClick={() => setEditingStatus(true)}
                        className="p-1.5 rounded hover:bg-white/10 text-brand-cyan transition-colors"
                        title="Edit Status"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

      </Container>
    </div>
  );
}
