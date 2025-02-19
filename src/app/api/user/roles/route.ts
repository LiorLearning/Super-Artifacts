import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch Management API token
    const tokenResponse = await axios.post(
      `https://dev-ngkqwqrzndhtedqf.us.auth0.com/oauth/token`,
      {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://dev-ngkqwqrzndhtedqf.us.auth0.com/api/v2/`
      },
      {
        headers: { 'content-type': 'application/json' }
      }
    );

    // Fetch user roles
    const rolesResponse = await axios.get(
      `https://dev-ngkqwqrzndhtedqf.us.auth0.com/api/v2/users/${session.user.sub}/roles`,
      {
        headers: { 
          Authorization: `Bearer ${tokenResponse.data.access_token}` 
        }
      }
    );

    return NextResponse.json(rolesResponse.data);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
} 