export interface BaseProps {
    sendAdminMessage: (role: string, content: string) => void;
}

export interface State1 {
  selectedPieces: number;
  step: number;
}