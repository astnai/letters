import React, { useReducer, useCallback } from "react";
import Letter from "./components/Letter";
import { letterReducer, initialState } from "./letterReducer";
import { LetterPosition } from "./type";

const App: React.FC = () => {
  const [letterPositions, dispatch] = useReducer(letterReducer, initialState);

  const handleLetterDrag = useCallback(
    (name: string, position: LetterPosition) => {
      dispatch({ type: "MOVE_LETTER", payload: { name, position } });
    },
    []
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="relative w-full max-w-[1200px] h-[80vh] md:h-[600px]">
        {Object.entries(letterPositions).map(([name, position]) => (
          <Letter
            key={name}
            name={name}
            position={position}
            onDrag={handleLetterDrag}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
