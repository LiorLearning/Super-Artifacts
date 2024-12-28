'use client'

import { useState } from 'react'
import { ChocolateBarScreen } from './chocolate-bar-screen'
import { DenominatorScreen } from './denominator-screen'

export default function FractionAddition() {
  const [currentScreen, setCurrentScreen] = useState<'chocolate' | 'denominator'>('chocolate')

  const handleProceed = () => {
    setCurrentScreen('denominator')
  }

  return (
    <div className="bg-white p-16 rounded-lg">
      {currentScreen === 'chocolate' ? (
        <ChocolateBarScreen onProceed={handleProceed} />
      ) : (
        <DenominatorScreen />
      )}
    </div>
  )
}

