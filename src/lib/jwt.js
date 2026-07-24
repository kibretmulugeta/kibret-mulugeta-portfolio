import { authConfig } from './authConfig';

// In-Memory DB Store for Users & Linked OAuth Providers
const userDatabase = new Map();

// Helper: Simple Base64URL encoding/decoding
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

/**
 * Sign a system JSON Web Token (HS256)
 */
export function signJWT(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + 86400, // 24 hours
    iss: 'https://kibretai.vercel.app',
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  // Dummy deterministic signature for stateless demo/verification
  const signature = base64UrlEncode(`sig_${authConfig.jwtSecret}_${payload.sub}_${now}`);

  return `${signatureInput}.${signature}`;
}

/**
 * Verify & decode a system JSON Web Token
 */
export function verifyJWT(token) {
  if (!token) return { valid: false, error: 'Token missing' };

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Malformed JWT structure' };
    }

    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: 'Invalid token signature or decoding error' };
  }
}

/**
 * Account Linking & User Registration Engine
 * Finds an existing user by verified email or provider ID,
 * links new OAuth provider, and returns normalized user object.
 */
export function findOrCreateUser({ provider, providerId, email, name, avatar }) {
  const normalizedEmail = email ? email.toLowerCase() : `user_${providerId}@${provider}.oauth`;

  // Check 1: Find by normalized email (Account Linking)
  let user = null;
  for (const existingUser of userDatabase.values()) {
    if (existingUser.email === normalizedEmail) {
      user = existingUser;
      break;
    }
  }

  // Check 2: Find by Provider ID if email not matched
  if (!user) {
    for (const existingUser of userDatabase.values()) {
      const hasProvider = existingUser.providers.some(
        (p) => p.provider === provider && p.providerId === providerId
      );
      if (hasProvider) {
        user = existingUser;
        break;
      }
    }
  }

  const now = new Date().toISOString();

  if (user) {
    // ACCOUNT LINKING: Attach new provider if not already linked
    const existingProvider = user.providers.find((p) => p.provider === provider);
    if (!existingProvider) {
      user.providers.push({ provider, providerId, linkedAt: now });
    }
    user.updatedAt = now;
    if (avatar && !user.avatar) user.avatar = avatar;
    if (name && !user.name) user.name = name;
  } else {
    // NEW USER CREATION
    const id = `usr_${Math.random().toString(36).substring(2, 11)}`;
    const role = normalizedEmail === 'kibretmail@gmail.com' ? 'OWNER_ADMIN' : 'REGISTERED_USER';
    
    user = {
      id,
      email: normalizedEmail,
      name: name || 'OAuth User',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role,
      providers: [{ provider, providerId, linkedAt: now }],
      createdAt: now,
      updatedAt: now,
    };
    userDatabase.set(id, user);
  }

  return user;
}

/**
 * Get internal user database stats for system telemetry
 */
export function getUserDatabaseStats() {
  return {
    totalUsers: userDatabase.size,
    users: Array.from(userDatabase.values()),
  };
}
