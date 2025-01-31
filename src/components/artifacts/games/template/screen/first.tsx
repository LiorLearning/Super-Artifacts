import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { Button } from '@/components/ui/button';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { variable } = gameStateRef.current.state1;

  // Example 1: Fire-and-forget message
  const handleSimpleMessage = async () => {
    const messageId = await sendAdminMessage('agent', 'This message continues immediately!');
    console.log('Message sent with ID:', messageId);
  };

  // Example 2: Message with completion callback
  const handleCallbackMessage = async () => {
    await sendAdminMessage('agent', 'This message will log when audio completes', () => {
      console.log('Audio playback completed!');
    });
    console.log('This logs immediately');
  };

  // Example 3: Sequential messages with mixed patterns
  const handleSequentialMessages = async () => {
    
    // Second message - wait for completion
    await new Promise<void>((resolve) => {
      sendAdminMessage('agent', 'First message, waiting for completion', resolve);
    });
    
    // Third message - continues immediately but logs on completion
    await sendAdminMessage('agent', 'Second message', () => {
      console.log('Second message completed');
    });
  };

  return (
    <div className="mx-auto space-y-4 p-4">
      <Header variable={variable} />
      
      <div className="flex flex-col gap-4">
        <Button onClick={handleSimpleMessage}>
          Simple Message
        </Button>
        
        <Button onClick={handleCallbackMessage}>
          Message with Callback
        </Button>
        
        <Button onClick={handleSequentialMessages}>
          Sequential Messages
        </Button>
      </div>
    </div>
  );
}