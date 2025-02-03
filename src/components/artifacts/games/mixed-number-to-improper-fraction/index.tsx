import Game from './game';

interface MixedNumberToImproperFractionProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

export default function MixedNumberToImproperFraction({ sendAdminMessage }: MixedNumberToImproperFractionProps) {
  return <Game sendAdminMessage={sendAdminMessage} />;
} 