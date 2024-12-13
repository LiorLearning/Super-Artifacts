'use client'

import { useState } from 'react'
import { MessageProvider } from './MessageContext'
import { WebSocketProvider } from './websocket'
import Chat from './Chat'
import MathGamesContainer from './artifacts/gameMaster'


export default function Main() {
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  return (
    <MessageProvider>
      <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}api/v1/superartifacts/ws`}>
        <div className="flex h-screen">
          <div className="w-[75%] border-r-border flex flex-col">
            <MathGamesContainer setHtml={setHtmlOutput}  />
          </div>
          <div className="w-[25%] min-w-[250px] flex flex-col">
            <Chat html={htmlOutput} />
          </div>
        </div>
      </WebSocketProvider>
    </MessageProvider>
  )
}