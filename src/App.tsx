import React, {
  useReducer,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Letter from "./components/Letter";
import { letterReducer, initialState } from "./letterReducer";
import { LetterPosition } from "./type";

const App: React.FC = () => {
  const [letterPositions, dispatch] = useReducer(letterReducer, initialState);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const handleLetterDrag = useCallback(
    (name: string, position: LetterPosition) => {
      dispatch({ type: "MOVE_LETTER", payload: { name, position } });
    },
    []
  );

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full max-w-[1200px] h-[80vh] md:h-[600px] touch-none"
      >
        {Object.entries(letterPositions).map(([name, position]) => (
          <Letter
            key={name}
            name={name}
            position={position}
            onDrag={handleLetterDrag}
            containerSize={containerSize}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
