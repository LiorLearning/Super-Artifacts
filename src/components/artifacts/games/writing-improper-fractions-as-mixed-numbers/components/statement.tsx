export const Statement = ({numerator, denominator, count}: {numerator: number, denominator: number, count: number}) => {
  return (
    <div className="flex justify-center mt-4 items-center space-x-4">
      <span className="text-3xl">I need </span>
      <div className="text-3xl font-bold text-center">
        <span className="border-2 border-purple-500 text-purple-500 px-3 py-1">{count}</span>
      </div>
      <span className="text-3xl"> legos X size </span>
      <div className="text-3xl font-bold text-center">
        <span>1</span>
        <div className="w-full h-px bg-black my-2" />
        <span className="border border-black px-3 py-1">{denominator}</span>
      </div>
      <span className="text-3xl"> to create </span>
      <span className="text-3xl font-bold text-center w-6">
        <span>{numerator}</span>
          <div className="w-full h-px bg-black my-1" />
        <span>{denominator}</span>
      </span>
    </div>
  )
}