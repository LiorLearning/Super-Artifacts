'use client'

import { useRef, useState } from 'react'
import { MessageProvider } from './MessageContext'
import { WebSocketProvider } from './websocket'
import Chat from './Chat'
import MathGamesContainer from './artifacts/gameMaster'


export default function Main() {
  const [desc, setDesc] = useState<string>('');
  const componentRef = useRef<HTMLDivElement | null>(null);
  const setComponentRef = (ref: React.RefObject<HTMLDivElement>) => {
    componentRef.current = ref.current;
  };

  return (
    <MessageProvider>
      <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
        <div className="flex h-screen">
          <div className="w-[75%] border-r-border flex flex-col">
            <MathGamesContainer setComponentRef={setComponentRef} setDesc={setDesc} />
          </div>
          <div className="w-[25%] min-w-[250px] flex flex-col">
            <Chat desc={desc} componentRef={componentRef} />
          </div>
        </div>
      </WebSocketProvider>
    </MessageProvider>
  )
}