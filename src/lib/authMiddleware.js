import { verifyJWT } from './jwt';

/**
 * Next.js App Router Protected Route Middleware Wrapper
 * Extracts Bearer token, verifies JWT, and enforces required roles.
 */
export async function authenticateJWT(req, requiredRole = null) {
  try {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        authenticated: false,
        status: 401,
        response: Response.json(
          { error: 'Unauthorized: Missing or malformed Bearer token' },
          { status: 401 }
        ),
      };
    }

    const token = authHeader.split(' ')[1];
    const { valid, payload, error } = verifyJWT(token);

    if (!valid || !payload) {
      return {
        authenticated: false,
        status: 401,
        response: Response.json(
          { error: `Unauthorized: ${error || 'Invalid JWT token'}` },
          { status: 401 }
        ),
      };
    }

    // Role-based Access Control (RBAC) check
    if (requiredRole && payload.role !== requiredRole && payload.role !== 'OWNER_ADMIN') {
      return {
        authenticated: false,
        status: 403,
        response: Response.json(
          { error: `Forbidden: Required role [${requiredRole}] not granted` },
          { status: 403 }
        ),
      };
    }

    return {
      authenticated: true,
      user: payload,
    };
  } catch (err) {
    return {
      authenticated: false,
      status: 500,
      response: Response.json(
        { error: 'Internal Server Auth Error' },
        { status: 500 }
      ),
    };
  }
}
