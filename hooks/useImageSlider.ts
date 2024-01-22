import { useEffect, useRef, useState, TouchEvent } from 'react';

export const useImageSlider = () => {
  const [imageRevealFraction, setImageRevealFraction] = useState(0.5);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const slide = (xPosition: number) => {
    const containerBoundingRect =
      imageContainerRef.current?.getBoundingClientRect();
    if (!containerBoundingRect) return;
    setImageRevealFraction(() => {
      if (xPosition < containerBoundingRect.left) {
        return 0;
      }
      if (xPosition > containerBoundingRect.right) {
        return 1;
      }
      return (
        (xPosition - containerBoundingRect.left) / containerBoundingRect.width
      );
    });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    slide(e.touches.item(0).clientX);
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    slide(e.clientX);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return {
    imageRevealFraction,
    imageContainerRef,
    handleTouchMove,
    handleMouseDown,
  };
};
