export const COLORS = {
  pink: '#FF497C',
  blue: '#0099FF',
  purple: '#C800FF',
}


export interface BaseProps {
  sendAdminMessage: (role: string, content: string) => void;
}