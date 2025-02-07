import { useGameState } from '../state-utils';
import { BaseProps } from '../utils/types';
import { ReactNode } from 'react';

interface ChangelogEntry {
  date: string;
  changes: React.ReactNode[];
}

const Code = ({children}: {children: ReactNode}) => {
  return (
    <code className="bg-slate-800 text-white px-2 py-1 rounded-md font-mono text-sm">
      {children}
    </code>
  );
}

const CodeBlock = ({children}: {children: ReactNode}) => {
  return (
    <pre className="bg-slate-800 text-white p-4 rounded-lg font-mono text-sm my-2 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

const changelog: ChangelogEntry[] = [
  {
    date: '2025-02-07',
    changes: [
      <div key="1">
        use <Code>setGameState(newState)</Code> to update the game state, 
        instead of <Code>setGameStateRef(newState)</Code>. No need to write
<CodeBlock>{`setGameStateRef(prev => ({
  ...prev, 
  state1: { 
    ...prev.state1, 
    questions: {
      ...prev.state1.questions, 
      question2: 8
    }
  }
})`}</CodeBlock>
        instead use <CodeBlock>{`setGameState({ state1: {questions: {question2: 8} } })`}</CodeBlock>
      </div>,
      <div key="2">
        added state-limits.tsx to check if the game state is valid, need to create for each game before adding to product
      </div>
    ]
  }
];

const screens = [
  {
    screen: 'second',
    description: 'Different types of Input fields'
  },
  {
    screen: 'third',
    description: 'Types of sendAdminMessage'
  }
] as const;

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  return (
    <div className="mx-auto space-y-4 p-4">      
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-4">Game Screens</h2>
        <ul className="list-disc pl-5 space-y-2 mb-8">
          {screens.map(({screen, description}) => (
            <li key={screen}>
              <span className="font-semibold">{screen}</span> - {description}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        
        {changelog.map((entry, index) => (
          <div key={index} className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">{entry.date}</span>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {entry.changes.map((change, changeIndex) => (
                <li key={changeIndex} className="text-gray-800">
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}