import { useState } from "react"
import { X, Plus } from 'lucide-react'
import { Button } from "@/components/custom_ui/button"
import { Input } from "@/components/custom_ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Group {
  id: number
  items: number
}

const MAX_GROUPS = 5;
const MIN_GROUPS = 1;
const MAX_ITEMS_PER_GROUP = 4;
const MIN_ITEMS_PER_GROUP = 2;

interface SharkGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function SharkGame({ sendAdminMessage }: SharkGameProps) {
  const [groups, setGroups] = useState<Group[]>([{ id: 1, items: 2 }])
  const [target, setTarget] = useState({ groups: MAX_GROUPS, itemsPerGroup: MAX_ITEMS_PER_GROUP })
  const [message, setMessage] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [hintMessage, setHintMessage] = useState<string | null>(null)
  const [additionAnswer, setAdditionAnswer] = useState("")
  const [multiplicationAnswer, setMultiplicationAnswer] = useState("")
  const [additionCorrect, setAdditionCorrect] = useState(false)

  const addGroup = () => {
    if (groups.length < target.groups) {
      setGroups([...groups, { id: groups.length + 1, items: 0 }])
    }
  }

  const removeGroup = (id: number) => {
    setGroups(groups.filter(group => group.id !== id))
  }

  const addItem = (groupId: number) => {
    setGroups(
      groups.map(group =>
        group.id === groupId && group.items < target.itemsPerGroup
          ? { ...group, items: group.items + 1 }
          : group
      )
    )
  }

  const removeItem = (groupId: number) => {
    setGroups(
      groups.map(group =>
        group.id === groupId && group.items > 0
          ? { ...group, items: group.items - 1 }
          : group
      )
    )
  }

  const checkAdditionAnswer = () => {
    setShowHint(true);
    const correctAdditionAnswer = groups.map(group => group.items).join('+');
    const expectedAnswer = Array(target.groups).fill(target.itemsPerGroup).join('+');

    if (additionAnswer.replace(/\s+/g, '') !== expectedAnswer.toString()) {
      setHintMessage("Incorrect addition. Try again!");
      sendAdminMessage(
        'admin', 
        `Incorrect addition answer (${additionAnswer}). User has ${groups.length} groups with the following items: ${groups.map(group => group.items).join(', ')}. Describe user's current game state and diagnose socratically and help user solve the game.`
      );
    } else if (additionAnswer.replace(/\s+/g, '') !== correctAdditionAnswer) {
      setHintMessage(`You have the right total, but the addition format is incorrect. Try again!`);
      sendAdminMessage(
        'admin', 
        `User has the correct total (${expectedAnswer}) but the addition format is incorrect. User has ${groups.length} groups with the following items: ${groups.map(group => group.items).join(', ')}. Diagnose socratically and help user solve the game.`
      );
    } else {
      setAdditionCorrect(true);
      setHintMessage(`Correct! Now, how would you display that as multiplication?`);
      sendAdminMessage(
        'admin', 
        `Correct Addition Answer! User has correctly displayed the addition as ${correctAdditionAnswer}. Now ask for the multiplication representation.`
      );
    }
  }

