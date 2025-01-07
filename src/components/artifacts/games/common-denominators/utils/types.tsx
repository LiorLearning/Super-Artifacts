export const COLORS = {
  pink: '#FF497C',
  blue: '#0099FF',
  purple: '#C800FF',
  gray: '#DDDDDD',
  pinkLight: '#FCF0FF',
}


export interface BaseProps {
  sendAdminMessage: (role: string, content: string) => void;
}