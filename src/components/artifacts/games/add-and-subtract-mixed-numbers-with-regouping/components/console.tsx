import { Trash } from "lucide-react";
import MixedFraction from "./mixedFraction";
import { useState } from "react";
// import { Pieces } from "./pieces";

export interface ConsoleUnit {
  type: 1 | 2
  number: number[];
}

export function consoletofraction(unit: ConsoleUnit[]) {
  let whole = 0;
  let numerator = 0;
  let denominator = 4;
  
  unit.forEach((u) => {
    if (u.type === 1) {
      whole += u.number.length;
    } else {
      numerator += u.number.length;
    }
  });
  
  return { whole, numerator, denominator };
}

export function fractiontoconsole(fraction: { whole: number; numerator: number; denominator: number; }) {
    const value: ConsoleUnit[] = [];
    
    // Add whole number units (type 1)
    for (let i = 0; i < fraction.whole; i++) {
      value.push({ type: 1, number: [1] });
    }

    // Add fractional unit (type 2) if there's a numerator
    if (fraction.numerator > 0) {
      const segments = Array.from({ length: fraction.numerator }, (_, i) => i);
      value.push({ type: 2, number: segments });
    }

    return value;
}

export const Pieces = ({type, number = [1,2,3,4], index, selected, selectedSegments, onSelect}:{
  type: 1 | 2,
  number: number[],
  index: number,
  selected: boolean,
  selectedSegments?: number[],
  onSelect: (index: number, segment?: number) => void
}) => {
  if (type === 1) return (
    <div 
      className={`w-16 h-16 rounded-full border-black cursor-pointer border-2 ${selected ? 'bg-[#ffd92f]' : 'bg-[#FFF52F]'}`}
      onClick={() => onSelect(index)}
    />
  )

  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="2"/>
        {number.map((n) => (
          <path
            key={n}
            d={`M 50 50 L ${50 + 48 * Math.cos(n * Math.PI / 2)} ${50 + 48 * Math.sin(n * Math.PI / 2)} A 48 48 0 0 0 ${50 + 48 * Math.cos((n - 1) * Math.PI / 2)} ${50 + 48 * Math.sin((n - 1) * Math.PI / 2)} Z`}
            fill={selectedSegments?.includes(n) ? '#ffd92f' : '#FFF52F'}
            stroke="black"
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => onSelect(index, n)}
          />
        ))}
      </svg>
    </div>
  )
}

