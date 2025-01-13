
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/custom_ui/button"
import { Input } from "@/components/custom_ui/input"
import { Card } from "@/components/custom_ui/card"
import { Plus, Minus } from "lucide-react"

export const desc = `Steps to Play the Game:`

const MAX_FISHTANK = 12
const MIN_FISHTANK = 1
const MAX_CRABS = 12
const MIN_CRABS = 1

interface CrabGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const AnimatedFishtank = ({ color = '#4FB8E3', crabs = 4 }) => {
  const [waterLevel, setWaterLevel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel((prev) => (prev + 1) % 100)
    }, 100) // Increased animation speed
    return () => clearInterval(interval)
  }, [])

  const waterPath = `
    M20 62
    Q20 ${62 - waterLevel * 0.5} 75 ${62 - waterLevel * 0.5}
    T130 62
    L130 120
    Q130 130 120 130
    L30 130
    Q20 130 20 120
    Z
  `

  return (
    <div className="relative w-60 h-52">
      <svg
        viewBox="0 0 150 130"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Animated fishtank"
      >
        {/* Glass effect - main fishtank body with rounded right corner */}
        <path
          d="M20 30 Q20 20 30 20 L120 20 Q130 20 130 30 L130 110 Q130 130 110 130 L30 130 Q20 130 20 120 Z"
          fill="rgba(255, 255, 255, 0.2)"
          stroke="#E2E8F0"
          strokeWidth="2"
          className="opacity-50"
        />
        
        {/* Animated water */}
        <motion.path
          d={waterPath}
          fill={color}
          className="opacity-80"
          animate={{
            d: waterPath,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Shine effect */}
        <path
          d="M20 30 L130 30 Q110 70 20 30 Z"
          fill="white"
          className="opacity-20"
        />
      </svg>

      {/* Animated crabs */}
      <div className="absolute top-4 left-4 w-full h-full pointer-events-none">
        {Array.from({ length: crabs }).map((_, index) => (
          <motion.div 
            key={index}
            className="absolute text-2xl"
            style={{
              top: `${Math.floor(index / 3) * 20 + 20}%`,
              left: `${(index % 3) * 25 + 14}%`
            }}
            animate={{
              y: [0, -10, 0], // Increased vertical movement
              rotate: [-10, 10, -10], // Increased rotation
              scale: [1, 1.1, 1], // Added scaling animation
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
            aria-hidden="true"
          >
            🦀
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function CrabGame({ sendAdminMessage }: CrabGameProps) {
  const [step, setStep] = useState(0)
  const [userAnswer, setUserAnswer] = useState<number>(0)
  const [showHint, setShowHint] = useState(false)
  const [hintMessage, setHintMessage] = useState<string | null>(null)
  const [fishtanks, setFishtanks] = useState(1)
  const [crabsPerFishtank, setCrabsPerFishtank] = useState(Array(1).fill(4))

  const problemStatement = "Loren needs to capture 9 crabs per tank to keep the sharks safe. With 3 tanks, how many crabs does he capture in total?"

  const steps = [
    {
      hint: "Let's start by understanding the problem.",
      description: "In this step, we will introduce you to the scenario. Pay attention to the details provided. Once you are ready, proceed to the next step to begin visualizing the problem."
    },
    {
      hint: "Let's visualize the fishtanks with crabs. You can add or remove fishtanks and adjust the number of crabs in each.",
      description: "This step allows you to interact with the fishtanks and crabs. You can add or remove fishtanks and adjust the number of crabs in each fishtank. After you are satisfied with your setup, move to the next step to verify your answer."
    },
    {
      hint: "Count all the crabs or use multiplication if all fishtanks have the same number of crabs.",
      description: "In this step, you will calculate the total number of crabs. You can either count all the crabs manually or use multiplication if each fishtank contains the same number of crabs. Proceed to the next step to check your answer."
    },
  ]

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1)
      setShowHint(false)
    }
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
      setShowHint(false)
    }
  }

  const handleVisualize = () => {
    setStep(1);
    setShowHint(false);
  }

  const addFishtank = () => {
    if (fishtanks < MAX_FISHTANK) {
      setFishtanks(fishtanks + 1)
      setCrabsPerFishtank([...crabsPerFishtank, 0])
    }
  }

  const removeFishtank = () => {
    if (fishtanks > MIN_FISHTANK) {
      setFishtanks(fishtanks - 1)
      setCrabsPerFishtank(crabsPerFishtank.slice(0, -1))
    }
  }

  const addCrab = (index: number) => {
    if (crabsPerFishtank[index] < MAX_CRABS) {
      const newCrabsPerFishtank = [...crabsPerFishtank]
      newCrabsPerFishtank[index]++
      setCrabsPerFishtank(newCrabsPerFishtank)
    }
  }

  const removeCrab = (index: number) => {
    if (crabsPerFishtank[index] > MIN_CRABS) {
      const newCrabsPerFishtank = [...crabsPerFishtank]
      newCrabsPerFishtank[index]--
      setCrabsPerFishtank(newCrabsPerFishtank)
    }
  }

  const checkAnswer = () => {
    setShowHint(true)
    if (new Set(crabsPerFishtank.slice(0, fishtanks)).size !== 1) {
      setHintMessage(
        `Not all fishtanks have the same number of crabs. Try to make them equal for easier calculation.`
      )
      sendAdminMessage(
        'admin', 
        `Not all fishtanks have the same number of crabs. Current state: ${crabsPerFishtank.slice(0, fishtanks).join(', ')}. Advise user to make them equal for easier calculation.`
      );
    } else {
      const totalCrabs = crabsPerFishtank.slice(0, fishtanks).reduce((acc, crabs) => acc + crabs, 0);
      const correctAnswer = fishtanks * crabsPerFishtank[0];
      if (totalCrabs === correctAnswer && userAnswer == correctAnswer) {
        setHintMessage(
          `Correct! You have ${totalCrabs} crabs, which is ${fishtanks} fishtanks multiplied by ${crabsPerFishtank[0]} crabs per fishtank.`
        );
        sendAdminMessage(
          'admin', 
          `Repeat exactly this: Great, let’s practice this concept a bit more before diving into word problems. What do you think?`
          // `Correct Answer! User has ${totalCrabs} crabs (${fishtanks} fishtanks * ${crabsPerFishtank[0]} crabs per fishtank). Reply with: Great, let’s practice this concept a bit more before diving into word problems. What do you think?`
        );
      } else {
        setHintMessage(
          `Incorrect. You have ${totalCrabs} crabs, but you should have ${correctAnswer} crabs.`
        );
        sendAdminMessage(
          'admin', 
          `Incorrect answer. User has ${totalCrabs} crabs but should have ${correctAnswer} crabs. Diagnose socratically and help user solve the game.`
        );
      }
    }
  }

  const checkInitialAnswer = () => {
    setShowHint(true);
    const correctAnswer = 27; // 3 fishtanks * 9 crabs per fishtank
    if (userAnswer === correctAnswer) {
      setHintMessage(`Correct! There are ${correctAnswer} crabs in total.`);
      sendAdminMessage(
        'admin',
        `Repeat exactly this: Great, let’s practice this concept a bit more before diving into word problems. What do you think?`
        // `Correct Answer! User has ${correctAnswer} crabs. Congratulate user and move to the next game to teach how to write the groups as addition and multiplication.`
      );
    } else {
      setHintMessage(`Incorrect. Try again.`);
      sendAdminMessage(
        'admin',
        `Incorrect answer. User has ${userAnswer} crabs but should have ${correctAnswer} crabs. Encourage user to try again.`
      );
    }
  };

  const renderFishtank = (index: number) => (
    <div key={index} className="relative flex flex-col justify-between items-center">
      <AnimatedFishtank crabs={crabsPerFishtank[index]} />
      <div className="flex justify-between w-full mt-2">
        <Button id={`remove-crab-${index}`} onClick={() => removeCrab(index)} variant="ghost" size="sm" className="p-0 h-6 w-6">
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-sm font-semibold">{crabsPerFishtank[index]}</span>
        <Button id={`add-crab-${index}`} onClick={() => addCrab(index)} variant="ghost" size="sm" className="p-0 h-6 w-6">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">{problemStatement}</h2>
        
        <div className="space-y-4">
          <p className="hidden">Message for AI: {steps[step].description}</p>
          {step === 0 && (
            <div className="flex justify-center items-center gap-4">
              <Input
                id="user-answer"
                type="number"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(Number(e.target.value));
                  setHintMessage(null);
                }}
                className="w-20 p-2 border rounded-md text-center"
                placeholder="?"
              />
              <Button
                id="check-initial-answer"
                onClick={checkInitialAnswer}
                variant="outline"
              >
                Check
              </Button>
              <Button
                id="visualize"
                onClick={handleVisualize}
                variant="default"
                className="ml-auto"
              >
                Visualize
              </Button>
            </div>
          )}
          {step >= 1 && (
            <>
            
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <AnimatePresence>
                  {Array(fishtanks).fill(0).map((_, i) => renderFishtank(i))}
                </AnimatePresence>
              </motion.div>
              <div className="flex justify-center gap-4">
                <Button id="remove-fishtank" onClick={removeFishtank} variant="outline" size="sm" disabled={fishtanks <= MIN_FISHTANK}>
                  <Minus className="w-4 h-4 mr-1" /> Fishtank
                </Button>
                <Button id="add-fishtank" onClick={addFishtank} variant="outline" size="sm" disabled={fishtanks >= MAX_FISHTANK}>
                  <Plus className="w-4 h-4 mr-1" /> Fishtank
                </Button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <Input
                id="user-answer"
                type="number"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(Number(e.target.value));
                  setHintMessage(null);
                }}
                className="w-20 p-2 border rounded-md text-center"
                placeholder="?"
              />
              <Button
                id="check-answer"
                onClick={checkAnswer}
                variant="outline"
              >
                Check
              </Button>
            </div>

            <div className="mt-6 flex justify-between">
            <Button
              id="previous-step"
              variant="outline"
              onClick={handlePrev}
              disabled={step === 0}
            >
              Previous
            </Button>
            {step < steps.length - 1 && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  id="next-step"
                  onClick={handleNext}
                >
                  Go to next step
                </Button>
              </motion.div>
            )}
            </div>

            </>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-sm mt-4"
            >
              {hintMessage}
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  )
}