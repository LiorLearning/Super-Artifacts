interface PieceConfig {
  color: number;
  opacity: number;
  position: [number, number, number];
}

export const HOLDER_POSITION: [number, number, number] = [-1, 0, 0];

export const INITIAL_PIECES_CONFIG: PieceConfig[] = [
  { color: 0x66ff66, opacity: 1, position: [3, 1, -2] }, // Changed to a better green color
  { color: 0x66ff66, opacity: 1, position: [3, 1, -1] }, // Changed to a better green color
  { color: 0x66ff66, opacity: 1, position: [3, 1, 0] }, // Changed to a better green color
  { color: 0x66ff66, opacity: 1, position: [3, 1, 1] }  // Changed to a better green color
];