'use client'

import { MessageProvider } from '@/components/MessageContext';
import { WebSocketProvider } from '@/components/websocket';
import SandboxPage from './sandbox';

export default function Page() {
  return (
    <MessageProvider>
        <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
            <SandboxPage />
        </WebSocketProvider>
    </MessageProvider>
  )
}