'use client'

import { useRef } from 'react'
import { MessageProvider } from './MessageContext'
import { WebSocketProvider } from './websocket'
import MathGamesContainer from './artifacts/gameMaster'
import { GameStateProvider } from './utils/game-state'
import { useSearchParams } from 'next/navigation'


export default function Main() {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const setComponentRef = (ref: React.RefObject<HTMLDivElement>) => {
    componentRef.current = ref.current;
  };

  const searchParams = useSearchParams();
  const gameParam = searchParams.get('game') as string;
  

  return (
    <MessageProvider>
      <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
        <GameStateProvider gameName={gameParam}>
          <MathGamesContainer setComponentRef={setComponentRef} />
        </GameStateProvider>
      </WebSocketProvider>
    </MessageProvider>
  )
}