export function Console({
  fraction = {whole: 1, numerator: 1, denominator: 2},
  units,
  setUnits,
  variant = 1,
  hidden = false,
  active = true,
}:{
  fraction?: {whole: number, numerator: number, denominator: number},
  units: ConsoleUnit[],
  setUnits: React.Dispatch<React.SetStateAction<ConsoleUnit[]>>
  variant?: number
  hidden?: boolean
  active?: boolean
}){
  const [selected, setSelected] = useState<{index: number, segments?: number[]} | null>(null);

  const handleadd = () => {
    const newUnit = {type: 1 as const, number: [1]};
    setUnits(prevUnits => [...prevUnits, newUnit]);
  }

  const handleSelect = (index: number, segment?: number) => {
    if (units[index].type === 1) {
      setSelected(prev => prev?.index === index ? null : { index });
    } else {
      setSelected(prev => {
        if (segment === undefined) return null;
        
        // If clicking on a different piece, start fresh selection
        if (prev?.index !== index) {
          return { index, segments: [segment] };
        }
        
        // If clicking on the same piece
        const currentSegments = prev.segments || [];
        if (currentSegments.includes(segment)) {
          // Deselect if segment is already selected
          const newSegments = currentSegments.filter(s => s !== segment);
          return newSegments.length === 0 ? null : { index, segments: newSegments };
        } else {
          // Add segment to selection
          return { 
            index, 
            segments: [...currentSegments, segment].sort((a, b) => a - b)
          };
        }
      });
    }
  };

  return(
    <div className="bg-[#E8F5FF] p-3 w-full max-w-screen-md rounded-lg shadow-[-3px_3px_1px_1px_rgba(0,_0,_0,_0.5)]" style={{cursor: active ? "default" : "not-allowed", opacity: active ? 1 : 0.5}}>
      <div className="bg-white flex flex-col p-3 shadow-[inset_-3px_3px_1px_1px_rgba(0,_0,_0,_0.5)] rounded-md">
        
        {variant !== 2 &&
          <div className="flex justify-between w-full items-center">
            <div className={`gap-2 flex items-center bg-[#E3F6FF] px-4 border-2 border-slate-500 shadow-[-2px_2px_0px_rgba(0,_0,_0,_1)] rounded-lg text-2xl`}>
                <span className={`text-[#0E94D3]`}>{hidden ? "?" : fraction.whole}</span>
                <div className="flex flex-col justify-center items-center">
                    <div className={` text-[#0E94D3]`}>{hidden ? "?" : fraction.numerator}</div>
                    <div className={`border-t-[1px] border-black px-2 w-full`}></div>
                    <div className={`text-[#0E94D3]`}>{hidden ? "?" : fraction.denominator}</div>
                </div>
            </div>
            <div className="flex gap-2 items-center">
              <Add 
                onClick={handleadd}
              />
              { variant != 3 && (
                <Delete 
                  selected={selected}
                  setSelected={setSelected}
                  units={units}
                  setUnits={setUnits}
                />
              )}
            </div>
          </div>
        }

        <div className="flex gap-2 mt-4 min-h-40 items-center">
          {units.map((unit, i) => (
            <Pieces 
              key={i} 
              type={unit.type} 
              number={unit.number} 
              index={i}
              selected={selected?.index === i}
              selectedSegments={selected?.segments}
              onSelect={handleSelect}
            />
          ))}
        </ div>

      </div>
      <div className="p-2 flex justify-between w-full rounded-md">
        { variant !== 3 &&
          <div className="flex gap-2 items-center">
            <Merge 
              selected={selected}
              setSelected={setSelected}
              units={units}
              setUnits={setUnits}
              disabled={!selected?.segments || selected.segments.length !== 4}
            />

            <Split 
              selected={selected}
              setSelected={setSelected}
              units={units}
              setUnits={setUnits}
              disabled={!selected || !units[selected.index] || units[selected.index].type !== 1}
            />
          </div>
        }
        { variant === 2 &&
          <div className={`gap-2 flex items-center bg-[#E3F6FF] px-4 border-2 border-slate-500 shadow-[-2px_2px_0px_rgba(0,_0,_0,_1)] rounded-lg text-2xl`}>
            <span className={`text-[#0E94D3]`}>{hidden ? "?" : fraction.whole}</span>
            <div className="flex flex-col justify-center items-center">
                <div className={` text-[#0E94D3]`}>{hidden ? "?" : fraction.numerator}</div>
                <div className={`border-t-[1px] border-black px-2 w-full`}></div>
                <div className={`text-[#0E94D3]`}>{hidden ? "?" : fraction.denominator}</div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

// export function Console2(){
//   const whole = 1;
//   const numerator = 1;
//   const denominator = 2;
//   return(
//     <div className="bg-[#E8F5FF] p-3 w-full max-w-screen-md rounded-lg shadow-lg">
//       <div className="bg-white flex flex-col p-3 shadow-[inset_-3px_3px_1px_1px_rgba(0,_0,_0,_0.5)] rounded-md">

//         <div className="flex gap-2 mt-4 items-center">
//           <Pieces type="whole" number={2}/>
//           <Pieces type="fraction" number={4}/>
//           <Pieces type="fraction" number={2}/>
//         </ div>

//       </div>
//     </div>
//   )
// }

// export function Console3(){
//   const whole = 1;
//   const numerator = 1;
//   const denominator = 2;
//   return(
//     <div className="bg-[#E8F5FF] p-3 w-full max-w-screen-md rounded-lg shadow-lg">
//       <div className="bg-white flex flex-col p-3 shadow-[inset_-3px_3px_1px_1px_rgba(0,_0,_0,_0.5)] rounded-md">
//         <div className="flex justify-between w-full items-center">
//           <div className={`gap-2 flex items-center bg-[#E3F6FF] px-4 border-2 border-slate-500 shadow-[-2px_2px_0px_rgba(0,_0,_0,_1)] rounded-lg text-2xl`}>
//               <span className={`text-[#0E94D3]`}>{whole}</span>
//               <div className="flex flex-col justify-center items-center">
//                   <div className={` text-[#0E94D3]`}>{numerator}</div>
//                   <div className={`border-t-[1px] border-black px-2 w-full`}></div>
//                   <div className={`text-[#0E94D3]`}>{denominator}</div>
//               </div>
//           </div>

//           <div className="flex gap-2 items-center">

//             <button 
//               onClick={handleadd}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Add
//             </button>

//             <Delete />
//           </div>

//         </div>

//         <div className="flex gap-2 mt-4 items-center">
//           <Pieces type="whole" number={2}/>
//           <Pieces type="fraction" number={4}/>
//           <Pieces type="fraction" number={2}/>
//         </ div>

//       </div>
//     </div>
//   )
// }


interface ButtonProps {
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function Add({
  disabled = false,
  active = true,
  onClick = () => {}
}:ButtonProps){
  if (active) return(
    <div 
      className={`border-[1px] shadow-[-3px_3px_rgba(0,_0,_0,_0.5)] border-black scale-75 p-2 rounded-lg origin-center ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={!disabled ? onClick : () => {}}
    >
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24.2359" cy="24.0289" r="23.701" fill="#FFE100" stroke="#857500" stroke-width="0.57764"/>
    <circle cx="40.7903" cy="38.6614" r="8.87624" fill="#B3FF5C"/>
    <path d="M41.8336 33.672V34.2337H41.2719V33.672H41.8336ZM42.3953 34.2337V34.7954H41.8336V34.2337H42.3953ZM42.3953 34.7954V35.3571H41.8336V34.7954H42.3953ZM42.3953 35.3571V35.9188H41.8336V35.3571H42.3953ZM42.3953 35.9188V36.4806H41.8336V35.9188H42.3953ZM42.3953 36.4806V37.0423H41.8336V36.4806H42.3953ZM42.3953 33.672V34.2337H41.8336V33.672H42.3953ZM40.7101 33.672V34.2337H40.1484V33.672H40.7101ZM40.7101 34.2337V34.7954H40.1484V34.2337H40.7101ZM40.7101 34.7954V35.3571H40.1484V34.7954H40.7101ZM40.7101 35.3571V35.9188H40.1484V35.3571H40.7101ZM40.7101 35.9188V36.4806H40.1484V35.9188H40.7101ZM41.2719 36.4806V37.0423H40.7101V36.4806H41.2719ZM41.8336 36.4806V37.0423H41.2719V36.4806H41.8336ZM41.8336 35.9188V36.4806H41.2719V35.9188H41.8336ZM41.8336 35.3571V35.9188H41.2719V35.3571H41.8336ZM41.8336 34.7954V35.3571H41.2719V34.7954H41.8336ZM41.8336 34.2337V34.7954H41.2719V34.2337H41.8336ZM41.2719 33.672V34.2337H40.7101V33.672H41.2719ZM40.7101 36.4806V37.0423H40.1484V36.4806H40.7101ZM41.2719 35.9188V36.4806H40.7101V35.9188H41.2719ZM41.2719 35.3571V35.9188H40.7101V35.3571H41.2719ZM41.2719 34.7954V35.3571H40.7101V34.7954H41.2719ZM41.2719 34.2337V34.7954H40.7101V34.2337H41.2719ZM37.3399 37.0423V37.604H36.7782V37.0423H37.3399ZM37.9016 37.0423V37.604H37.3399V37.0423H37.9016ZM38.4633 37.0423V37.604H37.9016V37.0423H38.4633ZM39.025 37.0423V37.604H38.4633V37.0423H39.025ZM39.5867 37.0423V37.604H39.025V37.0423H39.5867ZM40.1484 37.0423V37.604H39.5867V37.0423H40.1484ZM40.7101 37.0423V37.604H40.1484V37.0423H40.7101ZM41.2719 37.0423V37.604H40.7101V37.0423H41.2719ZM41.8336 37.0423V37.604H41.2719V37.0423H41.8336ZM42.3953 37.0423V37.604H41.8336V37.0423H42.3953ZM42.957 37.0423V37.604H42.3953V37.0423H42.957ZM43.5187 37.0423V37.604H42.957V37.0423H43.5187ZM44.0804 37.0423V37.604H43.5187V37.0423H44.0804ZM44.6421 37.0423V37.604H44.0804V37.0423H44.6421ZM45.2039 37.0423V37.604H44.6421V37.0423H45.2039ZM45.2039 37.604V38.1657H44.6421V37.604H45.2039ZM45.2039 38.1657V38.7274H44.6421V38.1657H45.2039ZM45.2039 38.7274V39.2891H44.6421V38.7274H45.2039ZM45.7656 38.7274V39.2891H45.2039V38.7274H45.7656ZM45.7656 38.1657V38.7274H45.2039V38.1657H45.7656ZM45.7656 37.604V38.1657H45.2039V37.604H45.7656ZM45.7656 39.2891V39.8508H45.2039V39.2891H45.7656ZM45.7656 38.7274V39.2891H45.2039V38.7274H45.7656ZM45.2039 38.7274V39.2891H44.6421V38.7274H45.2039ZM44.6421 38.7274V39.2891H44.0804V38.7274H44.6421ZM44.6421 38.1657V38.7274H44.0804V38.1657H44.6421ZM44.0804 38.1657V38.7274H43.5187V38.1657H44.0804ZM43.5187 38.1657V38.7274H42.957V38.1657H43.5187ZM42.957 38.1657V38.7274H42.3953V38.1657H42.957ZM42.3953 38.1657V38.7274H41.8336V38.1657H42.3953ZM41.8336 38.1657V38.7274H41.2719V38.1657H41.8336ZM41.2719 38.1657V38.7274H40.7101V38.1657H41.2719ZM40.7101 38.1657V38.7274H40.1484V38.1657H40.7101ZM40.7101 37.604V38.1657H40.1484V37.604H40.7101ZM41.2719 37.604V38.1657H40.7101V37.604H41.2719ZM42.3953 37.604V38.1657H41.8336V37.604H42.3953ZM42.957 37.604V38.1657H42.3953V37.604H42.957ZM44.0804 37.604V38.1657H43.5187V37.604H44.0804ZM44.6421 37.604V38.1657H44.0804V37.604H44.6421ZM45.2039 37.604V38.1657H44.6421V37.604H45.2039ZM45.2039 38.1657V38.7274H44.6421V38.1657H45.2039ZM43.5187 37.604V38.1657H42.957V37.604H43.5187ZM41.8336 37.604V38.1657H41.2719V37.604H41.8336ZM40.1484 37.604V38.1657H39.5867V37.604H40.1484ZM39.5867 37.604V38.1657H39.025V37.604H39.5867ZM39.025 37.604V38.1657H38.4633V37.604H39.025ZM39.025 38.1657V38.7274H38.4633V38.1657H39.025ZM38.4633 38.1657V38.7274H37.9016V38.1657H38.4633ZM37.9016 38.1657V38.7274H37.3399V38.1657H37.9016ZM37.3399 38.1657V38.7274H36.7782V38.1657H37.3399ZM37.3399 37.604V38.1657H36.7782V37.604H37.3399ZM37.9016 37.604V38.1657H37.3399V37.604H37.9016ZM38.4633 37.604V38.1657H37.9016V37.604H38.4633ZM37.3399 38.7274V39.2891H36.7782V38.7274H37.3399ZM37.9016 38.7274V39.2891H37.3399V38.7274H37.9016ZM38.4633 38.7274V39.2891H37.9016V38.7274H38.4633ZM39.025 38.7274V39.2891H38.4633V38.7274H39.025ZM39.5867 38.7274V39.2891H39.025V38.7274H39.5867ZM40.1484 38.7274V39.2891H39.5867V38.7274H40.1484ZM40.7101 38.7274V39.2891H40.1484V38.7274H40.7101ZM41.2719 38.7274V39.2891H40.7101V38.7274H41.2719ZM40.1484 38.1657V38.7274H39.5867V38.1657H40.1484ZM39.5867 38.1657V38.7274H39.025V38.1657H39.5867ZM44.0804 38.7274V39.2891H43.5187V38.7274H44.0804ZM43.5187 38.7274V39.2891H42.957V38.7274H43.5187ZM42.3953 39.2891V39.8508H41.8336V39.2891H42.3953ZM41.8336 39.2891V39.8508H41.2719V39.2891H41.8336ZM41.8336 38.7274V39.2891H41.2719V38.7274H41.8336ZM42.3953 38.7274V39.2891H41.8336V38.7274H42.3953ZM42.957 38.7274V39.2891H42.3953V38.7274H42.957ZM42.3953 41.536V42.0977H41.8336V41.536H42.3953ZM42.3953 40.9743V41.536H41.8336V40.9743H42.3953ZM42.3953 40.4125V40.9743H41.8336V40.4125H42.3953ZM42.3953 39.8508V40.4125H41.8336V39.8508H42.3953ZM42.3953 42.0977V42.6594H41.8336V42.0977H42.3953ZM41.8336 42.0977V42.6594H41.2719V42.0977H41.8336ZM41.2719 42.0977V42.6594H40.7101V42.0977H41.2719ZM40.7101 42.0977V42.6594H40.1484V42.0977H40.7101ZM40.7101 41.536V42.0977H40.1484V41.536H40.7101ZM40.7101 40.9743V41.536H40.1484V40.9743H40.7101ZM40.7101 40.4125V40.9743H40.1484V40.4125H40.7101ZM40.7101 39.8508V40.4125H40.1484V39.8508H40.7101ZM40.7101 39.2891V39.8508H40.1484V39.2891H40.7101ZM41.2719 39.2891V39.8508H40.7101V39.2891H41.2719ZM41.2719 39.8508V40.4125H40.7101V39.8508H41.2719ZM41.2719 40.4125V40.9743H40.7101V40.4125H41.2719ZM41.2719 40.9743V41.536H40.7101V40.9743H41.2719ZM41.2719 41.536V42.0977H40.7101V41.536H41.2719ZM41.8336 40.9743V41.536H41.2719V40.9743H41.8336ZM41.8336 40.4125V40.9743H41.2719V40.4125H41.8336ZM41.8336 39.8508V40.4125H41.2719V39.8508H41.8336ZM41.8336 41.536V42.0977H41.2719V41.536H41.8336Z" fill="black"/>
    </svg>
  </div>
  )
}

export function Delete({ 
  disabled = false,
  active = true,
  selected,
  setSelected,
  units,
  setUnits
}: ButtonProps & {
  selected: { index: number; segments?: number[] } | null;
  setSelected: React.Dispatch<React.SetStateAction<{ index: number; segments?: number[] } | null>>
  units: ConsoleUnit[]
  setUnits: React.Dispatch<React.SetStateAction<ConsoleUnit[]>>
} ){
  if (!active) return;

  const handledelete = () => {
    if (selected && units[selected.index]) {
      if (units[selected.index].type === 2 && selected.segments?.length) {
        // Remove the selected segments from the number array
        const newNumber = units[selected.index].number.filter(n => !selected.segments?.includes(n));
        if (newNumber.length === 0) {
          // If no segments left, remove the whole unit
          setUnits(units.filter((_, i) => i !== selected.index));
        } else {
          // Otherwise update the unit with remaining segments
          const newUnits = [...units];
          newUnits[selected.index] = { ...newUnits[selected.index], number: newNumber };
          setUnits(newUnits);
        }
      } else {
        setUnits(units.filter((_, i) => i !== selected.index));
      }
      setSelected(null);
    }
  }
  
  return(
    <div 
      className={`border-[1px] shadow-[-3px_3px_rgba(0,_0,_0,_0.5)] border-black p-1 rounded-lg origin-center ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={!disabled ? handledelete : () => {}}
    >
    <div className="flex items-center p-2 rounded-full gap-4 bg-red-400">
      <Trash className="text-white fill-white" />
      </div>
  </div>
  )
}

export function Merge({
  disabled = false,
  active = true,
  selected,
  setSelected,
  units,
  setUnits
}:ButtonProps & {
  selected: { index: number; segments?: number[] } | null;
  setSelected: React.Dispatch<React.SetStateAction<{ index: number; segments?: number[] } | null>>
  units: ConsoleUnit[]
  setUnits: React.Dispatch<React.SetStateAction<ConsoleUnit[]>>
}){
  if (active) {
    const handleMerge = () => {
      if (selected && units[selected.index] && selected.segments?.length === 4) {
        const newUnits = units.filter((_, i) => i !== selected.index);
        setUnits([...newUnits, {type: 1, number: [1]}]);
        setSelected(null);
      }
    }

    return(
      <div 
        className={`border-[1px] shadow-[-3px_3px_rgba(0,_0,_0,_0.5)] border-black scale-75 p-2 rounded-lg origin-center ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={!disabled ? handleMerge : () => {}}
      >
      <svg width="89" height="60" viewBox="0 0 89 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_0_1)">
        <path d="M88.5138 28.7979C88.5138 44.3984 75.8671 57.0451 60.2667 57.0451C44.6662 57.0451 32.0195 44.3984 32.0195 28.7979C32.0195 13.1975 44.6662 0.550781 60.2667 0.550781C75.8671 0.550781 88.5138 13.1975 88.5138 28.7979Z" fill="#496AFF"/>
        </g>
        <g filter="url(#filter1_d_0_1)">
        <circle cx="31.5323" cy="28.794" r="28.2471" fill="#496AFF"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M45.9014 53.1203C54.2111 48.2028 59.7833 39.1489 59.7833 28.7936C59.7833 18.4382 54.2111 9.38432 45.9014 4.4668C37.5918 9.38432 32.0195 18.4382 32.0195 28.7936C32.0195 39.1489 37.5918 48.2028 45.9014 53.1203Z" fill="#183AD0"/>
        <defs>
        <filter id="filter0_d_0_1" x="29.0848" y="0.550781" width="59.4309" height="59.4289" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
        </filter>
        <filter id="filter1_d_0_1" x="0.350389" y="0.546875" width="59.4309" height="59.4289" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
        </filter>
        </defs>
      </svg>
    </div>
    )
  }
}

export function Split({
  disabled = false,
  active = true,
  selected,
  setSelected,
  units,
  setUnits
}:ButtonProps & {
  selected: { index: number; segments?: number[] } | null;
  setSelected: React.Dispatch<React.SetStateAction<{ index: number; segments?: number[] } | null>>
  units: ConsoleUnit[]
  setUnits: React.Dispatch<React.SetStateAction<ConsoleUnit[]>>
}){
  if (active) {
    const handleSplit = () => {
      if (selected && units[selected.index]) {
        setUnits(units.filter((_, i) => i !== selected.index));
        setUnits(prevUnits => [...prevUnits, {type: 2, number: [0,1,2,3]}]);
        setSelected(null);
      }
    }

    return(
      <div 
        className={`border-[1px] shadow-[-3px_3px_rgba(0,_0,_0,_0.5)] border-black scale-75 p-2 rounded-lg origin-center ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={!disabled ? handleSplit : () => {}}
      >
      <svg width="119" height="111" viewBox="0 0 119 111" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter1_d_1387_111)">
        <path d="M89.2951 52.4091C89.2951 57.9959 87.6384 63.4572 84.5346 68.1024C81.4307 72.7476 77.0191 76.3681 71.8576 78.5061C66.6961 80.644 61.0166 81.2034 55.5372 80.1135C50.0578 79.0236 45.0246 76.3333 41.0742 72.3829C37.1237 68.4324 34.4335 63.3993 33.3435 57.9199C32.2536 52.4404 32.813 46.7609 34.951 41.5994C37.0889 36.4379 40.7094 32.0263 45.3547 28.9225C49.9999 25.8186 55.4612 24.162 61.0479 24.162L61.0479 52.4091L89.2951 52.4091Z" fill="#E449FF"/>
        </g>
        <g filter="url(#filter2_d_1387_111)">
        <path d="M91.8932 49.9518C91.8932 46.2216 91.1585 42.5279 89.731 39.0817C88.3035 35.6354 86.2112 32.5041 83.5736 29.8665C80.9359 27.2288 77.8046 25.1365 74.3584 23.7091C70.9121 22.2816 67.2185 21.5469 63.4883 21.5469V49.9518H91.8932Z" fill="#C929E5"/>
        </g>
        <defs>
        <filter id="filter0_d_1387_111" x="0.150471" y="0" width="118.842" height="110.355" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        {/* <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1387_111" result="shape"/> */}
        </filter>
        <filter id="filter1_d_1387_111" x="29.866" y="24.1621" width="59.4309" height="59.4289" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1387_111" result="shape"/>
        </filter>
        <filter id="filter2_d_1387_111" x="62.1823" y="21.5469" width="29.7122" height="29.7103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1387_111" result="shape"/>
        </filter>
        </defs>
      </svg>
    </div>
    )
  }
}