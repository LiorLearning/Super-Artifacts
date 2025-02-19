import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface Auth0Role {
  id: string;
  name: string;
  description?: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// Type guard for Axios errors
function isAxiosError(error: unknown): error is { response?: { data: unknown, status?: number, headers?: unknown } } {
  return (
    typeof error === 'object' && 
    error !== null && 
    'response' in error
  );
}

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Management API token
    const tokenResponse = await axios.post<TokenResponse>(
      'https://dev-ngkqwqrzndhtedqf.us.auth0.com/oauth/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_API_CLIENT_ID || '',
        client_secret: process.env.AUTH0_API_CLIENT_SECRET || '',
        audience: 'https://dev-ngkqwqrzndhtedqf.us.auth0.com/api/v2/'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log(tokenResponse.data);

    // Fetch user roles using the obtained token
    const rolesResponse = await axios.get<Auth0Role[]>(
      `https://dev-ngkqwqrzndhtedqf.us.auth0.com/api/v2/users/${encodeURIComponent(session.user.sub)}/roles`,
      {
        headers: { 
          'Authorization': `Bearer ${tokenResponse.data.access_token}`,
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json(rolesResponse.data);
  } catch (error: unknown) {
    console.error('Error fetching user roles:', error);
    
    // More detailed error logging
    if (isAxiosError(error)) {
      console.error('Detailed Axios error:', {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }

    return NextResponse.json({ 
      error: 'Failed to fetch roles', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 

