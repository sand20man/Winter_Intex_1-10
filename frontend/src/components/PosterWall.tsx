import PosterCarousel from './PosterCarousel';

const PosterWall = () => {
  const posterImages1 = [
    'posters/A Very Country Christmas.jpg',
    'posters/All For Love.jpg',
    'posters/An American Tail The Treasures of Manhattan Island.jpg',
    'posters/Behind the Curve.jpg',
    'posters/Bennetts War.jpg',
    'posters/Blood Red Sky.jpg',
    'posters/Camera Store.jpg',
    'posters/Can You Hear Me.jpg',
    'posters/Sabotage.jpg',
    'posters/Scissor Seven.jpg',
    'posters/Skyline.jpg',
    'posters/Under an Arctic Sky.jpg',
    'posters/War Horse.jpg',
  ];
  const posterImages2 = [
    'posters/Children of Adam.jpg',
    'posters/Chosen.jpg',
    'posters/Coronavirus Explained.jpg',
    'posters/Faith Hope  Love.jpg',
    'posters/Friendship.jpg',
    'posters/Hope One in a Billion.jpg',
    'posters/Ken Burns Presents College Behind Bars A Film by Lynn Novick and Produced by Sarah Botstein.jpg',
    'posters/Lavender.jpg',
    'posters/Solo.jpg',
    'posters/The Good Catholic.jpg',
    'posters/The Incredibles 2.jpg',
    'posters/True Memoirs of an International Assassin.jpg',
    'posters/Turbo.jpg',
  ];
  const posterImages3 = [
    'posters/Legend of the Guardians The Owls of GaHoole.jpg',
    'posters/Moving On.jpg',
    'posters/Mr Peabody  Sherman.jpg',
    'posters/My Little Pony Equestria Girls Rainbow Rocks.jpg',
    'posters/Once Upon A Time In Lingjian Mountain.jpg',
    'posters/Paris Is Us.jpg',
    'posters/Period End of Sentence.jpg',
    'posters/Pup Star Better 2Gether.jpg',
    'posters/The Men Who Stare at Goats.jpg',
    'posters/The Physician.jpg',
    'posters/The Visit.jpg',
    'posters/The Water Man.jpg',
    'posters/The World We Make.jpg',
  ];

  return (
    <div>
      <div className="mb-2">
        <PosterCarousel images={posterImages1} duration={40} slideLeft={true} />
      </div>
      <div className="mb-2">
        <PosterCarousel
          images={posterImages2}
          duration={50}
          slideLeft={false}
        />
      </div>
      <div className="mb-2">
        <PosterCarousel images={posterImages3} duration={60} slideLeft={true} />
      </div>
    </div>
  );
};

export default PosterWall;
