"use client"

import { useState } from "react"
import { Drill, Hammer } from "lucide-react"

import { Button } from "@/components/custom_ui/button"

interface Box {
  id: string
  color: string
  fraction: { numerator: number; denominator: number }
  children: Box[]
  orientation: "horizontal" | "vertical"
}

interface HammerFractionsProps {
  changeGame: (gameKey: string) => void;
  sendAdminMessage: (role: string, content: string) => void;
}

export default function HammerFractions({ changeGame, sendAdminMessage }: HammerFractionsProps) {
  const [selectedTool, setSelectedTool] = useState<"hammer2" | "hammer3" | "hammer5" | "glue" | "fill" | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("#4A2C2A")
  const [boxes, setBoxes] = useState<Box>({
    id: "1",
    color: "#4A2C2A",
    fraction: { numerator: 1, denominator: 1 },
    children: [],
    orientation: "vertical",
  })
  const [hoverBoxes, setHoverBoxes] = useState<string[]>([])

  const colors = [
    "#4A2C2A", // Dark Chocolate
    "#654321", // Chocolate Brown
    "#7B3F00", // Chestnut
    "#8B4513", // Saddle Brown
    "#A0522D", // Sienna
    "#D2691E", // Chocolate
    "#CD853F", // Peru
    "#F4A460", // Sandy Brown
    "#FFE4C4", // Bisque
    "#FFFFFF", // White
  ]

  const handleBoxClick = (boxId: string) => {
    if (!selectedTool) return

    if (selectedTool.startsWith("hammer")) {
      const numPieces = parseInt(selectedTool.replace("hammer", ""), 10)
      setBoxes((prevBoxes) => {
        // Deep copy of the boxes tree
        const newBoxes = JSON.parse(JSON.stringify(prevBoxes)) as Box
        const boxToBreak = findBoxById(newBoxes, boxId)
        if (boxToBreak && boxToBreak.children.length === 0) {
          // Break the box into numPieces
          const newChildren: Box[] = []
          for (let i = 0; i < numPieces; i++) {
            newChildren.push({
              id: `${boxToBreak.id}-${i + 1}`,
              color: boxToBreak.color,
              fraction: {
                numerator: boxToBreak.fraction.numerator,
                denominator: boxToBreak.fraction.denominator * numPieces,
              },
              children: [],
              // Alternate orientation for nested boxes
              orientation: boxToBreak.orientation === "horizontal" ? "vertical" : "horizontal",
            })
          }
          boxToBreak.children = newChildren
          sendAdminMessage("admin", `Box ${boxId} broken into ${numPieces} pieces`)
        }
        return newBoxes
      })
    } else if (selectedTool === "fill") {
      // Fill the box with the selected color
      setBoxes((prevBoxes) => {
        const newBoxes = JSON.parse(JSON.stringify(prevBoxes)) as Box
        const boxToFill = findBoxById(newBoxes, boxId)
        if (boxToFill) {
          boxToFill.color = selectedColor
        }
        return newBoxes
      })
    }
  }

  const handleGlue = (boxId: string) => {
    setBoxes((prevBoxes) => {
      const newBoxes = JSON.parse(JSON.stringify(prevBoxes)) as Box
      const parentBox = findParentBox(newBoxes, boxId, null)
      if (parentBox) {
        // Remove the children to glue them into a single box
        parentBox.children = []
        // Optional: Adjust the fraction if needed
      }
      return newBoxes
    })
  }

  const handleBoxHover = (boxId: string) => {
    if (selectedTool === "glue") {
      const parentBox = findParentBox(boxes, boxId, null)
      if (parentBox) {
        const siblingIds = parentBox.children.map((child) => child.id)
        setHoverBoxes(siblingIds)
      } else {
        setHoverBoxes([])
      }
    } else {
      setHoverBoxes([])
    }
  }

  const handleBoxLeave = () => {
    setHoverBoxes([])
  }

  const findBoxById = (box: Box, id: string): Box | null => {
    if (box.id === id) return box
    for (const child of box.children) {
      const found = findBoxById(child, id)
      if (found) return found
    }
    return null
  }

  const findParentBox = (currentBox: Box, targetId: string, parent: Box | null): Box | null => {
    if (currentBox.id === targetId) {
      return parent
    }
    for (const child of currentBox.children) {
      const result = findParentBox(child, targetId, currentBox)
      if (result) return result
    }
    return null
  }

  const renderBox = (box: Box) => {
    if (box.children.length > 0) {
      return (
        <div
          key={box.id}
          className={`flex flex-1 gap-1 ${box.orientation === "horizontal" ? "flex-row" : "flex-col"}`}
        >
          {box.children.map((child) => renderBox(child))}
        </div>
      )
    }

    return (
      <div
        key={box.id}
        className={`relative flex-1 flex items-center justify-center cursor-pointer group
          ${
            hoverBoxes.includes(box.id)
              ? "outline outline-2 outline-yellow-400 z-10"
              : "hover:scale-105 transition-transform"
          }`}
        style={{ backgroundColor: box.color }}
        onClick={() => (selectedTool === "glue" ? handleGlue(box.id) : handleBoxClick(box.id))}
        onMouseEnter={() => handleBoxHover(box.id)}
        onMouseLeave={handleBoxLeave}
      >
        {/* Chocolate styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 shadow-inner pointer-events-none" />
        
        {/* Chocolate pattern */}
        <div className="absolute inset-2 border-2 border-black/10 rounded-sm pointer-events-none" />
        <div className="absolute inset-4 border border-black/5 rounded-sm pointer-events-none" />
        
        {/* Fraction display */}
        <div className="relative px-4 py-2 bg-black/20 rounded backdrop-blur-sm group-hover:bg-black/30 transition-colors">
          <div className="text-white font-mono text-sm font-bold drop-shadow-md">
            {box.fraction.numerator}/{box.fraction.denominator}
          </div>
        </div>
      </div>
    )
  }

  const getCursorStyle = () => {
    switch (selectedTool) {
      case "hammer2":
      case "hammer3":
      case "hammer5":
        return "url('/hammer-cursor.png'), auto"
      case "glue":
        return "url('/glue-cursor.png'), auto"
      case "fill":
        return "url('/fill-cursor.png'), auto"
      default:
        return "default"
    }
  }

  return (
    <div className="flex gap-4 p-4 h-full bg-gradient-to-br from-amber-50 to-orange-100" style={{ cursor: getCursorStyle() }}>
      <div className="flex-1 border-2 border-amber-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-xl">
        <div className="flex h-full gap-1 p-1">{renderBox(boxes)}</div>
      </div>
      
      {/* Tools Panel */}
      <div className="flex flex-col gap-2 bg-white/80 p-3 rounded-lg backdrop-blur-sm border border-amber-200 shadow-lg" style={{ width: '20%' }}>
        {[2, 3, 5].map((num) => (
          <Button
            key={num}
            id={`hammer${num}`}
            variant="secondary"
            className={`w-full justify-start gap-2 bg-amber-100 hover:bg-amber-200 border-amber-300 ${selectedTool === `hammer${num}` ? "border-2 border-black" : ""}`}
            onClick={() => setSelectedTool(`hammer${num}` as any)}
          >
            <Hammer className="h-4 w-4" />
            {num}
          </Button>
        ))}
        <div className="my-2"></div> {/* Add gap between hammers and glue */}
        <Button
          id="glue"
          variant="secondary"
          className={`w-full justify-start gap-2 bg-amber-100 hover:bg-amber-200 border-amber-300 ${selectedTool === "glue" ? "border-2 border-black" : ""}`}
          onClick={() => setSelectedTool("glue")}
        >
          <Drill className="h-4 w-4" />
          Glue
        </Button>
        
        {/* Color Selection */}
        <div className="border rounded-lg p-2 mt-4 bg-white/50">
          <div className="text-sm font-medium mb-2 text-amber-900">Chocolate</div>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                id={`color-${color}`}
                className="w-8 h-8 rounded-full border-2 transition-all relative group"
                style={{
                  backgroundColor: color,
                  borderColor: selectedColor === color ? "white" : "transparent",
                  outline: selectedColor === color ? `2px solid ${color}` : "none",
                }}
                onClick={() => {
                  setSelectedTool("fill")
                  setSelectedColor(color)
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/30 transition-colors" />
              </Button>
            ))}
          </div>
        </div>

        {/* Change Game Button */}
        <Button
          id="change-game"
          variant="secondary"
          className="w-full justify-start gap-2 bg-amber-100 hover:bg-amber-200 border-amber-300 mt-4"
          onClick={() => changeGame("aeryns-magical-crystal-adventure")}
        >
          Change to Aeryn's Magical Crystal Adventure
        </Button>
      </div>
    </div>
  )
}