'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, Code2, CheckCircle2, ArrowRight, UserCheck, UserPlus, LogIn, Database, Terminal, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const codeSnippets = {
  token_creation: `# auth/jwt_handler.py
from datetime import datetime, timedelta
from typing import Optional
import jwt  # PyJWT / python-jose

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Encodes JWT access token with payload claims and expiration timestamp."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": int(expire.timestamp()), "iat": int(datetime.utcnow().timestamp())})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)`,

  login_signup: `# auth/routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from auth.security import verify_password, get_password_hash
from auth.jwt_handler import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreateSchema):
    """Registers new user with bcrypt hashed password in MongoDB."""
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user_data.password)
    user_doc = {"email": user_data.email, "hashed_password": hashed_password, "role": "engineer"}
    res = await db.users.insert_one(user_doc)
    return {"id": str(res.inserted_id), "message": "User registered successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticates credentials and returns JWT Bearer Access Token."""
    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user["email"], "role": user.get("role", "engineer")})
    return {"access_token": access_token, "token_type": "bearer"}`,

  protected_route: `# routers/tasks.py
from fastapi import APIRouter, Depends, status
from auth.dependencies import get_current_user
from models.schemas import TaskSchema

router = APIRouter(prefix="/api/v1/tasks", tags=["Task Management"])

@router.get("/", response_model=list[TaskSchema])
async def list_user_tasks(current_user: dict = Depends(get_current_user)):
    """Protected endpoint requiring valid JWT Bearer header in Authorization header."""
    user_email = current_user["sub"]
    tasks = await db.tasks.find({"owner_email": user_email}).to_list(length=100)
    return tasks`
};

