'use client'

import { MessageProvider } from '@/components/MessageContext';
import { WebSocketProvider } from '@/components/websocket';
import { Suspense } from 'react';
import SandboxPage from './sandbox';

export default function Page() {
  return (
    <MessageProvider>
        <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
            <Suspense fallback={<div>Loading...</div>}>
                <SandboxPage />
            </Suspense>
        </WebSocketProvider>
    </MessageProvider>
  )
}