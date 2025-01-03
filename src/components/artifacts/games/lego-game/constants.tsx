interface PieceConfig {
  color: number;
  opacity: number;
  position: [number, number, number];
}

export const HOLDER_POSITION: [number, number, number] = [-1, 0, 0];

export const INITIAL_PIECES_CONFIG: PieceConfig[] = [
  { color: 0x44ff44, opacity: 1, position: [3, 1, -2] },
  { color: 0x44ff44, opacity: 1, position: [3, 1, -1] },
  { color: 0x44ff44, opacity: 1, position: [3, 1, 0] },
  { color: 0x44ff44, opacity: 1, position: [3, 1, 1] }
];