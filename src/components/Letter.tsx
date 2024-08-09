import React, { useState, useEffect, useRef, useCallback } from "react";
import { useImageCycler } from "../useImageCycler";
import { LetterPosition } from "../type";

interface LetterProps {
  name: string;
  position: LetterPosition;
  onDrag: (name: string, position: LetterPosition) => void;
}

const Letter: React.FC<LetterProps> = React.memo(
  ({ name, position, onDrag }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const letterRef = useRef<HTMLDivElement>(null);
    const currentImage = useImageCycler(name);

    const handleStart = useCallback((clientX: number, clientY: number) => {
      if (letterRef.current) {
        const rect = letterRef.current.getBoundingClientRect();
        setOffset({
          x: clientX - rect.left,
          y: clientY - rect.top,
        });
      }
      setIsDragging(true);
    }, []);

    const handleEnd = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleMove = useCallback(
      (clientX: number, clientY: number) => {
        if (isDragging) {
          const newX = clientX - offset.x;
          const newY = clientY - offset.y;
          onDrag(name, { x: newX, y: newY });
        }
      },
      [isDragging, offset, onDrag, name]
    );

    useEffect(() => {
      const handleMouseUp = () => handleEnd();
      const handleMouseMove = (e: MouseEvent) =>
        handleMove(e.clientX, e.clientY);
      const handleTouchEnd = () => handleEnd();
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchmove", handleTouchMove);

      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.removeEventListener("touchmove", handleTouchMove);
      };
    }, [handleEnd, handleMove]);

    return (
      <div
        ref={letterRef}
        className={`absolute cursor-move transition-all duration-150 ease-out 
          ${isDragging ? "opacity-70 scale-105" : ""}
          w-full h-full max-w-[250px] max-h-[250px]`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          e.preventDefault();
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        role="button"
        aria-label={`Drag letter ${name}`}
        tabIndex={0}
      >
        <img
          src={currentImage}
          alt={`Letter ${name}`}
          className="w-full h-full object-contain"
          draggable="false"
        />
      </div>
    );
  }
);

export default Letter;
