import React, { useState, useEffect, useRef, useCallback } from "react";
import { useImageCycler } from "../useImageCycler";
import { LetterPosition } from "../type";

interface LetterProps {
  name: string;
  position: LetterPosition;
  onDrag: (name: string, position: LetterPosition) => void;
  containerSize: { width: number; height: number };
}

const Letter: React.FC<LetterProps> = React.memo(
  ({ name, position, onDrag, containerSize }) => {
    const [isDragging, setIsDragging] = useState(false);
    const offsetRef = useRef({ x: 0, y: 0 });
    const letterRef = useRef<HTMLDivElement>(null);
    const currentImage = useImageCycler(name);
    const animationRef = useRef<number>();

    const handleStart = useCallback((clientX: number, clientY: number) => {
      if (letterRef.current) {
        const rect = letterRef.current.getBoundingClientRect();
        offsetRef.current = {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      }
      setIsDragging(true);
    }, []);

    const handleEnd = useCallback(() => {
      setIsDragging(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }, []);

    const handleMove = useCallback(
      (clientX: number, clientY: number) => {
        if (isDragging && letterRef.current) {
          const updatePosition = () => {
            const letterRect = letterRef.current!.getBoundingClientRect();
            const newX = Math.max(
              0,
              Math.min(
                clientX - offsetRef.current.x,
                containerSize.width - letterRect.width
              )
            );
            const newY = Math.max(
              0,
              Math.min(
                clientY - offsetRef.current.y,
                containerSize.height - letterRect.height
              )
            );
            onDrag(name, { x: newX, y: newY });
          };
          cancelAnimationFrame(animationRef.current!);
          animationRef.current = requestAnimationFrame(updatePosition);
        }
      },
      [isDragging, onDrag, name, containerSize]
    );

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) =>
        handleMove(e.clientX, e.clientY);
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchend", handleEnd);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [isDragging, handleMove, handleEnd]);

    return (
      <div
        ref={letterRef}
        className={`absolute cursor-move select-none
          ${isDragging ? "opacity-70 scale-105" : ""}
          w-full h-full max-w-[250px] max-h-[250px] transition-opacity transition-transform duration-150 ease-out`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: isDragging ? "transform" : "auto",
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
          className="w-full h-full object-contain pointer-events-none"
          draggable="false"
        />
      </div>
    );
  }
);

export default Letter;
