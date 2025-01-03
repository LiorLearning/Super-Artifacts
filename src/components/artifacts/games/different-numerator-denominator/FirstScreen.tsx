import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface FirstScreenProps {
  onNext: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

export default function FirstScreen({ onNext, sendAdminMessage }: FirstScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Common Denominator Exercise</h1>
      <Button
        onClick={onNext}
        className="bg-[#FF497C] text-white px-8 py-4 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
      >
        Start Exercise
      </Button>
    </div>
  )
}

