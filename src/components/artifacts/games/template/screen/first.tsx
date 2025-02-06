import { useGameState } from '../state-utils';
import { BaseProps } from '../utils/types';
import { ReactNode } from 'react';

interface ChangelogEntry {
  date: string;
  changes: React.ReactNode[];
}

const Code = ({children, className}: {children: ReactNode, className?: string}) => {
  return <code className={`bg-slate-500 p-1 rounded-lg px-2 leading-loose text-white ${className}`}>{children}</code>
}

const changelog: ChangelogEntry[] = [
  {
    date: '2025-02-07',
    changes: [
      <div key="1">
        use <Code>goToStep(screen, stepNumber)</Code> to navigate between screens, 
        instead of <Code>goToStep(screen, setGameStateRef, stepNumber)</Code>
      </div>,
      <div key="2">
        use <Code>goToScreen(screen)</Code> to navigate between screens, 
        instead of <Code>goToScreen(screen, setGameStateRef)</Code>
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
      <div className="max-w-4xl mx-auto">
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