import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number; // Current saved rating (0–5)
  onRate: (rating: number) => void; // Callback when user clicks
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', gap: '0.25rem', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          color={
            hovered !== null
              ? star <= hovered
                ? '#FFD700'
                : '#ccc'
              : star <= rating
                ? '#FFD700'
                : '#ccc'
          }
          onClick={() => onRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
};

export default StarRating;
