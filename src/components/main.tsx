'use client'

import { useRef } from 'react'
import { MessageProvider } from './MessageContext'
import { WebSocketProvider } from './websocket'
import { GameStateProviderWrapper } from './artifacts/gameMaster'
// import Profile from './auth/profile'
import { Suspense } from 'react'

export default function Main() {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const setComponentRef = (ref: React.RefObject<HTMLDivElement>) => {
    componentRef.current = ref.current;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessageProvider>
        <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
          <GameStateProviderWrapper setComponentRef={setComponentRef} />
        </WebSocketProvider>
      </MessageProvider>
    </Suspense>
  )
}