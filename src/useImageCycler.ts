import { useState, useEffect } from "react";

const images: Record<string, string[]> = {
  a: [
    "/letters/01-a/letter-a-1.png",
    "/letters/01-a/letter-a-2.png",
    "/letters/01-a/letter-a-3.png",
    "/letters/01-a/letter-a-4.png",
    "/letters/01-a/letter-a-5.png",
  ],
  s: [
    "/letters/02-s/letter-s-1.png",
    "/letters/02-s/letter-s-2.png",
    "/letters/02-s/letter-s-3.png",
    "/letters/02-s/letter-s-4.png",
    "/letters/02-s/letter-s-5.png",
  ],
  t: [
    "/letters/03-t/letter-t-1.png",
    "/letters/03-t/letter-t-2.png",
    "/letters/03-t/letter-t-3.png",
    "/letters/03-t/letter-t-4.png",
    "/letters/03-t/letter-t-5.png",
  ],
  n: [
    "/letters/04-n/letter-n-1.png",
    "/letters/04-n/letter-n-2.png",
    "/letters/04-n/letter-n-3.png",
    "/letters/04-n/letter-n-4.png",
    "/letters/04-n/letter-n-5.png",
  ],
  a2: [
    "/letters/05-a/letter-a-1.png",
    "/letters/05-a/letter-a-2.png",
    "/letters/05-a/letter-a-3.png",
    "/letters/05-a/letter-a-4.png",
    "/letters/05-a/letter-a-5.png",
  ],
  i: [
    "/letters/06-i/letter-i-1.png",
    "/letters/06-i/letter-i-2.png",
    "/letters/06-i/letter-i-3.png",
    "/letters/06-i/letter-i-4.png",
    "/letters/06-i/letter-i-5.png",
  ],
};

export const useImageCycler = (letterName: string) => {
  const [currentImage, setCurrentImage] = useState(images[letterName][0]);

  useEffect(() => {
    const cycleImages = () => {
      const currentIndex = images[letterName].indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % images[letterName].length;
      setCurrentImage(images[letterName][nextIndex]);
    };

    const intervalId = setInterval(cycleImages, 500);

    return () => clearInterval(intervalId);
  }, [letterName, currentImage]);

  return currentImage;
};
