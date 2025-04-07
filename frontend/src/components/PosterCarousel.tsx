import React from 'react';
import { motion } from 'framer-motion';

// const posterImages = [
//   'posters/A Very Country Christmas.jpg',
//   'posters/All For Love.jpg',
//   'posters/An American Tail The Treasures of Manhattan Island.jpg',
//   'posters/Behind the Curve.jpg',
//   'posters/Bennetts War.jpg',
//   'posters/Blood Red Sky.jpg',
//   'posters/Camera Store.jpg',
//   'posters/Can You Hear Me.jpg',
//   'posters/Children of Adam.jpg',
//   'posters/Chosen.jpg',
//   'posters/Coronavirus Explained.jpg',
//   'posters/Faith Hope  Love.jpg',
//   'posters/Friendship.jpg',
//   'posters/Hope One in a Billion.jpg',
//   'posters/Ken Burns Presents College Behind Bars A Film by Lynn Novick and Produced by Sarah Botstein.jpg',
//   'posters/Lavender.jpg',
//   'posters/Legend of the Guardians The Owls of GaHoole.jpg',
//   'posters/Moving On.jpg',
//   'posters/Mr Peabody  Sherman.jpg',
//   'posters/My Little Pony Equestria Girls Rainbow Rocks.jpg',
//   'posters/Once Upon A Time In Lingjian Mountain.jpg',
//   'posters/Paris Is Us.jpg',
//   'posters/Period End of Sentence.jpg',
//   'posters/Pup Star Better 2Gether.jpg',
//   'posters/Raja Natwarlal.jpg',
//   'posters/Sabotage.jpg',
//   'posters/Scissor Seven.jpg',
//   'posters/Skyline.jpg',
//   'posters/Solo.jpg',
//   'posters/Streets of Fire.jpg',
//   'posters/The Good Catholic.jpg',
//   'posters/The Incredibles 2.jpg',
//   'posters/The Men Who Stare at Goats.jpg',
//   'posters/The Physician.jpg',
//   'posters/The Visit.jpg',
//   'posters/The Water Man.jpg',
//   'posters/The World We Make.jpg',
//   'posters/True Memoirs of an International Assassin.jpg',
//   'posters/Turbo.jpg',
//   'posters/Under an Arctic Sky.jpg',
//   'posters/War Horse.jpg',
// ];

// // const duplicatedPosters = [...posterImages, ...posterImages]; // For seamless loop

// const chunkArray = (array: string | unknown[], size: number) => {
//   const result = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// };

// // const TileRow = ({ offset = 0, speed = 30 }) => {
// //   return (
// //     <motion.div
// //       className="flex gap-2"
// //       style={{ willChange: 'transform' }}
// //       animate={{ x: [0, -1000] }}
// //       transition={{
// //         repeat: Infinity,
// //         ease: 'linear',
// //         duration: speed,
// //       }}
// //     >
// //       {duplicatedPosters.map((src, index) => (
// //         <img
// //           key={`${offset}-${index}`}
// //           src={src}
// //           alt="poster"
// //           className="w-auto h-[100px] object-cover rounded-xl shadow-md"
// //         />
// //       ))}
// //     </motion.div>
// //   );
// // };

// const TileRow = ({ images, speed = 30 }) => {
//   const duplicated = [...images, ...images]; // Looping effect
//   return (
//     <motion.div
//       className="flex gap-2 w-max"
//       style={{ willChange: 'transform' }}
//       animate={{ x: [0, -1000] }}
//       transition={{
//         repeat: Infinity,
//         ease: 'linear',
//         duration: speed,
//       }}
//     >
//       {duplicated.map((src, index) => (
//         <img
//           key={`${speed}-${index}`}
//           src={src}
//           alt="poster"
//           className="w-[120px] h-[180px] object-cover rounded-md shadow-sm"
//         />
//       ))}
//     </motion.div>
//   );
// };

// export default function AnimatedPosterWall() {
//   const rows = chunkArray(posterImages, Math.ceil(posterImages.length / 6));
//   return (
//     <div className="w-full overflow-hidden bg-black py-10 space-y-4">
//       {rows.map((rowImages, i) => (
//         <div key={i} className="overflow-hidden w-full">
//           <TileRow images={rowImages} speed={30 - i * 2} />
//         </div>
//       ))}
//     </div>
//   );
// }

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
