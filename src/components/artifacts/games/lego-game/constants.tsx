interface PieceConfig {
  color: number;
  position: [number, number, number];
}

export const INITIAL_PIECES_CONFIG: PieceConfig[] = [
  { color: 0x8844ff, position: [3, 1, -2] },
  { color: 0x8844ff, position: [3, 1, -1] },
  { color: 0x8844ff, position: [3, 1, 0] },
  { color: 0x8844ff, position: [3, 1, 1] }
];