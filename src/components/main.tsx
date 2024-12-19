'use client'

import { useRef } from 'react'
import { MessageProvider } from './MessageContext'
import { WebSocketProvider } from './websocket'
import MathGamesContainer from './artifacts/gameMaster'


export default function Main() {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const setComponentRef = (ref: React.RefObject<HTMLDivElement>) => {
    componentRef.current = ref.current;
  };

  return (
    <MessageProvider>
      <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
        <MathGamesContainer setComponentRef={setComponentRef} />
      </WebSocketProvider>
    </MessageProvider>
  )
}