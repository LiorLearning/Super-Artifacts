export const COLORS = {
  pink: '#FF497C',
  blue: '#0099FF',
  purple: '#C800FF',
  gray: '#DDDDDD',
  lightRed: '#FFCCCC',
  pinkLight: '#FCF0FF',
  lightGreen: '#99F6E4',
  lightYellow: '#F6FFB7',
  lightPurple: '#DDD6FE',
}


export interface BaseProps {
  sendAdminMessage: (role: string, content: string) => void;
}