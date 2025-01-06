export interface Line {
  text: string;
  color?: string;
}

export const COLORS = {
  pink: '#FF497C',
  blue: '#0099FF',
  purple: '#C800FF',
}

export interface StepText {
  lines: Line[];
}

export const firstScreenFooterTexts = (numerator: number, denominator: number): StepText[] => [
    { lines: [] },
    { 
      lines: [
        { text: `We need ${numerator} of these 1/${denominator}th blocks` }, 
        { text: `to make ${numerator}/${denominator}!`}
      ]
    },
    { 
      lines: [
        { text: `Mark the correct answer`},
        { text: `Which number in ${numerator}/${denominator} indicates size of each division?`}
      ]
    },
    { 
      lines: [
        { text: `Copy this block ${numerator} times by dragging`},
        { text: `& dropping it on the sides`}
      ]
    },
    { 
      lines: [
        { text: `Let us now make`},
        { text: `${numerator} more of these ${denominator} blocks`},
        { text: `by dragging & dropping`}
      ]
    },
    { 
      lines: [
        { text: `Let us now make`},
        { text: `${numerator} more of these ${denominator} blocks!`},
      ]
    },
    { 
      lines: [
        { text: `WELL DONE!`},
        { text: `We now have ${numerator} blocks of size 1/${denominator}`}
      ]
    },
    { lines: [] },
    { lines: [] },
    { 
      lines: [
        { text: `CONGRATS!`, color: 'red' },
        { text: `${denominator} legos filled, ${numerator - denominator} to go` }
      ]
    },
    { 
      lines: [
        { text: `Fill the rest of the blocks in the`},
        { text: `new holder`}
      ]
    },
    { 
      lines: [
        { text: `We have divided ${numerator} legos in the groups of ${denominator}` }
      ]
    },
    { lines: [] },
    { lines: [] },
    { 
      lines: [
        { text: `Correct Answer:`, color: 'green' },
        { text: `PROCEED` }
      ]
    },
    { lines: [] },
];