export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'kibret_ai_production_jwt_master_secret_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'demo_google_client_id.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo_google_client_secret',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'https://kibretai.vercel.app/api/auth/google/callback',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: 'openid email profile',
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID || 'demo_github_client_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo_github_client_secret',
    callbackUrl: process.env.GITHUB_CALLBACK_URL || 'https://kibretai.vercel.app/api/auth/github/callback',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
    userEmailsUrl: 'https://api.github.com/user/emails',
    scope: 'read:user user:email',
  },
};
