'use client'

import React, { useContext, useRef, useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogMessage, MessageContext, AssistanceResponseMessage, AssistanceRequestMessage, Message as MessageType } from './MessageContext'
import { useWebSocketLogger, WebSocketStatus } from './websocket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SpeechToText from './utils/speech_to_text'
import { Pause, Volume2, Send } from 'lucide-react'
import { AudioContext } from './utils/audio_stream'
import { handleScreenshot } from './artifacts/utils/utils'

interface ChatProps {
  desc: string;
  gameState: any;
  componentRef: React.RefObject<HTMLDivElement>;
}

const MAX_MESSAGES = 10;

const Chat: React.FC<ChatProps> = ({ desc, gameState, componentRef }) => {
  const audioContext = useContext(AudioContext);
  if (!audioContext) throw new Error('MessageCard must be used within an AudioProvider');

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageContext = useContext(MessageContext);
  const { sendLog, toggleAudio } = useWebSocketLogger();
  const [inputMessage, setInputMessage] = useState('');

  const handleRecordingStart = () => {}

  const handleRecordingStop = async (blob: Blob) => {
    sendLog(blob);
    sendLog({
      type: 'assistance',
      timestamp: new Date().toISOString(),
      content: '',
      image: await handleScreenshot(componentRef),
      desc,
      gameState: JSON.stringify(gameState, null, 0),
    } as AssistanceRequestMessage);
  };

  const onSendTextMessage = async () => {
    if (!messageContext || !inputMessage.trim()) return;
    
    const image = await handleScreenshot(componentRef);
    const newMessage: AssistanceRequestMessage = {
      type: 'assistance',
      timestamp: new Date().toISOString(),
      content: inputMessage,
      isPlaying: false,
      messageId: crypto.randomUUID(),
      gameState: JSON.stringify(gameState, null, 0),
    };

    messageContext.setMessages(prev => [...prev, newMessage]);
    sendLog({
      ...newMessage,
      image,
      desc,
    });
    setInputMessage('');
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;
    
    const scrollToBottom = () => {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: 'smooth'
      });
    };

    scrollToBottom();
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(scrollArea, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [messageContext?.messages]);

  const renderMessage = (message: MessageType) => {
    switch (message.type) {
      case 'log':
        return (
          <div className="flex justify-center my-2">
            <div className="bg-card text-card-foreground text-xs py-2 px-4 md:px-10 rounded-lg shadow-sm border border-border w-[70%]">
              <p className="text-sm">{(message as LogMessage).componentName} {(message as LogMessage).event} {(message as LogMessage).id} - {(message as LogMessage).value}</p>
            </div>
          </div>
        );
      case 'assistance':
        return (
          <div className="flex justify-end mb-4">
            <div className="max-w-[70%] p-3 rounded-2xl bg-primary text-primary-foreground">
              {(message as AssistanceRequestMessage).content}
            </div>
          </div>
        );
      case 'agent':
        return (
          <div className="flex justify-start mb-4">
            <div className="max-w-[70%] p-3 rounded-2xl bg-secondary text-secondary-foreground">
              {(message as AssistanceResponseMessage).content}
              <div className="mt-2 flex justify-end">
                <Button 
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => toggleAudio(message)}
                >
                  {message.isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
        <WebSocketStatus />
      </div>
      
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messageContext?.messages.slice(-MAX_MESSAGES).map((message, index) => (
            <div key={index}>{renderMessage(message)}</div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendTextMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-xl"
          />
          <Button 
            onClick={onSendTextMessage}
            size="icon"
            className="rounded-2xl bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Send className="h-5 w-4" />
          </Button>
          <div className="relative w-1/2">
            <SpeechToText 
              onRecordingStart={handleRecordingStart} 
              onRecordingStop={handleRecordingStop}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat