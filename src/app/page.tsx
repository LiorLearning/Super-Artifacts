import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import Main from "@/components/main";
import { Suspense } from "react";

export default async function Home() {
  const session = await getSession();
  const authRequired = process.env.NEXT_PUBLIC_AUTH_REQUIRED === 'true';

  if (authRequired && !session?.user) {
    redirect('/api/auth/login');
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  );
}
