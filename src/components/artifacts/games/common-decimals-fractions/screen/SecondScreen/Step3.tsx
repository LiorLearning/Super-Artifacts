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
      className='absolute scale-[1.2] top-[43%] left-[54%] z-20 cursor-move'
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
      className={`absolute scale-[1.2] top-[57%] left-[44.6%] z-20 transition-opacity duration-300
        ${isDropped ? 'opacity-100' : isOver ? 'opacity-50' : 'opacity-0'}`}
    >
      <NewKey n={n} a={a} b={b} isActive={true} />
    </div>
  );
};

export default function Screen2Step3({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { n, a, b, level } = gameStateRef.current.state2.key;
  const [isDropped, setIsDropped] = useState(false);

  const handleDrop = () => {
    setIsDropped(true);
    sendAdminMessage('agent', `You have successfully placed the key in the chest`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto min-h-screen relative overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>
        <div className='mx-auto flex justify-center items-center gap-4 absolute left-1/2 top-[10%] transform -translate-x-1/2'>
          <div className='bg-[#f5f8e5] px-10 py-3 text-2xl leading-none rounded-[20px] flex items-center justify-center gap-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='bg-[#ffdc3e] w-8 text-center p-1 rounded-lg border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{n}</div>
              <div className='px-6 border-b-2 my-2 border-[#8A1900]'></div>
              <div className='bg-[#ffdc3e] p-1 w-8 text-center rounded-lg border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{a * b}</div>
            </div>
            <h1 className='text-[#8A1900] scale-y-125'>Key is ready...</h1>
          </div>
        </div>

        {!isDropped && <DraggableKey n={n} a={a} b={b} />}
        <DropTarget n={n} a={a} b={b} onDrop={handleDrop} isDropped={isDropped} />

        <img src={Chest.src} className='absolute scale-[1.2] bottom-[15%] left-1/2 transform -translate-x-[55%]  z-10' alt="chest" />
      </div>
    </DndProvider>
  );
}