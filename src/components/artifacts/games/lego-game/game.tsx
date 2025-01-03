import LegoGame from './lego-game';

export default function FractionConverter() {
    return (
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-[#e3f261] p-6 border-t-4 border-b-4 border-blue-600">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-4">
            Convert 
            <div className="bg-white px-4 py-2 inline-flex flex-col items-center border border-black">
              <span>7</span>
              <div className="w-4 h-px bg-black" />
              <span>4</span>
            </div>
            to a mixed fraction
          </h1>
        </div>
  
        {/* Main Content */}
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold mb-16">
            Hey let us understand mixed fractions, with{' '}
            <span className="text-red-500 relative">
              LEGOS!
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            </span>
          </h2>
  
          <div className="relative">
            {/* Lego Holder Label */}
            <div className="absolute -top-6 left-8">
              <div className="bg-[#8B4513] text-white px-4 py-2">
                Lego Holder
              </div>
            </div>
  
            <div className="flex justify-between items-center gap-12">
              {/* Lego Holder Component */}
              <LegoGame />
  
              {/* Lego Block */}
              <div className="relative">
                <div className="absolute -bottom-12 right-0">
                  <div className="bg-purple-600 text-white px-4 py-2">
                    Lego Block
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  