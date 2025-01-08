export const COLORS = {
  pink: '#FF497C',
  blue: '#0099FF',
  purple: '#C800FF',
  gray: '#DDDDDD',
  pinkLight: '#FCF0FF',
  lightGreen: '#99F6E4',
  lightPurple: '#DDD6FE',
}


export interface BaseProps {
  sendAdminMessage: (role: string, content: string) => void;
}