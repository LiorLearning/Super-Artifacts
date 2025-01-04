import FirstScreen from './screen/first';

export default function Game() {
  return (
    <div className="mx-auto game font-jersey">
      <FirstScreen />
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
        `}</style>
    </div>
  )
}