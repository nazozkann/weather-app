export const CAROUSEL_ANIMATION = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
  hover: {
    duration: 0.2,
  },
  details: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 },
  },
};
