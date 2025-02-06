


export default function Bg({children}: {children: React.ReactNode}) {
  return (
    <div className="w-full h-full min-h-full flex flex-col items-center relative bg-[#61C0FF]">
      <div className="w-full absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-white to-transparent" />
      <div className="w-full h-full pb-20 relative z-10">
        {children}
      </div>
    </div>
  );
}