export interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export interface Position {
  x: any;
  y: any;
}

export interface Vector {
  x: number;
  y: number;
}