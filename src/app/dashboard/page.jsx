import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCTA from '@/components/sections/ContactCTA';
import AnalyticsOverview from '@/components/dashboard/AnalyticsOverview';
import ModelMetrics from '@/components/dashboard/ModelMetrics';
import AuthLog from '@/components/dashboard/AuthLog';
import TaskTable from '@/components/dashboard/TaskTable';
import { dashboardData } from '@/data/dashboard';

export const metadata = {
  title: 'Analytics & System Telemetry Dashboard | Kibret Mulugeta',
  description: 'Real-time telemetry, U-Net AI model metrics, OAuth 2.0 / JWT security logs, and task queue monitoring.',
};

export default function DashboardPage() {
  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container className="space-y-12">
        <SectionHeader
          badge="Live System Telemetry"
          title="System Infrastructure & AI Model Analytics"
          subtitle="Real-time performance profiling across API request volume, U-Net medical segmentation accuracy, OAuth 2.0 / JWT security sessions, and asynchronous task execution."
        />

        {/* Panel A: API Infrastructure */}
        <AnalyticsOverview data={dashboardData.systemOverview} />

        {/* Panel B: AI/ML Telemetry */}
        <ModelMetrics data={dashboardData.modelTelemetry} />

        {/* Panel C: OAuth 2.0 / JWT Auth Session Activity */}
        <AuthLog sessions={dashboardData.authSessions} />

        {/* Panel D: Task Queue & Scheduler */}
        <TaskTable tasks={dashboardData.taskQueue} />

      </Container>

      <div className="mt-20">
        <ContactCTA />
      </div>
    </div>
  );
}
