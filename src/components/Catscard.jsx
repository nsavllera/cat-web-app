import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const SWIPE_THRESHOLD = 120;

function Catscard({ cataasUrl, onLike, onDislike }) {
  const x = useMotionValue(0);

  // Rotate based on drag distance
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  // Fade out as card moves away
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const [exitX, setExitX] = useState(0);

  return (
    <motion.img
      src={cataasUrl}
      className="card"
      drag="x"
      dragElastic={0.6}
      dragMomentum={false}
      style={{
        x,
        rotate,
        opacity,
        touchAction: "none"
      }}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
          setExitX(1000);
          onLike();
        } else if (info.offset.x < -SWIPE_THRESHOLD) {
          setExitX(-1000);
          onDislike();
        }
      }}
      animate={{ 
        x: exitX,
        rotate: exitX > 0 ? 20 : exitX < 0 ? -20 : 0,
        opacity: exitX !== 0 ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileTap={{ scale: 1.05 }}
    />
  );
}

export default Catscard;
