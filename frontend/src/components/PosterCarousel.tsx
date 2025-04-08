// import { motion } from 'framer-motion';

// interface PosterCarouselProps {
//   images: string[];
//   duration: number;
//   slideLeft: boolean;
// }

// const PosterCarousel = ({
//   images,
//   duration,
//   slideLeft,
// }: PosterCarouselProps) => {
//   const duplicatedImages = [...images, ...images]; // duplicate for seamless loop

//   return (
//     <div className="position-relative overflow-hidden w-100">
//       <motion.div
//         className="d-flex"
//         animate={{ x: slideLeft ? ['0%', '-162.8%'] : ['-107%', '0%'] }}
//         transition={{
//           repeat: Infinity,
//           duration: duration,
//           ease: 'linear',
//         }}
//         style={{ width: '200%' }}
//       >
//         {duplicatedImages.map((img, idx) => (
//           <div
//             key={idx}
//             className="px-2"
//             style={{ width: '200px', flexShrink: 0 }}
//           >
//             <img
//               src={img}
//               alt={`poster-${idx}`}
//               className="img-fluid rounded shadow"
//               style={{ height: '300px', objectFit: 'cover' }}
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default PosterCarousel;

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PosterCarouselProps {
  images: string[];
  duration: number;
  slideLeft: boolean;
}

const PosterCarousel = ({
  images,
  duration,
  slideLeft,
}: PosterCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);

  const duplicatedImages = [...images, ...images]; // duplicate for loop

  useEffect(() => {
    if (containerRef.current) {
      // const container = containerRef.current;
      const itemWidth = 200 + 16; // image width + padding (px-2 = 0.5rem = 8px each side)
      setTotalWidth(itemWidth * images.length);
    }
  }, [images.length]);

  return (
    <div ref={containerRef} className="position-relative overflow-hidden w-100">
      <motion.div
        className="d-flex"
        animate={{
          x: slideLeft ? [0, -totalWidth + 210] : [-totalWidth + 210, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: 'linear',
        }}
        style={{ width: totalWidth * 2 }} // double because of duplication
      >
        {duplicatedImages.map((img, idx) => (
          <div
            key={idx}
            className="px-2"
            style={{ width: '200px', flexShrink: 0 }}
          >
            <img
              src={img}
              alt={`poster-${idx}`}
              className="img-fluid rounded shadow"
              style={{ height: '300px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PosterCarousel;
