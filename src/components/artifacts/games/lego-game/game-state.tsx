
export const desc = `
`;

export interface Fraction {
    numerator: number;
    denominator: number;
}

export interface GameState1 {
    step: number;
    fraction: Fraction;
    piecesAtYOne: number;
}

export interface GameState {
    screen: 'first' | 'second';
    state1: GameState1;
}

export const initialGameState: GameState = {
    screen: 'first',
    state1: {
        step: 0,
        fraction: {
            numerator: 7,
            denominator: 4,
        },
        piecesAtYOne: 0,
    }
};