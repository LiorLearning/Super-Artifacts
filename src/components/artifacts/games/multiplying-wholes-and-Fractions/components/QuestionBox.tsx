interface QuestionBoxProps {
  whole: number;
  numerator: number;
  denominator: number;
}

export default function QuestionBox({ whole, numerator, denominator }: QuestionBoxProps) {
  return (
    <div className="flex justify-center items-center my-20 h-[125px] gap-8">
      <div className="px-6 py-7 border-[15px] border-[#b9550b] text-4xl text-[#b9550b]">
        QUESTION
      </div>

      <div className="text-black bg-[#b9550b] text-4xl leading-none flex items-center gap-4 px-6 h-full">
        <div className="p-4 text-center bg-white">
          {whole}
        </div>

        <div className="text-white">
          x
        </div>

        <div className="flex flex-col items-center bg-white px-2">
          <div className="p-2 ">
            {numerator}
          </div>
          <div className="border-t-2 border-black p-2">
            {denominator}
          </div>
        </div>

        <div className="text-white">
          =
        </div>

        <div className="flex flex-col items-center bg-white px-2">
          <div className="p-2 ">
           ?
          </div>
          <div className="border-t-2 border-black p-2">
            ?
          </div>
        </div>


      </div>
    </div>


  );
} 