export const dashboardData = {
  systemOverview: {
    totalRequests: "1,248,920",
    avgLatencyMs: 42,
    errorRatePercent: 0.04,
    activeSessions: 38,
    uptimePercent: 99.98,
    environment: "Production (Vercel + FastAPI Microservices)",
    requestVolume24h: [
      { time: "00:00", requests: 1200, latency: 38 },
      { time: "04:00", requests: 850, latency: 35 },
      { time: "08:00", requests: 3400, latency: 45 },
      { time: "12:00", requests: 5200, latency: 48 },
      { time: "16:00", requests: 4800, latency: 42 },
      { time: "20:00", requests: 2900, latency: 40 },
    ],
  },

  modelTelemetry: {
    activeModel: "Neuro-U-Net-v2",
    architecture: "Biologically Inspired Plasticity U-Net",
    diceScore: 0.894,
    iouScore: 0.812,
    inferenceSpeedMs: 14.8,
    vramUsageGb: 3.4,
    dataset: "ATLAS v2.0 MRI Stroke Lesions",
    preprocessingSteps: [
      { step: "N4 Bias Field Correction", status: "Completed", latency: "12ms" },
      { step: "Brain Extraction / Skull Stripping", status: "Completed", latency: "28ms" },
      { step: "Z-score Intensity Normalization", status: "Completed", latency: "5ms" },
      { step: "Resampling (1x1x1 mm³ isotropic)", status: "Completed", latency: "18ms" }
    ],
    confusionMatrix: {
      tp: 94.2,
      fp: 3.1,
      fn: 2.7,
      tn: 98.6
    }
  },

  authSessions: [
    {
      id: "sess_google_98231",
      provider: "Google OAuth 2.0",
      claims: { email: "kibretmail@gmail.com", role: "system_administrator", sub: "google-oauth2|1092837482" },
      issuedAt: "2026-07-23T18:00:00Z",
      expiresInMinutes: 42,
      status: "Active (JWT Verified)",
      ipAddress: "197.156.92.14"
    },
    {
      id: "sess_github_44102",
      provider: "GitHub OAuth 2.0",
      claims: { email: "researcher@bdu.edu.et", role: "collaborator", sub: "github|5892301" },
      issuedAt: "2026-07-23T19:15:00Z",
      expiresInMinutes: 118,
      status: "Active (JWT Verified)",
      ipAddress: "197.156.88.42"
    },
    {
      id: "sess_google_12049",
      provider: "Google OAuth 2.0",
      claims: { email: "evaluator@medical-ai.org", role: "read_only_auditor", sub: "google-oauth2|9982301" },
      issuedAt: "2026-07-23T20:30:00Z",
      expiresInMinutes: 210,
      status: "Active (JWT Verified)",
      ipAddress: "105.235.12.9"
    }
  ],

  taskQueue: [
    {
      id: "TASK-8902",
      name: "MRI Volume Batch Skull Stripping",
      category: "Preprocessing",
      priority: "High",
      state: "Processing",
      progressPercent: 68,
      timestamp: "21:24:10"
    },
    {
      id: "TASK-8901",
      name: "Neuro-Plasticity Weight Checkpointing",
      category: "Model Training",
      priority: "Critical",
      state: "Completed",
      progressPercent: 100,
      timestamp: "21:18:05"
    },
    {
      id: "TASK-8900",
      name: "JWT Token Revocation List Sync",
      category: "Security & Auth",
      priority: "Medium",
      state: "Completed",
      progressPercent: 100,
      timestamp: "21:05:40"
    },
    {
      id: "TASK-8899",
      name: "FastAPI Route Latency Profiling",
      category: "Backend Systems",
      priority: "Low",
      state: "Pending",
      progressPercent: 0,
      timestamp: "20:58:12"
    },
    {
      id: "TASK-8898",
      name: "Denoising Filter Kernel Compilation",
      category: "Computer Vision",
      priority: "Medium",
      state: "Completed",
      progressPercent: 100,
      timestamp: "20:45:00"
    }
  ]
};
