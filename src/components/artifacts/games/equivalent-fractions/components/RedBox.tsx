import React from 'react';

interface RedBoxProps {
  children: React.ReactNode;
}

const RedBox: React.FC<RedBoxProps> = ({ children }) => {
  return (
    <div className="bg-white border-8 text-red-500 border-red-500 font-bold p-4 m-2">
      {children}
    </div>
  );
};

export default RedBox;
