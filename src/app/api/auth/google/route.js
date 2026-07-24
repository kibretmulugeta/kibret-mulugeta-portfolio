import { authConfig } from '@/lib/authConfig';

export async function GET(req) {
  const { authUrl, clientId, callbackUrl, scope } = authConfig.google;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    response_type: 'code',
    scope: scope,
    access_type: 'offline',
    prompt: 'consent',
  });

  const redirectTarget = `${authUrl}?${params.toString()}`;

  return Response.redirect(redirectTarget);
}
