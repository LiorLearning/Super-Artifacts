import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface Auth0Role {
  id: string;
  name: string;
  description?: string;
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

    // Fetch user roles using the token from environment variables
    const rolesResponse = await axios.get<Auth0Role[]>(
      `https://dev-ngkqwqrzndhtedqf.us.auth0.com/api/v2/users/${encodeURIComponent(session.user.sub)}/roles`,
      {
        headers: { 
          'Authorization': `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
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