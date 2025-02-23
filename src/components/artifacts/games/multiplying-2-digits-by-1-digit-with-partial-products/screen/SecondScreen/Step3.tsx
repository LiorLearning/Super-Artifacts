// import { BaseProps } from "../../utils/types";
// import grass from '../../assets/grass.png';
// import tilo from '../../assets/tilo.png';
// import tiloshadow from '../../assets/tiloshadow.png';
// import boxshadow from '../../assets/boxshadow.png';
// import MultiplyBox from '../../components/multiplybox';
// import { useGameState } from "../../state-utils";
// import { useRef, useEffect, useState } from "react";
// import { goToStep } from "../../utils/helper";
// export default function Screen2Step1({ sendAdminMessage }: BaseProps) {

//   const { gameStateRef, setGameStateRef } = useGameState();
//   const [hideMessage, setHideMessage] = useState(false);
  
//   const [isLost, setIsLost] = useState(false);
//   const hasGameStartedRef = useRef(false);

//   useEffect(() => {
//     if (!hasGameStartedRef.current) {
//       hasGameStartedRef.current = true;
//     }
//   }, []);

//   const number1 = gameStateRef.current.state2.number1;
//   const number2 = gameStateRef.current.state2.number2;


//   function onCorrect() {
//     sendAdminMessage('agent', `Awesome, ${number1} x ${number2} is same as ${number1 * 10} times ${number2} and ${number1} times ${number2}`);
//     setIsCorrect(true);
//     setTimeout(() => {
//       goToStep('second', setGameStateRef, 2);
//     }, 5000)
//   }

//   function onIncorrect() {
//     sendAdminMessage('agent', `Tilo still looks confused. Let's try a different combination.`);
//     setIsCorrect(false);
//     setIsLost(true);
//   }

//   return (
//     <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

//       {!hideMessage && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center w-[74.5%]">
//         <div className="z-50 flex flex-col items-center justify-center gap-[1vh] content-center w-[65vh] px-[2vw] py-[2vh] bg-white border-[1.5vh] border-[#007179] rounded-[5vh]">
//           <div className="text-[4vh]">
//             Click on <span className="bg-[#f00004] text-[3vh] border-[0.7vh] border-[#a70003] px-[2vh] py-[0.7vh] mx-[2vh] mt-[4vh] text-white -translate-x-[4vh]">FIX</span> when you want to
//           </div>
//           <div className="text-[4vh]">
//             fix the slider..
//           </div>

//           <button className="bg-[#007179] mt-[3vh] text-white text-[2.5vh] py-[1vh] px-[3vh] rounded-[6vh]"
//             onClick={() => setHideMessage(true)}>
//             {'CONTINUE >>'}
//           </button>
//         </div>
//       </div>}

      
//       <div className="absolute w-full h-[25vh] z-10"
//         style={{ backgroundImage: `url(${grass.src})`, backgroundSize: '100% 100%' }}>
//       </div>

//       {isCorrect ? <><div className="absolute left-0 translate-x-[10vw] -translate-y-[10vh] w-[25vh] h-[30vh] z-30"
//         style={{ backgroundImage: `url(${tilo.src})`, backgroundSize: '100% 100%' }}>
//       </div>
//       <div className="absolute left-0 translate-x-[10vw] -translate-y-[18vh] w-[25vh] h-[25vh] z-30"
//         style={{ backgroundImage: `url(${happy.src})`, backgroundSize: '100% 100%' }}>
//       </div></> : <><div className="absolute left-0 translate-x-[10vw] -translate-y-[10vh] w-[25vh] h-[30vh] z-30"
//         style={{ backgroundImage: `url(${tilosad.src})`, backgroundSize: '100% 100%' }}>
//       </div>
//       {isLost && <div className="absolute left-0 translate-x-[10vw] -translate-y-[18vh] w-[25vh] h-[25vh] z-30"
//         style={{ backgroundImage: `url(${lost.src})`, backgroundSize: '100% 100%' }}>
//       </div>}
//       </>}


//       <div className="absolute left-0 translate-x-[9vw] w-[25vh] h-[11vh] z-20"
//         style={{ backgroundImage: `url(${tiloshadow.src})`, backgroundSize: '100% 100%' }}>
//       </div>

//       <div className={`absolute ml-[12vw] max-w-[30vh] text-[3vh] -translate-y-[45vh] left-0 bg-white py-[1vh] px-[2vh] border-[0.2vh] border-black z-10 drop-shadow-lg transition-all duration-500`}>
//         {isCorrect ? `That's right!` : `Can you move this slider to split ${number1} into two parts?`}
//       </div>

//       <div className="absolute z-20 translate-x-[12vw] -translate-y-[10vh]">
//         <MultiplyBox number1={number1} number2={number2} onCorrect={onCorrect} onIncorrect={onIncorrect} />
//       </div>
//       <div style={{backgroundImage: `url(${boxshadow.src})`, backgroundSize: '100% 100%'}} className={`absolute z-10 translate-x-[10vw] translate-y-[9vw]  bottom-0 w-[52vh] h-[10vh]`}></div>

      
//     </div>
//   )
// }
