import React, { useState, useEffect } from 'react';

interface SquareStyle {
  transform: string;
  transition: string;
}

interface ButtonProps {
  text: string; // New prop for button text
  isHovered: boolean;
  onClick: () => void;
}

interface SquareProps {
  color: string;
  squareClasses: string;
  style: SquareStyle;
}

const Square: React.FC<SquareProps> = ({ color, squareClasses, style }) => (
  <div 
    className={`${color} ${squareClasses}`}
    style={{
      ...style,
      WebkitTransform: style.transform,
      MozTransform: style.transform,
      msTransform: style.transform,
    }}
  />
);

const Button: React.FC<ButtonProps> = ({ text, isHovered, onClick }) => (
  <button 
    type="button"
    className={`
      grow flex items-center justify-center
      py-2 px-4
      mx-0.5
      transition-all duration-150 outline-none focus:outline-none
      hover:bg-opacity-90 active:scale-95
      ${isHovered ? 'bg-white rounded-full' : ''}
      sm:px-6
      md:px-8
    `}
    onClick={onClick}
  >
    <span className={`
      text-sm sm:text-base font-semibold select-none
      transition-colors duration-150
      ${isHovered ? 'text-gray-900' : 'text-white'}
    `}>
      {text}
    </span>
  </button>
);

interface BorderBoxProps {
  buttonText: string; // New prop for BorderBox
  onClick?: () => void; // Optional onClick handler
}

const BorderBox: React.FC<BorderBoxProps> = ({ buttonText, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const colorOptions: string[] = [
    'bg-pink-400', 
    'bg-orange-400', 
    'bg-green-400', 
    'bg-lime-400', 
    'bg-blue-400', 
    'bg-cyan-400',
    'bg-yellow-400'
  ];

  const getRandomColor = (): string => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  const snappyTransition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';

  const getSquareStyle = (index: number, isTop: boolean = true, total: number = 15): SquareStyle => {
    const mobileOffset = isMobile ? 4 : 8;
    
    if (index === 0) {
      return {
        transform: isHovered ? 
          `translate(-${mobileOffset/2}px, ${isTop ? `-${mobileOffset}px` : `${mobileOffset}px`})` : 
          'translate(0, 0)',
        transition: snappyTransition
      };
    } else if (index === total - 1) {
      return {
        transform: isHovered ? 
          `translate(${mobileOffset/2}px, ${isTop ? `-${mobileOffset}px` : `${mobileOffset}px`})` : 
          'translate(0, 0)',
        transition: snappyTransition
      };
    } else if (index % 2 === 0) {
      return {
        transform: isHovered ? 
          `translateY(${isTop ? `-${mobileOffset}px` : `${mobileOffset}px`})` : 
          'translateY(0)',
        transition: snappyTransition
      };
    }
    return {
      transform: '',
      transition: snappyTransition
    };
  };

  const sideSquareStyle = (index: number, isLeft: boolean = true): SquareStyle => ({
    transform: isHovered && index === 1 ? 
      `translateX(${isLeft ? '-6px' : '6px'})` : 
      'translateX(0)',
    transition: snappyTransition
  });

  const squareClasses = 'w-3 h-3 sm:w-4 sm:h-4';
  const squareCount = isMobile ? 11 : 15;
  
  return (
    <div className="flex items-center justify-center min-h-[100px] sm:min-h-[120px] touch-none">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative p-2"
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-0.5">
            {[...Array(squareCount)].map((_, index) => (
              <Square 
                key={`top-${index}`}
                color={getRandomColor()}
                squareClasses={squareClasses}
                style={getSquareStyle(index, true, squareCount)}
              />
            ))}
          </div>
          
          <div className="flex gap-0.5">
            <div className="flex flex-col gap-0.5">
              {[...Array(3)].map((_, index) => (
                <Square 
                  key={`left-${index}`}
                  color={getRandomColor()}
                  squareClasses={squareClasses}
                  style={sideSquareStyle(index, true)}
                />
              ))}
            </div>
            
            <Button 
              text={buttonText}
              isHovered={isHovered}
              onClick={onClick || (() => console.log('Button clicked!'))}
            />
            
            <div className="flex flex-col gap-0.5">
              {[...Array(3)].map((_, index) => (
                <Square 
                  key={`right-${index}`}
                  color={getRandomColor()}
                  squareClasses={squareClasses}
                  style={sideSquareStyle(index, false)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex gap-0.5">
            {[...Array(squareCount)].map((_, index) => (
              <Square 
                key={`bottom-${index}`}
                color={getRandomColor()}
                squareClasses={squareClasses}
                style={getSquareStyle(index, false, squareCount)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderBox;