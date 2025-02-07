import { useGameState } from '../state-utils';
import { BaseProps } from '../utils/types';
import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ChangelogEntry {
  date: string;
  changes: React.ReactNode[];
}

const Code = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={vscDarkPlus}
      customStyle={{
        display: 'inline',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.5rem',
        margin: 0,
        background: '#1e1e1e'
      }}
    >
      {children as string}
    </SyntaxHighlighter>
  );
}

const CodeBlock = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <SyntaxHighlighter
      language="typescript" 
      style={vscDarkPlus}
      customStyle={{
        borderRadius: '0.5rem',
        padding: '1rem',
        background: '#1e1e1e'
      }}
    >
      {children as string}
    </SyntaxHighlighter>
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