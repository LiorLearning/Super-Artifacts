import React from 'react'

export default function KnifeSelector({options, selectedKnife, setSelectedKnife}: {options: number[], selectedKnife: number | null, setSelectedKnife: (value: number) => void}) {
  return (
    options.map((pieces) => (
      <button
        key={pieces}
        onClick={() => setSelectedKnife(pieces)}
        className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-red-500 ${
          selectedKnife === pieces ? 'bg-red-500' : 'bg-red-200'
        }`}
      >
        <span className="text-lg">{pieces}</span>
        🔪
      </button>
    ))
  )
}
