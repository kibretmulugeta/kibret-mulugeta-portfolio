'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, Code2, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
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
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt`,

  dependency_injection: `# auth/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """FastAPI dependency verifying JWT Bearer header on protected endpoints."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return {"username": username, "role": payload.get("role", "user")}
    except jwt.PyJWTError:
        raise credentials_exception`,

  protected_route: `# routers/tasks.py
from fastapi import APIRouter, Depends, status
from auth.dependencies import get_current_user
from models.schemas import TaskSchema

router = APIRouter(prefix="/api/v1/tasks", tags=["Task Management"])

@router.get("/", response_model=list[TaskSchema])
async def list_user_tasks(current_user: dict = Depends(get_current_user)):
    """Protected endpoint requiring valid JWT Bearer header in Authorization header."""
    user_id = current_user["username"]
    tasks = await db.tasks.find({"owner_id": user_id}).to_list(length=100)
    return tasks`
};

export default function JwtAuthVisualizer() {
  const [activeTab, setActiveTab] = useState('token_creation');

  return (
    <Card className="border-brand-cyan/30 my-8 bg-dark-surface/90">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-brand-text text-base">FastAPI JWT Security & Auth Architecture</h3>
              <Badge variant="cyan">RESTful OAuth2</Badge>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Stateless bearer token authentication, payload claim signing, and FastAPI dependency injection.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Stateless HS256 Token Signing</span>
        </div>
      </div>

      {/* Code Snippet Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveTab('token_creation')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === 'token_creation'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          1. Token Creation (create_access_token)
        </button>

        <button
          onClick={() => setActiveTab('dependency_injection')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === 'dependency_injection'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          2. Dependency Injection (get_current_user)
        </button>

        <button
          onClick={() => setActiveTab('protected_route')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === 'protected_route'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
              : 'bg-dark-bg text-brand-muted hover:text-brand-text border border-white/5'
          }`}
        >
          3. Protected Route (@router.get)
        </button>
      </div>

      {/* Code Block Container */}
      <div className="relative rounded-xl bg-dark-bg border border-white/10 p-4 font-mono text-xs overflow-x-auto text-sky-200 leading-relaxed">
        <pre>{codeSnippets[activeTab]}</pre>
      </div>

      {/* Authentication Data Flow Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs font-mono text-brand-muted">
        <div className="p-3 rounded-lg bg-dark-bg/60 border border-white/5">
          <span className="text-brand-cyan font-bold block mb-1">Authorization Header</span>
          <span className="text-brand-text text-[11px]">Bearer eyJhbGciOiJIUzI1Ni...</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-bg/60 border border-white/5">
          <span className="text-brand-cyan font-bold block mb-1">FastAPI Security Scheme</span>
          <span className="text-brand-text text-[11px]">OAuth2PasswordBearer tokenUrl</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-bg/60 border border-white/5">
          <span className="text-brand-cyan font-bold block mb-1">MongoDB Document Owner</span>
          <span className="text-brand-text text-[11px]">Scoped query by user_id</span>
        </div>
      </div>
    </Card>
  );
}