  const checkMultiplicationAnswer = () => {
    const correctMultiplicationAnswer1 = `${target.groups}x${target.itemsPerGroup}`;
    const correctMultiplicationAnswer2 = `${target.itemsPerGroup}x${target.groups}`;
    const userAnswer = multiplicationAnswer.replace(/\s+/g, '');

    if (userAnswer === correctMultiplicationAnswer1 || userAnswer === correctMultiplicationAnswer2) {
      setHintMessage(`Correct! You have ${target.groups} groups of ${target.itemsPerGroup} sharks, which is ${target.groups * target.itemsPerGroup} in total.`);
      sendAdminMessage(
        'admin', 
        `Correct Multiplication Answer! User has ${target.groups} groups of ${target.itemsPerGroup} sharks (${target.groups * target.itemsPerGroup} in total). Congratulate user and say now you are ready for more word problems.`
      );
      setTimeout(() => {
        setGroups([{ id: 1, items: 2 }]);
        setHintMessage("");
        setAdditionAnswer("");
        setMultiplicationAnswer("");
        setAdditionCorrect(false);
        // Generate new random multiplication problem
        setTarget({
          groups: Math.floor(Math.random() * (MAX_GROUPS - MIN_GROUPS + 1)) + MIN_GROUPS, // 1-5 groups
          itemsPerGroup: Math.floor(Math.random() * (MAX_ITEMS_PER_GROUP - MIN_ITEMS_PER_GROUP + 1)) + MIN_ITEMS_PER_GROUP, // 2-4 items
        });
      }, 2000);
    } else {
      setHintMessage("Incorrect multiplication. Try again!");
      sendAdminMessage(
        'admin', 
        `Incorrect multiplication answer. User has ${groups.length} groups with the following items: ${groups.map(group => group.items).join(', ')}. Diagnose socratically and help user solve the game.`
      );
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl text-gray-200 font-bold text-primary">Sharks Game: Let&apos;s Multiply!</h1>
      </div>

      <Card className="bg-sky-50">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Make {target.groups} groups of {target.itemsPerGroup} sharks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <div
                key={group.id}
                className="relative p-4 border-2 border-primary rounded-lg bg-background"
              >
                <Button
                  id={`remove-group-${group.id}`}
                  onClick={() => removeGroup(group.id)}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-muted-foreground p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
                <h3 className="text-center font-semibold mb-4">Group {group.id}</h3>
                <div className="grid grid-cols-4 gap-2 my-2 min-h-[100px] justify-center items-center">
                  {Array.from({ length: group.items }).map((_, i) => (
                    <span key={i} className="text-4xl text-center">
                      🦈
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    id={`remove-item-${group.id}`}
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(group.id)}
                    disabled={group.items === 0}
                  >
                    -
                  </Button>
                  <Button
                    id={`add-item-${group.id}`}
                    variant="outline"
                    size="sm"
                    onClick={() => addItem(group.id)}
                    disabled={group.items === target.itemsPerGroup}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
            {groups.length < target.groups && (
              <Button
                id="add-new-group"
                variant="outline"
                className="h-[200px] border-dashed"
                onClick={addGroup}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Group
              </Button>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="addition-answer" className="block font-medium mb-2">
                  How would you display this as addition?
                </label>
                <Input
                  id="addition-answer"
                  type="text"
                  value={additionAnswer}
                  onChange={(e) => {
                    setAdditionAnswer(e.target.value);
                    setShowHint(false);
                  }}
                  disabled={additionCorrect}
                  placeholder="e.g., 3 + 3 + 3"
                />
              </div>
              {additionCorrect && (
                <div>
                  <label htmlFor="multiplication-answer" className="block font-medium mb-2">
                    How would you display that as multiplication?
                  </label>
                  <Input
                    id="multiplication-answer"
                    type="text"
                    value={multiplicationAnswer}
                    onChange={(e) => {
                      setMultiplicationAnswer(e.target.value);
                      setShowHint(false);
                    }}
                    placeholder="e.g., 3 x 3"
                  />
                </div>
              )}
            </div>
            <Button 
              id="check-answer" 
              onClick={additionCorrect ? checkMultiplicationAnswer : checkAdditionAnswer} 
              size="lg"
            >
              {additionCorrect ? "Check Multiplication Answer" : "Check Addition Answer"}
            </Button>
            {message && (
              <p className={`text-lg font-semibold ${message.includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            {showHint && (
              <p className="text-muted-foreground text-sm mt-4">
                {hintMessage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="hidden">Message for AI: Make {target.groups} groups of {target.itemsPerGroup} sharks. Add or remove groups and items to match the target.</p>
    </div>
  )
}