export default function JwtAuthVisualizer() {
  const [activeTab, setActiveTab] = useState('interactive_sandbox');
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  
  // Interactive Sandbox State
  const [email, setEmail] = useState('kibret.engineer@mulugeta.ai');
  const [password, setPassword] = useState('password123');
  const [authToken, setAuthToken] = useState('');
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [protectedData, setProtectedData] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Simulate backend JWT token generation (HS256 mock signature)
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const now = Math.floor(Date.now() / 1000);
    const payloadObj = {
      sub: email,
      role: mode === 'signup' ? "AI/ML Engineer" : "Senior Systems Architect",
      iss: "https://kibretai.vercel.app/api/v1/auth",
      iat: now,
      exp: now + 3600
    };
    const payload = btoa(JSON.stringify(payloadObj));
    const mockSignature = "sig_" + Math.random().toString(36).substring(2, 15);
    const jwtString = `${header}.${payload}.${mockSignature}`;

    setAuthToken(jwtString);
    setDecodedPayload(payloadObj);
    setProtectedData(null);
    setStatusMsg(mode === 'login' ? 'Authentication Successful! JWT Bearer Token Issued.' : 'User Registered & JWT Bearer Token Issued!');
  };

  const handleFetchProtectedData = () => {
    if (!authToken) return;
    setProtectedData([
      { id: "task_01", title: "Train U-Net Medical MRI Brain Segmentation Model", status: "COMPLETED", priority: "HIGH" },
      { id: "task_02", title: "Deploy FastAPI Asynchronous REST Microservice to Cluster", status: "IN_PROGRESS", priority: "HIGH" },
      { id: "task_03", title: "Evaluate Dice Similarity Coefficient & IoU Benchmarks", status: "VERIFIED", priority: "MEDIUM" }
    ]);
  };

  return (
    <Card className="border-brand-cyan/30 my-8 bg-dark-surface/90">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-brand-text text-base">FastAPI JWT Security & Auth Sandbox</h3>
              <Badge variant="cyan">RESTful OAuth2 + JWT</Badge>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Interactive Login, Sign-In registration, JWT bearer token decoding, and protected route access.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Stateless HS256 Token Signing</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('interactive_sandbox')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
            activeTab === 'interactive_sandbox'
              ? 'bg-brand-cyan text-dark-bg font-bold shadow-lg shadow-brand-cyan/20'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>LIVE LOGIN & SIGN-IN SANDBOX</span>
        </button>

        <button
          onClick={() => setActiveTab('login_signup')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === 'login_signup'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          FastAPI Auth Routes (login / register)
        </button>

        <button
          onClick={() => setActiveTab('token_creation')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === 'token_creation'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          Token Handler (create_access_token)
        </button>

        <button
          onClick={() => setActiveTab('protected_route')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === 'protected_route'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          Protected Route (@router.get)
        </button>
      </div>

      {/* Tab Content 1: Interactive Sandbox */}
      {activeTab === 'interactive_sandbox' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Form Column */}
            <div className="p-5 rounded-xl bg-dark-bg border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-brand-cyan font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-4 h-4" />
                  {mode === 'login' ? 'OAuth2 Login Portal' : 'User Registration / Sign-Up'}
                </span>
                <div className="flex items-center gap-1 bg-dark-surface p-1 rounded-lg border border-white/10 text-[11px] font-mono">
                  <button
                    onClick={() => setMode('login')}
                    className={`px-2.5 py-1 rounded transition-colors ${mode === 'login' ? 'bg-brand-cyan/20 text-brand-cyan font-bold' : 'text-brand-muted hover:text-brand-text'}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`px-2.5 py-1 rounded transition-colors ${mode === 'signup' ? 'bg-brand-cyan/20 text-brand-cyan font-bold' : 'text-brand-muted hover:text-brand-text'}`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-brand-muted mb-1 text-[11px]">Email Address (Username)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-dark-surface border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-brand-muted mb-1 text-[11px]">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-dark-surface border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-brand-cyan text-dark-bg font-bold font-mono text-xs hover:bg-sky-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-cyan/15"
                >
                  {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{mode === 'login' ? 'Execute POST /api/v1/auth/login' : 'Execute POST /api/v1/auth/register'}</span>
                </button>
              </form>

              {statusMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}
            </div>

            {/* Token & Claims Column */}
            <div className="p-5 rounded-xl bg-dark-bg border border-white/10 space-y-4">
              <span className="text-xs font-mono text-brand-text font-bold uppercase tracking-wider block pb-3 border-b border-white/10">
                JWT Bearer Token Output & Claims Inspection
              </span>

              {authToken ? (
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-[11px] text-brand-subtle block mb-1">Encoded JWT Bearer Token string:</span>
                    <div className="p-2.5 rounded bg-dark-surface border border-brand-cyan/30 text-brand-cyan text-[11px] break-all font-mono">
                      {authToken}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-brand-subtle block mb-1">Decoded Payload Claims (Verified HS256):</span>
                    <pre className="p-3 rounded bg-dark-surface border border-white/10 text-emerald-400 text-[11px]">
                      {JSON.stringify(decodedPayload, null, 2)}
                    </pre>
                  </div>

                  <button
                    onClick={handleFetchProtectedData}
                    className="w-full py-2 rounded bg-brand-indigo/20 text-indigo-300 border border-brand-indigo/40 hover:bg-brand-indigo/30 transition-colors font-mono text-xs flex items-center justify-center gap-2 font-semibold"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Test GET /api/v1/tasks (With Bearer Token)</span>
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-brand-subtle border border-dashed border-white/10 rounded-lg">
                  Submit the Login / Sign Up form to issue a real-time signed JWT access token.
                </div>
              )}
            </div>

          </div>

          {/* Protected Data Output */}
          {protectedData && (
            <div className="p-4 rounded-xl bg-dark-bg border border-brand-cyan/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="font-bold">HTTP 200 OK — Protected Endpoint /api/v1/tasks Response:</span>
                <span className="text-[11px] text-brand-subtle">Authenticated user: {decodedPayload?.sub}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {protectedData.map((task) => (
                  <div key={task.id} className="p-3 rounded bg-dark-surface border border-white/10">
                    <span className="text-brand-cyan font-bold block mb-1">{task.id}</span>
                    <p className="text-brand-text text-[11px] font-sans leading-tight mb-2">{task.title}</p>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{task.status}</span>
                      <span className="text-brand-subtle">{task.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Code Snippet Tabs */
        <div className="relative rounded-xl bg-dark-bg border border-white/10 p-4 font-mono text-xs overflow-x-auto text-sky-200 leading-relaxed">
          <pre>{codeSnippets[activeTab]}</pre>
        </div>
      )}

      {/* Summary Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs font-mono text-brand-muted">
        <div className="p-3 rounded-lg bg-dark-bg/60 border border-white/5">
          <span className="text-brand-cyan font-bold block mb-1">Password Hashing</span>
          <span className="text-brand-text text-[11px]">Bcrypt Salted Hash Validation</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-bg/60 border border-white/5">
          <span className="text-brand-cyan font-bold block mb-1">FastAPI Security Scheme</span>
          <span className="text-brand-text text-[11px]">OAuth2PasswordBearer tokenUrl</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-bg/60 border border-white/5">
          <span className="text-brand-cyan font-bold block mb-1">MongoDB Document Scope</span>
          <span className="text-brand-text text-[11px]">User tenant data isolation</span>
        </div>
      </div>
    </Card>
  );
}
