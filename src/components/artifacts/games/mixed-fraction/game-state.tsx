
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

export interface GameState2 {
    step: number;
    fraction: Fraction;
}

export interface GameState3 {
    step: number;
    fraction: Fraction;
}


export interface GameState {
    screen: 'first' | 'second' | 'third';
    state1: GameState1;
    state2: GameState2;
    state3: GameState3;
}

export const initialGameState: GameState = {
    screen: 'second',
    state1: {
        step: 0,
        fraction: {
            numerator: 7,
            denominator: 4,
        },
        piecesAtYOne: 0,
    },
    state2: {
        step: 0,
        fraction: {
            numerator: 8,
            denominator: 3,
        },
    },
    state3: {
        step: 0,
        fraction: {
            numerator: 7,
            denominator: 4,
        },
    },
};