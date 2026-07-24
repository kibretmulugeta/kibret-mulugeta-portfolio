import { authConfig } from '@/lib/authConfig';

export async function GET(req) {
  const { authUrl, clientId, callbackUrl, scope } = authConfig.github;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    scope: scope,
  });

  const redirectTarget = `${authUrl}?${params.toString()}`;

  return Response.redirect(redirectTarget);
}
