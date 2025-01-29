'use client'

import { useState, useEffect } from 'react';
import { ChocolateBarScreen } from './chocolate-bar-screen'
import { DenominatorScreen } from './denominator-screen'
import { useGameState } from './state-utils'

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState()
  
  const handleProceed = () => {
    setGameStateRef({ screen: 2 })
  }

  return (
    <div>
      {gameStateRef.current.screen === 1 ? (
        <ChocolateBarScreen onProceed={handleProceed} sendAdminMessage={sendAdminMessage} />
      ) : (
        <DenominatorScreen sendAdminMessage={sendAdminMessage} />
      )}
    </div>
  )
}


// Bugs:
// - "Correct bar" is incorrectly placed
// - AI conversation to be as per latest response in case of back to back responses (it should stop vs go on constantly)
// - Design to change as per subtract fractions design (header + font + colors + chocolate)
// - AI conversation to change as per response
// - [Done] Latex is not implemented in ai conversation (Sahasra)
// - [Done] Scipted message to go to AI (Sahasra)