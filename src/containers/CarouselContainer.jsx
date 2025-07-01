import { useState, useEffect } from "react";

export default function CarouselContainer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSpacing = () => {
    if (isMobile) return 25;
    return window.innerWidth < 768 ? 45 : 60;
  };

  const getAnimationValues = (position) => {
    const offset = position - 2;
    return {
      offset,
      scale: offset === 0 ? 1 : 0.75,
      zIndex: offset === 0 ? 10 : 0,
      opacity: offset === 0 ? 1 : 0.7,
      x: offset * getSpacing(),
      rotateY: offset * 15,
    };
  };

  return {
    isMobile,
    getSpacing,
    getAnimationValues,
  };
}
