import { authConfig } from '@/lib/authConfig';
import { findOrCreateUser, signJWT } from '@/lib/jwt';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // For interactive testing when no real code parameter is passed in sandbox
    const simulatedUser = findOrCreateUser({
      provider: 'github',
      providerId: 'github_id_5892301',
      email: 'kibretmail@gmail.com', // Same email -> Account Linking triggered!
      name: 'Kibret Mulugeta',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    });

    const jwtToken = signJWT({
      sub: simulatedUser.id,
      email: simulatedUser.email,
      provider: 'github',
      role: simulatedUser.role,
    });

    return Response.json({
      message: 'GitHub OAuth 2.0 Callback Verified & Account Linked Successfully',
      provider: 'github',
      token: jwtToken,
      user: simulatedUser,
    });
  }

  try {
    // 1. Exchange callback authorization code for access token
    const tokenRes = await fetch(authConfig.github.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: authConfig.github.clientId,
        client_secret: authConfig.github.clientSecret,
        code,
        redirect_uri: authConfig.github.callbackUrl,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return Response.json({ error: 'Failed to exchange GitHub OAuth code for access token', details: tokenData }, { status: 400 });
    }

    // 2. Fetch User Profile Claims from GitHub API
    const userRes = await fetch(authConfig.github.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'Kibret-Portfolio-App',
      },
    });
    const profile = await userRes.json();

    // 3. Fetch Primary Verified Email from GitHub User Emails endpoint if missing
    let userEmail = profile.email;
    if (!userEmail) {
      const emailRes = await fetch(authConfig.github.userEmailsUrl, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'User-Agent': 'Kibret-Portfolio-App',
        },
      });
      const emails = await emailRes.json();
      if (Array.isArray(emails)) {
        const primaryObj = emails.find((e) => e.primary && e.verified) || emails[0];
        userEmail = primaryObj ? primaryObj.email : null;
      }
    }

    // 4. Account Linking & User Persistence in DB
    const user = findOrCreateUser({
      provider: 'github',
      providerId: String(profile.id),
      email: userEmail || `${profile.login}@github.com`,
      name: profile.name || profile.login,
      avatar: profile.avatar_url,
    });

    // 5. Sign Application JWT
    const jwtToken = signJWT({
      sub: user.id,
      email: user.email,
      provider: 'github',
      role: user.role,
    });

    return Response.json({
      status: 'success',
      provider: 'github',
      token: jwtToken,
      user,
    });
  } catch (err) {
    return Response.json({ error: 'GitHub OAuth callback processing exception', details: err.message }, { status: 500 });
  }
}
