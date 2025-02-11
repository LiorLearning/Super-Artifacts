interface StepCreateBoxProps {
  step: number,
  numerator: number,
  denominator: number,
  heading?: string
}

export default function StepCreateBox({ step, numerator, denominator, heading }: StepCreateBoxProps) {

  return (
    <div className='flex justify-between items-center gap-4 bg-[#b9550b] shadow-[-3px_3px_0px_0px_rgba(0,0,0)] mx-auto p-2 my-12 text-xl'>
      <div className='bg-white p-4 text-xl leading-none font-normal text-[#b9550b]'>
        STEP {step}
      </div>
      <div className='flex justify-between items-center gap-4 px-4'>
        {!heading ? <><div className='text-white text-xl'>
          CREATE
        </div>
          <div className="flex flex-col items-center bg-white px-2">
            <div className="p-1 px-4 leading-none">
              {numerator}
            </div>
            <div className="border-t-2 border-black p-1 leading-none">
              {denominator}
            </div>
          </div></> :
          <div className="text-white">{heading}</div>}
      </div>
    </div>
  );
}