import { useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import NewKey from '../../components/newKey';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Chest from '../../assets/chest-without-border.png';
import background from '../../assets/bg-big-without-chest.png'


const ItemTypes = {
  KEY: 'key'
};

const DraggableKey = ({ n, a, b }: { n: number; a: number; b: number }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KEY,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      id='first'
      className='absolute translate-x-[40vw] translate-y-[38vh] z-20 cursor-move'
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <NewKey n={n} a={a} b={b} isActive={true} />
    </div>
  );
};

const DropTarget = ({ n, a, b, onDrop, isDropped }: { n: number; a: number; b: number; onDrop: () => void; isDropped: boolean }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.KEY,
    drop: () => {
      onDrop();
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
      id='second'
      className={`absolute top-[52.5vh] w-full z-20 transition-opacity duration-300
        ${isDropped ? 'opacity-100' : isOver ? 'opacity-50' : 'opacity-0'}`}
    >
      <NewKey n={n} a={a} b={b} isActive={true} />
    </div>
  );
};

export default function Screen1Step3({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { numerator, denominator_1, denominator_2, level } = gameStateRef.current.state1.key;
  const [isDropped, setIsDropped] = useState(false);

  const handleDrop = () => {
    setIsDropped(true);
    sendAdminMessage('agent', `You have successfully placed the key in the chest`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto min-h-screen relative overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>
      <div className='bg-[#f5f8e5] px-[4vw] py-[2vh] text-[1.7vw] leading-none rounded-[2vw] absolute left-1/2 transform -translate-x-1/2 translate-y-[10vh] shadow-lg opacity-90 flex justify-center items-center gap-[2vh]'>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-[#ffdc3e] w-[5vh] text-center p-[0.3vh] rounded-[1vh] border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{numerator}</div>
          <div className='px-[3vh] border-b-[0.2vh] my-[0.8vh] border-[#8A1900]'></div>
          <div className='bg-[#ffdc3e] w-[5vh] text-center p-[0.3vh] rounded-[1vh] border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{denominator_1 * denominator_2}</div>
        </div>
        <h1 className='text-[#8A1900] scale-y-125'>Key is ready...</h1>
      </div>

        {!isDropped && <DraggableKey n={numerator} a={denominator_1} b={denominator_2} />}
        <DropTarget n={numerator} a={denominator_1} b={denominator_2} onDrop={handleDrop} isDropped={isDropped} />

        <div className='relative min-h-screen min-w-full transform -translate-x-[4vh] translate-y-[10vh] flex justify-center items-center'>
          <img src={Chest.src}
            className='absolute scale-[1.2] h-[48vh] w-auto z-10'
            alt="chest"
          />
        </div>
      </div>
    </DndProvider>
  );
}