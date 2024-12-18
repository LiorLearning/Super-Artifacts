'use client'

import React, { useContext, useRef, useCallback, useState, useLayoutEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LogMessage, 
  MessageContext, 
  AssistanceResponseMessage,
  AssistanceRequestMessage, 
  Message as MessageType 
} from './MessageContext'
import { useWebSocketLogger, WebSocketStatus } from './websocket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SpeechToText from './utils/speech_to_text'
import { Pause, Volume2, Send } from 'lucide-react'
import { AudioContext } from './utils/audio_stream'
import { handleScreenshot } from './artifacts/utils/utils'

interface ChatProps {
  desc: string;
  componentRef: React.RefObject<HTMLDivElement>;
}

const MAX_MESSAGES = 10;

const Chat: React.FC<ChatProps> = ({ desc, componentRef }) => {
  const audioContext = useContext(AudioContext);
  if (!audioContext) {
    throw new Error('MessageCard must be used within an AudioProvider');
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const messageContext = useContext(MessageContext);
  const { sendLog } = useWebSocketLogger();
  const [inputMessage, setInputMessage] = useState('');

  const handleStopAudio = (message: MessageType) => {
    audioContext.stopAudio(message.messageId);
  };

  const handlePlayAudio = (messageId: string, messageText: string) => {
    if (!messageText.trim()) {
      return;
    }

    // Update messages state immediately
    messageContext?.setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.messageId === messageId
          ? { ...msg, isPlaying: true }
          : { ...msg, isPlaying: false }
      )
    );

    audioContext.playAudio(messageId, messageText);
  };

  const toggleAudio = useCallback(async (message: MessageType) => {
    const isPlaying = message.isPlaying;
    console.log(`${isPlaying ? 'Pausing' : 'Playing'} audio for message ID:`, message.messageId);

    messageContext?.setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.messageId === message.messageId 
          ? { ...msg, isPlaying: !isPlaying }
          : msg
      )
    );

    if (isPlaying) {
      handleStopAudio(message);
    } else {
      handlePlayAudio(message.messageId, message.content!);
    }
  }, []);

  const handleRecordingStart = () => {}

  const handleRecordingStop = (blob: Blob) => {
    handleSendAudio(blob);
  };

  const handleSendAudio = async (blob: Blob) => {
    console.log("Blob: ", blob);
    sendLog(blob);
    sendLog({
      type: 'assistance',
      timestamp: new Date().toISOString(),
      content: '',
      image: await handleScreenshot(componentRef),
      desc: desc,
    } as AssistanceRequestMessage)
  };

  const onSendTextMessage = async () => {
    if (messageContext && inputMessage.trim()) {
      const image = await handleScreenshot(componentRef);
      const newMessage: AssistanceRequestMessage = {
        type: 'assistance',
        timestamp: new Date().toISOString(),
        content: inputMessage,
        image: image,
        desc: desc,
        isPlaying: false,
        messageId: crypto.randomUUID()
      }
      messageContext.setMessages((prevMessages) => [...prevMessages, newMessage])
      sendLog({
        type: 'assistance',
        timestamp: new Date().toISOString(),
        content: inputMessage,
        image: image,
        desc: desc,
      } as AssistanceRequestMessage)
      setInputMessage('')
    }
  };

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageContext?.messages]);

  const renderMessage = (message: MessageType) => {
    const isRequest = message.type === 'assistance'
    const isAction = message.type === 'log'
    const isAgent = message.type === 'agent'

    if (isAction) {
      const logMessage = message as LogMessage;
      return (
        <div className="flex justify-center my-2">
          <div className="bg-card text-card-foreground text-xs py-2 px-4 md:px-10 rounded-lg shadow-sm border border-border w-[70%] max-w-md">
            <p className="text-sm mb-1">{logMessage.componentName} {logMessage.event} {logMessage.id} - {logMessage.value} </p> 
          </div>
        </div>
      )
    }

    if (isRequest) {
      const requestMessage = message as AssistanceRequestMessage;
      return (
        <div className="flex justify-end mb-4">
          <div className="max-w-[70%] p-3 rounded-2xl bg-primary text-primary-foreground shadow-sm">
            {requestMessage.content}
          </div>
        </div>
      )
    }

    if (isAgent) {
      const agentMessage = message as AssistanceResponseMessage; 
      return (
        <div className="flex justify-start mb-4">
          <div className="max-w-[70%] p-3 rounded-2xl bg-secondary text-secondary-foreground shadow-sm">
            {agentMessage.content}
            <Button 
              size="sm"
              variant="outline"
              className="rounded-xl px-2 py-1"
              onClick={() => toggleAudio(message)}
            >
              {message.isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background">
        <h2 className="text-lg font-semibold text-foreground">Chat</h2>
        <WebSocketStatus />
      </div>
      
      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
        <div className="space-y-4">
          {messageContext?.messages.slice(-MAX_MESSAGES).map((message, index) => (
            <React.Fragment key={index}>
              {renderMessage(message)}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <Input 
            type="text" 
            value={inputMessage} 
            onChange={(e) => setInputMessage(e.target.value)} 
            placeholder="Type your message..." 
            className="flex-1 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSendTextMessage();
              }
            }}
          />
          <Button 
            onClick={onSendTextMessage}
            size="icon"
            className="rounded-2xl bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
          <div className='relative w-1/2'>
            <SpeechToText onRecordingStart={handleRecordingStart} onRecordingStop={handleRecordingStop} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat