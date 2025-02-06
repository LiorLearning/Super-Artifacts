
import { ReactNode } from "react"

export function BlueBox({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={`bg-[#26B8FF] py-2 px-4 border-[1px] border-black text-white shadow-[-3px_3px_0px_rgba(0,0,0,1)] ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function DoubleBlueBox({ first, second, className , widthratio = 50}: { first: ReactNode; second: ReactNode; className?: string; widthratio?: number }) {
  return (
    <div className={`flex gap-2 bg-[#0C88C4] text-[#0C88C4] p-2 rounded-lg ${className}`} >
      <div className="bg-white rounded-lg"
        style={{ width: `${widthratio}%` }}
      >
        {first}
      </div>
      <div className="bg-white rounded-lg"
        style={{ width: `${100 - widthratio}%` }}
      >
        {second}
      </div>
    </div>
  )
}

export function DoubleBlueBox2({ first, second, className , widthratio = 50}: { first: ReactNode; second: ReactNode; className?: string; widthratio?: number }) {
  return (
    <div className={`flex gap-2 bg-[#0C88C4] text-[#0C88C4] p-2 rounded-lg ${className}`} >
      <div className="bg-white rounded-lg"
        style={{ width: `${widthratio}%` }}
      >
        {first}
      </div>
      <div 
        style={{ width: `${100 - widthratio}%` }}
      >
        {second}
      </div>
    </div>
  )
}

export function BlueText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-[#00527B] text-2xl font-bold ${className}`}>
      {children}
    </div> 
  )
}