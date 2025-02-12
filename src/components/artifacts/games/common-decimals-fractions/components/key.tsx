import KeyImage from '../assets/Key.png';
import NumeratorPart from '../assets/ColumnKey.png';
import Dviders from '../assets/KeyDivider.png';


interface KeyProps {
  numerator: number;
  denominator: number;
  columnKey: boolean;
  isActive?: boolean;
  level?: number;
}


export default function Key({ numerator, denominator, columnKey, isActive = false, level }: KeyProps) {
  const numeratorWidth = 100 / denominator;
  return (
    <div className={`flex flex-col items-center animate- ${!isActive ? 'scale-75 opacity-30' : ''}`}>
      {level && <h1 className='text-2xl pb-4'>Level {level}</h1>}
      <div className={`relative`}>
        <img src={KeyImage.src} className='' alt="key" />
        <div className='flex justify-between items-center absolute w-[90%] h-[50%] top-[9px] left-2'>
          {Array.from({ length: numerator }, (_, i) => (
            <img
              key={`numerator-${i}`}
              className='min-h-full'
              style={{ width: `${numeratorWidth}%`, height: '100%' }}
              src={NumeratorPart.src}
              alt="numerator"
            />
          ))}
          {Array.from({ length: denominator - numerator }, (_, i) => (
            <img
              key={`divider-${i}`}
              className='h-[99%]'
              src={Dviders.src}
              alt="divider"
            />
          ))}
        </div>
      </div>
    </div>
  );
}