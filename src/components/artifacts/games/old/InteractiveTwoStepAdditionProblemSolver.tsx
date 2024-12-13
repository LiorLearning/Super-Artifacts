
import React, { useState } from 'react';
import { Button } from '@/components/custom_ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/custom_ui/card';
import { Input } from '@/components/custom_ui/input';
import { Trophy } from 'lucide-react';

const problems: any = [
  {
    text: "Tom has 23 stickers. He gets 12 more, then finds 8 more. How many now?",
    numbers: [23, 12, 8],
    finalAmount: 43
  },
  {
    text: "Sara has 35 marbles. She wins 17, then finds 9 more. How many now?",
    numbers: [35, 17, 9],
    finalAmount: 61
  },
  {
    text: "Max has 42 coins. He earns 15 more, then gets 7 as a gift. How many now?",
    numbers: [42, 15, 7],
    finalAmount: 64
  },
  {
    text: "Lily has 18 flowers. She picks 13 more, then buys 6. How many now?",
    numbers: [18, 13, 6],
    finalAmount: 37
  },
  {
    text: "Alex has 50 cards. He trades for 25 more, then finds 10. How many now?",
    numbers: [50, 25, 10],
    finalAmount: 85
  },
  {
    text: "Emma has 30 crayons. She gets 14 new ones, then borrows 8. How many now?",
    numbers: [30, 14, 8],
    finalAmount: 52
  },
  {
    text: "Jack has 45 stamps. He buys 20 more, then receives 5 as a gift. How many now?",
    numbers: [45, 20, 5],
    finalAmount: 70
  },
  {
    text: "Zoe has 28 stickers. She earns 16 more, then finds 9 in her desk. How many now?",
    numbers: [28, 16, 9],
    finalAmount: 53
  },
  {
    text: "Ryan has 39 toy cars. He gets 11 for his birthday, then buys 7. How many now?",
    numbers: [39, 11, 7],
    finalAmount: 57
  },
  {
    text: "Mia has 22 pencils. She finds 18 more, then gets 5 from a friend. How many now?",
    numbers: [22, 18, 5],
    finalAmount: 45
  }
];

const TwoStepAdditionSolver = () => {
  const [problemIndex, setProblemIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<any>({
    step1First: '',
    step1Second: '',
    step1Result: '',
    step2First: '',
    step2Second: '',
    step2Result: ''
  });
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const problem: any = problems[problemIndex];

  const handleInputChange = (e: any, key: string) => {
    setUserInputs({ ...userInputs, [key]: e.target.value });
  };

  const checkStep1 = () => {
    const first = parseInt(userInputs.step1First);
    const second = parseInt(userInputs.step1Second);
    const result = parseInt(userInputs.step1Result);
    
    if (isNaN(first) || isNaN(second) || isNaN(result)) {
      setFeedback("Oops! Make sure to fill in all the boxes.");
      return;
    }

    if (first + second === result && problem.numbers.includes(first) && problem.numbers.includes(second)) {
      setFeedback("Great job! You got it right!");
      setStep(1);
      setScore(prevScore => prevScore + 0.5);
    } else if (first + second === result) {
      setFeedback("Close! But check the numbers in the problem.");
    } else {
      setFeedback("Not quite. Try adding the numbers again.");
    }
  };

  const checkStep2 = () => {
    const first = parseInt(userInputs.step2First);
    const second = parseInt(userInputs.step2Second);
    const result = parseInt(userInputs.step2Result);

    if (isNaN(first) || isNaN(second) || isNaN(result)) {
      setFeedback("Oops! Make sure to fill in all the boxes.");
      return;
    }

    if (first + second === result && result === problem.finalAmount) {
      setFeedback("Wow! You solved the whole problem!");
      setStep(2);
      setScore(prevScore => prevScore + 0.5);
    } else if (first + second === result) {
      setFeedback("So close! Check if you used all the numbers.");
    } else {
      setFeedback("Not quite. Try adding the numbers again.");
    }
  };

  const nextProblem = () => {
    setProblemIndex((prevIndex) => (prevIndex + 1) % problems.length);
    setStep(0);
    setUserInputs({
      step1First: '',
      step1Second: '',
      step1Result: '',
      step2First: '',
      step2Second: '',
      step2Result: ''
    });
    setFeedback('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-purple-100 to-indigo-100">
      <CardHeader className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Math Adventure!</CardTitle>
        <div className="flex justify-center items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold">{score.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-4 text-lg font-semibold text-center bg-white rounded-lg p-4 shadow-md">{problem.text}</p>

        <div className="space-y-6">
          <div className="bg-lavender-100 p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2 text-center">Step 1: Add any two numbers</h3>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Input
                type="number"
                value={userInputs.step1First}
                onChange={(e) => handleInputChange(e, 'step1First')}
                className="w-16 text-center bg-white"
                placeholder="?"
                id="step1First"
              />
              <span className="text-2xl font-bold">+</span>
              <Input
                type="number"
                value={userInputs.step1Second}
                onChange={(e) => handleInputChange(e, 'step1Second')}
                className="w-16 text-center bg-white"
                placeholder="?"
                id="step1Second"
              />
              <span className="text-2xl font-bold">=</span>
              <Input
                type="number"
                value={userInputs.step1Result}
                onChange={(e) => handleInputChange(e, 'step1Result')}
                className="w-16 text-center bg-white"
                placeholder="?"
                id="step1Result"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button onClick={checkStep1} disabled={step > 0} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded" id="checkStep1">
                Check Step 1
              </Button>
            </div>
          </div>

          {step >= 1 && (
            <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
              <h3 className="font-bold mb-2 text-center">Step 2: Add the last number</h3>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Input
                  type="number"
                  value={userInputs.step2First}
                  onChange={(e) => handleInputChange(e, 'step2First')}
                  className="w-16 text-center bg-white"
                  placeholder="?"
                  id="step2First"
                />
                <span className="text-2xl font-bold">+</span>
                <Input
                  type="number"
                  value={userInputs.step2Second}
                  onChange={(e) => handleInputChange(e, 'step2Second')}
                  className="w-16 text-center bg-white"
                  placeholder="?"
                  id="step2Second"
                />
                <span className="text-2xl font-bold">=</span>
                <Input
                  type="number"
                  value={userInputs.step2Result}
                  onChange={(e) => handleInputChange(e, 'step2Result')}
                  className="w-16 text-center bg-white"
                  placeholder="?"
                  id="step2Result"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <Button onClick={checkStep2} disabled={step > 1} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded" id="checkStep2">
                  Check Final Answer
                </Button>
              </div>
            </div>
          )}
        </div>

        {feedback && (
          <div className={`mt-4 p-2 rounded flex items-center justify-center ${feedback.includes('Great') || feedback.includes('Wow') ? 'bg-purple-200' : 'bg-indigo-200'}`}>
            <p className="text-lg font-bold">{feedback}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          onClick={nextProblem} 
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded" 
          disabled={step < 2}
          id="nextProblem"
        >
          Next Problem
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TwoStepAdditionSolver;
