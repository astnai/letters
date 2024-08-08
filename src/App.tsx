import React, { useState } from "react";
import Letter from "./components/Letter";

const initialPositions = {
  a: { x: 0, y: 100 },
  s: { x: 100, y: 100 },
  t: { x: 200, y: 100 },
  n: { x: 300, y: 100 },
  a2: { x: 400, y: 100 },
  i: { x: 500, y: 100 },
};

const images: Record<string, string[]> = {
  a: [
    "/letters/01-a/letter-a-1.png",
    "/letters/01-a/letter-a-2.png",
    "/letters/01-a/letter-a-3.png",
  ],
  s: [
    "/letters/02-s/letter-s-1.png",
    "/letters/02-s/letter-s-2.png",
    "/letters/02-s/letter-s-3.png",
  ],
  t: [
    "/letters/03-t/letter-t-1.png",
    "/letters/03-t/letter-t-2.png",
    "/letters/03-t/letter-t-3.png",
  ],
  n: [
    "/letters/04-n/letter-n-1.png",
    "/letters/04-n/letter-n-2.png",
    "/letters/04-n/letter-n-3.png",
  ],
  a2: [
    "/letters/05-a/letter-a-1.png",
    "/letters/05-a/letter-a-2.png",
    "/letters/05-a/letter-a-3.png",
  ],
  i: [
    "/letters/06-i/letter-i-1.png",
    "/letters/06-i/letter-i-2.png",
    "/letters/06-i/letter-i-3.png",
  ],
};

const App: React.FC = () => {
  const [letterPositions, setLetterPositions] = useState(initialPositions);

  const handleLetterDrag = (
    name: string,
    position: { x: number; y: number }
  ) => {
    setLetterPositions((prev) => ({
      ...prev,
      [name]: position,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-full max-w-[600px] h-[300px]">
        {Object.entries(letterPositions).map(([name, position]) => (
          <Letter
            key={name}
            name={name}
            images={images[name]}
            position={position}
            onDrag={handleLetterDrag}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
