'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Trash2, Star, Lightbulb } from 'lucide-react'
import NumberLine  from "./NumberLine"
import GameContainer from '@/components/GameContainer'

interface Hop {
  direction: 'forward' | 'backward'
  length: number
}

interface NumberLineGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function NumberLineGame({ sendAdminMessage }: NumberLineGameProps) {
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<number | null>(null)
  // const [start, setStart] = useState<number>(0)
  // const [end, setEnd] = useState<number>(20)
  const [step, setStep] = useState<number>(1)
  const [hops, setHops] = useState<Hop[]>([])
  const [selectedStart, setSelectedStart] = useState<number | null>(null)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
  const [correctStreak, setCorrectStreak] = useState<number>(0)
  const [showAbstract, setShowAbstract] = useState<boolean>(false)
  const [numbers, setNumbers] = useState<number[]>([])
  const [score, setScore] = useState<number>(0)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [instructions, setInstructions] = useState<string>('')

  const currentPosition = selectedStart !== null
    ? hops.reduce((acc, hop) => hop.direction === 'forward' ? acc + hop.length : acc - hop.length, selectedStart)
    : null

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const operations = ['+', '-']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const newQuestion = `${num1} ${operation} ${num2} = ?`
    const newAnswer = operation === '+' ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2)
    setQuestion(newQuestion)
    setAnswer(newAnswer)
    
    const newStart = Math.max(0, Math.min(num1, num2, newAnswer) - 2)
    const newEnd = Math.min(20, Math.max(num1, num2, newAnswer) + 2)
    // setStart(newStart)
    // setEnd(newEnd)
    setStep(1)
    setNumbers(Array.from({ length: newEnd - newStart }, (_, i) => newStart + i))

    setHops([])
    setSelectedStart(null)
    setUserAnswer('')
    setFeedback('')
    setShowHint(false)
    setInstructions(getInstructions(operation, num1, num2))
  }

  const getInstructions = (operation: string, num1: number, num2: number): string => {
    if (operation === '+') {
      return `Start at ${num1} on the number line. Then, hop forward ${num2} times. Where do you land?`
    } else {
      return `Start at ${num1} on the number line. Then, hop backward ${num2} times. Where do you land?`
    }
  }

  const handleStartSelect = (num: number) => {
    setSelectedStart(num)
  }

  const handleHop = (direction: 'forward' | 'backward') => {
    setHops([...hops, { direction, length: step }])
  }

  const handleEraseLastHop = () => {
    setHops(hops.slice(0, -1))
  }

  const handleSubmit = () => {
    const userResult = selectedStart !== null ? currentPosition : parseInt(userAnswer)

    if (userResult === answer) {
      setFeedback('Correct! Great job! 🌟')
      setCorrectStreak(correctStreak + 1)
      setScore(score + 10)
      if (correctStreak + 1 >= 3) {
        setShowAbstract(true)
      }
    } else {
      setFeedback(getFeedback(userResult!))
      setCorrectStreak(0)
    }
    setShowHint(true)
  }

  const getFeedback = (userResult: number): string => {
    if (userResult > answer!) {
      return "Oops! We hopped too far. Let's try hopping back a little! 🐸"
    } else if (userResult < answer!) {
      return "Almost there! We need to hop a bit more forward! 🌟"
    } else {
      return "Not quite right. Let's count our hops again! ✨"
    }
  }

  const getHint = (): string => {
    const [num1, operation, num2] = question.split(' ')
    if (operation === '+') {
      return `Start at ${num1} and hop forward ${num2} times! ✨`
    } else {
      return `Start at ${num1} and hop backward ${num2} times! ✨`
    }
  }

  return (
    <GameContainer
      title="Number Line Adventure"
      score={score}
      instructions={instructions}
    >

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {question && <div className="text-3xl font-bold text-blue-600">{question}</div>}
      </div>
      <NumberLine
        numbers={numbers}
        selectedStart={selectedStart}
        currentPosition={currentPosition}
        onNumberSelect={handleStartSelect}
      />
      
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleHop('backward')}
          disabled={!selectedStart}
          className="flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} />
          Hop Back
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleHop('forward')}
          disabled={!selectedStart}
          className="flex items-center gap-2 text-sm"
        >
          Hop Forward
          <ArrowRight size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEraseLastHop}
          disabled={hops.length === 0}
          className="flex items-center gap-2 text-sm"
        >
          <Trash2 size={16} />
          Undo Hop
        </Button>
      </div>

      <div className="mb-6">
        <Label htmlFor="userAnswer" className="text-2xl font-bold text-blue-600 mb-2 block">Your Answer:</Label>
        <Input 
          id="userAnswer" 
          type="number" 
          value={userAnswer} 
          onChange={(e) => setUserAnswer(e.target.value)}
          className="text-2xl p-6 rounded-2xl bg-white shadow-lg"
        />
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full text-2xl p-6 rounded-2xl bg-blue-500 hover:bg-blue-600 shadow-lg mb-6 transition-all duration-300"
      >
        Submit Answer
      </Button>

      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 mb-6 rounded-2xl text-xl font-bold bg-white shadow-lg text-center"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          onClick={generateQuestion} 
          className="text-xl px-8 py-6 rounded-2xl bg-purple-500 hover:bg-purple-600 shadow-lg transition-all duration-300"
        >
          New Question
        </Button>
        
        {showAbstract && (
          <Button 
            onClick={() => setShowAbstract(false)} 
            className="text-xl px-8 py-6 rounded-2xl bg-indigo-500 hover:bg-indigo-600 shadow-lg transition-all duration-300"
          >
            Show Number Line
          </Button>
        )}
        
        {showHint && (
          <Button
            onClick={() => setShowHint(false)}
            className="text-xl px-8 py-6 rounded-2xl bg-orange-400 hover:bg-orange-500 text-white shadow-lg transition-all duration-300 flex items-center"
          >
            <Lightbulb className="mr-2" size={24} />
            {getHint()}
          </Button>
        )}
      </div>
    </GameContainer>
  )
}
