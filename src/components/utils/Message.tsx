import React, { useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageContext, LogMessage, AssistanceRequestMessage, AssistanceResponseMessage } from '../MessageContext';

const Message = () => {
  const messageContext = useContext(MessageContext);

  if (!messageContext) {
    throw new Error('Message must be used within a MessageProvider');
  }

return (
  <div className="p-4 space-y-4 overflow-y-auto h-full">
    {messageContext.messages.map((message, i) => (
      <Card
        key={i}
        className={
          message.type === 'log'
            ? 'bg-chart-2'
            : message.type === 'agent'
            ? 'bg-chart-3'
            : 'bg-chart-5'
        }
      >
        <CardContent className="p-3">
          {message.type === 'log' ? (
            <>
              <p className="text-sm">
                <strong>Component Name:</strong> {(message as LogMessage).componentName}
              </p>
              <p className="text-sm">
                <strong>Event:</strong> {(message as LogMessage).event}
              </p>
              <p className="text-sm">
                <strong>ID:</strong> {(message as LogMessage).id}
              </p>
              {(message as LogMessage).value && (
                <p className="text-sm">
                  <strong>Value:</strong> {(message as LogMessage).value}
                </p>
              )}
            </>
          ) : message.type === 'agent' ? (
            <p className="text-sm">{(message as AssistanceResponseMessage).content}</p>
          ) : (
            <p className="text-sm">{(message as AssistanceRequestMessage).content}</p>
          )}
          <p className="text-xs mt-2 text-right">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);
};

export default Message;
