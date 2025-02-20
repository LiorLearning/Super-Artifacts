'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of an Auth0 role
interface Auth0Role {
  id: string;
  name: string;
  description?: string;
}

export default function Profile() {
  const { user, isLoading } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (user) {
        try {
          const response = await axios.get<Auth0Role[]>('/api/user/roles');
          setUserRoles(response.data.map(role => role.name));
        } catch (error) {
          console.error('Error fetching user roles:', error);
        }
      }
    };

    fetchUserRoles();
  }, [user]);

  if (isLoading || !user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center"
      >
        <Image
          src={user.picture || '/default-avatar.png'}
          alt={user.name || 'Profile'}
          width={32}
          height={32}
          className="rounded-full border-2 border-gray-200"
        />
      </button>

      {showDropdown && (
        <div 
          className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
        >
          <p className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
            {user.name}
          </p>
          {userRoles.length > 0 && (
            <p className="px-4 py-2 text-xs text-gray-500">
              Roles: {userRoles.join(', ')}
            </p>
          )}
          <a 
            href="/api/auth/logout"
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/api/auth/logout';
            }}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}






