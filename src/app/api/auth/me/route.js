import { authenticateJWT } from '@/lib/authMiddleware';

export async function GET(req) {
  const authResult = await authenticateJWT(req);

  if (!authResult.authenticated) {
    return authResult.response;
  }

  return Response.json({
    status: 'authenticated',
    message: 'JWT Token verified successfully via Authorization: Bearer middleware',
    userContext: authResult.user,
  });
}
