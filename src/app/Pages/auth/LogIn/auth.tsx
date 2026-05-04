'use server';

/**
 * Server Action - Login with Keycloak
 * Prints both Access Token and Refresh Token clearly in terminal
 */
export async function loginUser(formData: FormData) {
  try {
    const username = formData.get('username')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (!username || !password) {
      return { success: false, error: 'Username and password are required' };
    }

    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET!;
    const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL!;
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM!;

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('username', username);
    params.append('password', password);

    const url = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`;

    console.log(`🔗 Attempting login to: ${url}`);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
      cache: 'no-store'
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('❌ Keycloak Login Failed:', data);
      return {
        success: false,
        error: data?.error_description || 'Invalid credentials or client configuration',
      };
    }

    // ==================== TOKEN LOGGING ====================
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                    LOGIN SUCCESSFUL                        ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║ Access Token:');
    console.log('║ ' + data.access_token);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║ Refresh Token:');
    console.log('║ ' + (data.refresh_token || 'No refresh token returned'));
    console.log('╚════════════════════════════════════════════════════════════╝');

    console.log('✅ Tokens successfully received and logged');

    return {
      success: true,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };

  } catch (error) {
    console.error('🚨 Auth Error:', error);
    return { 
      success: false, 
      error: 'Connection to Keycloak failed. Check if Keycloak is running.' 
    };
  }
}