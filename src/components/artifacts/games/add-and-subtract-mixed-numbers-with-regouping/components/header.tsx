
export default function Header({
  text,
  active = true
}:{ 
  text: string, 
  active: boolean 
}) {
  return (
    <div
      className="w-full py-16 flex justify-around items-center"
    >

      <span className="w-1/5" />

      <h1 className={`text-4xl text-center flex flex-col items-center justify-center h-16 w-3/5 text-[#0C88C4] bg-white`}>
        {text}
      </h1>

      <div className="w-1/5 flex justify-center">
      <span className="h-16 w-16 bg-white p-4 rounded-full flex items-center justify-center">
        <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="-5" x2="26.2914" y2="-5" transform="matrix(0.714348 0.699791 -0.413157 0.91066 0 7)" stroke="black" stroke-width="10" stroke-linecap="round"/>
        <line x1="5" y1="-5" x2="26.2914" y2="-5" transform="matrix(-0.714348 0.699791 0.413157 0.91066 25.3516 25)" stroke="black" stroke-width="10" stroke-linecap="round"/>
        <line x1="5" y1="-5" x2="26.2914" y2="-5" transform="matrix(0.714348 0.699791 -0.413157 0.91066 22 7)" stroke="black" stroke-width="10" stroke-linecap="round"/>
        <line x1="5" y1="-5" x2="26.2914" y2="-5" transform="matrix(-0.714348 0.699791 0.413157 0.91066 47.1953 25)" stroke="black" stroke-width="10" stroke-linecap="round"/>
        </svg>

      </ span>
      </div>

    </div>
  )
}