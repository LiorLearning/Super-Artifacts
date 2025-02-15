import KeyImage from '../assets/Key.png';
import NumeratorPart from '../assets/ColumnKey.png';
import Dviders from '../assets/KeyDivider.png';

interface KeyProps {
  n: number;  //numerator
  //denominator which can be between {2, 4, 5, 10}
  a: number;  //row
  b: number;  //column 
  isActive: boolean;
}

export default function ({ n, a, b, isActive }: KeyProps) {

  const imageClass = !isActive ? 'grayscale' : '';

  return (
    <div className={`flex flex-col items-center ${!isActive ? 'scale-[0.75] opacity-50' : 'scale-[1.1]'}`}>
      <div className={`relative`}>
        <img className={`${imageClass}`} src={KeyImage.src} alt="key" />
        <div className='flex flex-wrap content-start absolute w-[88%] h-[49%] top-[7px] left-[6px] z-10'>
          {Array.from({ length: a * b }, (_, i) => (
            i < n && (
              <img
                key={`numerator-${i}`}
                style={{ width: `${100 / b}%`, height: `${100 / a}%` }}
                className={imageClass}
                src={NumeratorPart.src}
                alt="numerator"
              />
            )
          ))}
        </div>
        <div className='flex justify-between items-center absolute w-[88%] h-[49%] top-[7px] left-[6px]'>
          {Array.from({ length: b + 1 }, (_, i) => (
            <img
              key={`divider-${i}`}
              className={`h-[99%] ${imageClass}`}
              src={Dviders.src}
              alt="divider"
            />
          ))}
        </div>
        {a != 1 && <div className='flex justify-between items-center absolute w-[88%] h-[50%] top-[7px] left-[6px] rotate-90'>
          {Array.from({ length: a + 1 }, (_, i) => (
            <img
              key={`divider-${i}`}
              className={`h-[99%] ${imageClass}`}
              src={Dviders.src}
              alt="divider"
            />
          ))}
        </div>}
      </div>
    </div>
  );
}