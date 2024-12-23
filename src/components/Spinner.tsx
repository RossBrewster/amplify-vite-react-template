import React, { useEffect, useState, useCallback, useMemo } from 'react';

interface Position {
  row: number;
  col: number;
}

interface Square {
  id: number;
  color: string;
  position: Position;
}

interface MoveResult {
  newSquares: Square[];
  oldPosition: Position;
}

const Spinner: React.FC = () => {
  const colorOptions = useMemo(() => [
    'bg-pink-400', 
    'bg-orange-400', 
    'bg-green-400', 
    'bg-lime-400', 
    'bg-blue-400', 
    'bg-cyan-400',
    'bg-yellow-400'
  ], []);

  const getRandomColor = useCallback((): string => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  }, [colorOptions]);

  const [squares, setSquares] = useState<Square[]>(() => {
    const initialPositions: Position[] = [
      {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2},
      {row: 1, col: 0},                    {row: 1, col: 2},
      {row: 2, col: 0}, {row: 2, col: 1}
    ];
    
    return initialPositions.map((pos, index) => ({
      id: index,
      color: getRandomColor(),
      position: pos
    }));
  });

  const moveSquare = useCallback((currentSquares: Square[], emptyPos: Position): MoveResult | null => {
    const possibleMovers = currentSquares.filter(square => {
      const rowDiff = Math.abs(square.position.row - emptyPos.row);
      const colDiff = Math.abs(square.position.col - emptyPos.col);
      return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    });
    
    if (possibleMovers.length === 0) return null;
    
    const mover = possibleMovers[Math.floor(Math.random() * possibleMovers.length)];
    
    return {
      newSquares: currentSquares.map(square => {
        if (square.id === mover.id) {
          return {
            ...square,
            position: emptyPos,
            color: getRandomColor()
          };
        }
        return square;
      }),
      oldPosition: mover.position
    };
  }, [getRandomColor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSquares(prevSquares => {
        const occupiedPositions = new Set(
          prevSquares.map(s => `${s.position.row},${s.position.col}`)
        );
        
        const emptyPositions: Position[] = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (!occupiedPositions.has(`${row},${col}`)) {
              emptyPositions.push({row, col});
            }
          }
        }
        
        let currentSquares = prevSquares;
        const remainingEmptyPositions = [...emptyPositions];

        const firstMove = moveSquare(currentSquares, remainingEmptyPositions[0]);
        if (firstMove) {
          currentSquares = firstMove.newSquares;
          remainingEmptyPositions[0] = firstMove.oldPosition;
        }

        const secondMove = moveSquare(currentSquares, remainingEmptyPositions[1]);
        if (secondMove) {
          currentSquares = secondMove.newSquares;
        }

        return currentSquares;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [moveSquare]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        {squares.map(square => (
          <div
            key={square.id}
            className={`absolute w-6 h-6 ${square.color} transition-all duration-100 ease-in-out rounded-sm`}
            style={{
              transform: `translate(${square.position.col * 144}%, ${square.position.row * 144}%)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Spinner;