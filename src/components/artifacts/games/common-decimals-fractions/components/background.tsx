import Chest from '../assets/BOX.png';
import Sun from '../assets/Sun.png';
import Wave from '../assets/Wave.png';
import Sand from '../assets/Sand.png';
import Crab from '../assets/Crab.png';
import RightGrass1 from '../assets/RightGrass1.png';
import RightGrass2 from '../assets/RightGrass2.png';
import RightGrass3 from '../assets/RightGrass3.png';
import RightGrass4 from '../assets/RightGrass4.png';
import RightGrass5 from '../assets/RightGrass5.png';
import Rock1 from '../assets/Rock1.png';
import Rock2 from '../assets/Rock2.png';



export default function Background() {
  return (
    <div className="min-h-screen relative">
      <img className="absolute top-0 right-1" src={Sun.src} alt="sun" />
      <img className="absolute bottom-0 left-0 w-full" src={Sand.src} alt="sand" />
      <img className="absolute top-0 left-0" src={Wave.src} alt="wave" />
      <img className="absolute bottom-[138px] right-0" src={Crab.src} alt="crab" />
      <img className="absolute bottom-[160px] left-0 z-10" src={Rock1.src} alt="rocks" />
      <img className="absolute bottom-0 left-0" src={Rock2.src} alt="rocks" />
      <img className="absolute top-0 left-0" src={RightGrass1.src} alt="right-grass-1" />
      <img className="absolute top-0 left-0" src={RightGrass2.src} alt="right-grass-2" />
      <img className="absolute bottom-[138px] right-0" src={RightGrass3.src} alt="right-grass-3" />
      <img className="absolute bottom-[138px] right-0" src={RightGrass4.src} alt="right-grass-4" />
      <img className="absolute bottom-0 right-0" src={RightGrass5.src} alt="right-grass-5" />
    </div>
  )
}