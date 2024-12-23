  import React, { useState } from 'react';

  interface CubeColors {
    top: string;
    right: string;
    left: string;
  }

  interface IsometricCubeProps {
    colors: CubeColors;
    translateX: number;
    translateY: number;
    zIndex: number;
    isHovered: boolean;
    onHover: (value: boolean) => void;
  }

  const IsometricCube: React.FC<IsometricCubeProps> = ({ 
    colors, 
    translateX, 
    translateY, 
    zIndex,
    isHovered,
    onHover 
  }) => {
    // Increased size by another 50% (previous 280 * 1.5)
    const size = 420;
    const heightMultiplier = 1.08;
    
    const top = `${size/2},${size/4} ${size},${size/2} ${size/2},${size*3/4} 0,${size/2}`;
    const left = `0,${size/2} ${size/2},${size*3/4} ${size/2},${size*5/4 * heightMultiplier} 0,${size * heightMultiplier}`;
    const right = `${size},${size/2} ${size},${size * heightMultiplier} ${size/2},${size*5/4 * heightMultiplier} ${size/2},${size*3/4}`;

    const baseOpacity = isHovered ? "opacity-95" : "opacity-80";
    const blurEffect = isHovered ? "" : "blur-sm";
    const transition = "transition-all duration-100 ease-in-out";

    return (
      <g 
        transform={`translate(${translateX},${translateY})`} 
        style={{ zIndex }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className={`${transition} cursor-pointer`}
      >
        <polygon 
          points={top} 
          fill={colors.top} 
          className={`${baseOpacity} ${blurEffect} ${transition}`} 
        />
        <polygon 
          points={left} 
          fill={colors.left} 
          className={`${isHovered ? "opacity-90" : "opacity-70"} ${blurEffect} ${transition}`} 
        />
        <polygon 
          points={right} 
          fill={colors.right} 
          className={`${isHovered ? "opacity-85" : "opacity-60"} ${blurEffect} ${transition}`} 
        />
      </g>
    );
  };

  const CubeSculpture: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const cubeColors: CubeColors[] = [
      { top: '#90C853', right: '#75A842', left: '#5B8A31' },
      { top: '#A0359C', right: '#832B7E', left: '#662160' },
      { top: '#4391C3', right: '#357CA3', left: '#276783' },
      { top: '#53A355', right: '#428544', left: '#316733' },
      { top: '#B65D35', right: '#964C2B', left: '#763B21' },
      { top: '#C39043', right: '#A37836', left: '#836029' },
      { top: '#43A39C', right: '#368780', left: '#296B65' },
    ];

    // Increased positions by another 50%
    const cubePositions = [
      { x: 525, y: 735, z: 6 },   // Previous x: 350, y: 490
      { x: 787, y: 892, z: 3 },   // Previous x: 525, y: 595
      { x: 1050, y: 1050, z: 1 }, // Previous x: 700, y: 700
      { x: 1312, y: 892, z: 2 },  // Previous x: 875, y: 595
      { x: 1575, y: 420, z: 4 },  // Previous x: 1050, y: 280
      { x: 1575, y: 735, z: 5 },  // Previous x: 1050, y: 490
      { x: 525, y: 420, z: 1 },   // Previous x: 350, y: 280
    ];

    return (
      <div className="flex items-center justify-center w-full h-full">
        <svg 
          viewBox="0 0 2520 1680" // Previous 1680 1120 * 1.5
          className="w-full max-w-full" // Changed to max-w-full since it's now quite large
        >
          {cubePositions.map((pos, index) => (
            <IsometricCube
              key={index}
              colors={cubeColors[index]}
              translateX={pos.x}
              translateY={pos.y}
              zIndex={pos.z}
              isHovered={hoveredIndex === index}
              onHover={(value) => setHoveredIndex(value ? index : null)}
            />
          ))}
        </svg>
      </div>
    );
  };

  export default CubeSculpture;