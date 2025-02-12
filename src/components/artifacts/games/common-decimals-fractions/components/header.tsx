import React from 'react';

interface HeaderProps {
  variable: number;
}

export default function Header({ variable } : HeaderProps) {
  return (
    <div className="w-full bg-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Game Header</h1>
      </div>
      <div className="text-lg">
        {variable}
      </div>
    </div>
  );
}
