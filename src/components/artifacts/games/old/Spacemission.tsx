
import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle, Rocket, Droplet } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/custom_ui/alert';
import { Button } from '@/components/custom_ui/button';

const SpaceStationFuelManagement = () => {
  const [tankA, setTankA] = useState<any>(5);
  const [tankB, setTankB] = useState<any>(5);
  const [feedback, setFeedback] = useState<any>('');
  const [problem, setProblem] = useState<any>('');
  const [isMore, setIsMore] = useState<any>(false);
  const [difference, setDifference] = useState<any>(2);
  const [isCorrect, setIsCorrect] = useState<any>(null);
  const [isDragging, setIsDragging] = useState<any>(false);
  const [targetB, setTargetB] = useState<any>(0);

  const tankBRef = useRef<any>(null);

  const MAX_UNITS = 10;

  useEffect(() => {
    generateNewProblem();
  }, []);

  const checkAnswer = () => {
    if (tankB === targetB) {
      setFeedback('Correct! Your space station is ready for the next mission!');
      setIsCorrect(true);
      setTimeout(() => {
        generateNewProblem();
      }, 2000);
    } else {
      setFeedback(`Not quite, astronaut! Check your calculations. Tank B should have ${targetB} units to be ${difference} unit${difference > 1 ? 's' : ''} ${isMore ? 'more' : 'less'} than Tank A.`);
      setIsCorrect(false);
    }
  };

  const generateNewProblem = () => {
    const newTankA = Math.floor(Math.random() * 6) + 3;
    const newDifference = Math.floor(Math.random() * 2) + 1;
    const newIsMore = Math.random() < 0.5;
    
    setTankA(newTankA);
    setDifference(newDifference);
    setIsMore(newIsMore);
    
    const newTargetB = newIsMore ? 
      Math.min(newTankA + newDifference, MAX_UNITS) : 
      Math.max(newTankA - newDifference, 0);
    
    setTargetB(newTargetB);
    setTankB(5);
    setIsCorrect(null);
    setFeedback('');

    setProblem(`Adjust Fuel Tank B to have ${newDifference} unit${newDifference > 1 ? 's' : ''} ${newIsMore ? 'more' : 'less'} than Fuel Tank A (${newTankA} units).`);
  };

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging && tankBRef.current) {
      const rect = tankBRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;
      let newLevel = Math.round(MAX_UNITS * (1 - y / height));
      newLevel = Math.max(0, Math.min(newLevel, MAX_UNITS));
      setTankB(newLevel);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  const renderTank = (units: any, label: any, color: any, ref: any = null) => (
    <div className="text-center relative">
      <div 
        className={`w-24 h-80 bg-white rounded-lg relative overflow-hidden border-4 border-black ${ref ? 'cursor-ns-resize' : ''}`}
        ref={ref}
        onMouseDown={ref ? handleMouseDown : undefined}
        id="tank"
      >
        {[...Array(MAX_UNITS + 1)].map((_, index) => (
          <div 
            key={`grid-${index}`}
            className="absolute w-full h-8 border-t border-gray-300" 
            style={{ bottom: `${(index / MAX_UNITS) * 100}%` }}
          />
        ))}
        
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-all duration-200 ${color}`}
          style={{ height: `${(units / MAX_UNITS) * 100}%` }}
        />
        
        {[...Array(MAX_UNITS + 1)].map((_, index) => (
          <React.Fragment key={`measure-${index}`}>
            <div 
              className="absolute left-0 w-4 h-1 bg-black z-10" 
              style={{ bottom: `${(index / MAX_UNITS) * 100}%`, transform: 'translateY(50%)' }}
            />
            <div 
              className="absolute right-0 text-xs text-black font-bold z-10" 
              style={{ bottom: `${(index / MAX_UNITS) * 100}%`, transform: 'translateY(50%)' }}
            >
              {index}
            </div>
          </React.Fragment>
        ))}
        
        {!ref ? (
          <Droplet className="absolute top-2 left-1/2 transform -translate-x-1/2 text-blue-700 z-20" size={24} />
        ) : (
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 cursor-ns-resize transition-all duration-100 z-20"
            style={{ 
              top: `${((MAX_UNITS - tankB) / MAX_UNITS) * 100}%`,
            }}
          >
            <div className="relative">
              <Droplet 
                className={`text-blue-700 ${isDragging ? 'scale-125' : ''} transition-transform`} 
                size={32}
                fill={isDragging ? "currentColor" : "none"}
              />
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-black font-bold">{label}: {units} unit{units !== 1 ? 's' : ''}</p>
      {ref && (
        <p className="mt-1 text-sm text-blue-700 font-semibold">
          Drag to fill
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white text-black rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Rocket className="mr-2 text-blue-700" size={32} />
        <h1 className="text-3xl font-bold text-black">Space Station Fuel Management</h1>
      </div>
      
      <Alert className="mb-6 bg-blue-100 border-blue-300 text-blue-900">
        <AlertCircle className="h-4 w-4 text-blue-700" />
        <AlertTitle className="text-blue-900 text-lg font-bold">Mission Objective:</AlertTitle>
        <AlertDescription className="text-lg">{problem}</AlertDescription>
      </Alert>

      <div className="mb-6 flex justify-around bg-gray-100 p-8 rounded-lg">
        {renderTank(tankA, 'Fuel Tank A', 'bg-blue-600/50')}
        {renderTank(tankB, 'Fuel Tank B', isCorrect === false ? 'bg-red-500/50' : 'bg-green-600/50', tankBRef)}
      </div>

      <div className="flex justify-center mb-6">
        <Button 
          onClick={checkAnswer} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg shadow-md transform transition duration-200 hover:scale-105"
          id="check-answer"
        >
          Check Answer
        </Button>
      </div>

      {feedback && (
        <Alert variant={isCorrect ? 'default' : 'destructive'} className={`${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
          {isCorrect ? <CheckCircle className="h-4 w-4 text-green-700" /> : <AlertCircle className="h-4 w-4 text-red-700" />}
          <AlertTitle>{isCorrect ? 'Mission Successful!' : 'Recalculation Needed'}</AlertTitle>
          <AlertDescription>{feedback}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SpaceStationFuelManagement;
