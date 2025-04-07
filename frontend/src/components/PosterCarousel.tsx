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
  const duplicatedImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <div className="position-relative overflow-hidden w-100">
      <motion.div
        className="d-flex"
        animate={{ x: slideLeft ? ['0%', '-107%'] : ['-107%', '0%'] }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: 'linear',
        }}
        style={{ width: '200%' }}
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
