/**
 ** Game State Management for Fractions Addition, same denominator:

 ** Learning objectives:
 * Why finding a common denominator is important
 * Finding one
 * Creating equivalent fractions to compare

 ** Visuals
 * 2nd screen should have multiple knife choices for student to play with.

 ** Frames
 * Frame 1: establish benefit of common denominator visually
 * Frame 2: abstract process with help
 * Frame 3: abstract process without help
*/

export const desc = `Steps to Play the Game:
`

export interface GameState {
  currentFrame: number;
}

export const initialGameState: GameState = {
  currentFrame: 1,
 };
