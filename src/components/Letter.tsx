import React, { useState, useEffect, useRef } from "react";

interface LetterProps {
  name: string;
  images: string[];
  position: { x: number; y: number };
  onDrag: (name: string, position: { x: number; y: number }) => void;
}

const Letter: React.FC<LetterProps> = ({ name, images, position, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeImage = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * images.length);
      } while (newIndex === currentImageIndex);
      setCurrentImageIndex(newIndex);
    };

    const interval = setInterval(changeImage, 500);

    return () => clearInterval(interval);
  }, [images, currentImageIndex]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && letterRef.current) {
        const newX = e.clientX - letterRef.current.offsetWidth / 2;
        const newY = e.clientY - letterRef.current.offsetHeight / 2;
        onDrag(name, { x: newX, y: newY });
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, onDrag, name]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      ref={letterRef}
      className={`absolute cursor-move transition-all duration-150 ease-out ${
        isDragging ? "opacity-70" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "150px", // Aumenta el tamaño de la letra aquí
        height: "150px",
      }}
      onMouseDown={handleMouseDown}
    >
      <img
        src={images[currentImageIndex]}
        alt={name}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Letter;
