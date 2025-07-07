import React, { useState } from 'react';
import { sampleVideos } from '@js/data/videosDatas.ts';

const VideoGallery: React.FC = () => {
  const [sortByNewest, setSortByNewest] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const sortedVideos = [...sampleVideos].sort((a, b) =>
    sortByNewest ? b.id - a.id : a.id - b.id
  );

  return (
    <section className="wrapper-1440-black">
      <div className="video__gallery">
        <h1 className='title'>EXERCICES EN VIDÉO</h1>
        <h2>VISUALISEZ, EXÉCUTEZ, PROGRESSEZ</h2>
        <p>
          Des capsules vidéos courtes présentant l'exécution précise des mouvements par votre coach.
        </p>

        <div className="filters">
          <button
            className={sortByNewest ? 'filter--active' : ''}
            onClick={() => setSortByNewest(true)}
          >
            Les plus récents
          </button>
          <button
            className={!sortByNewest ? 'filter--active' : ''}
            onClick={() => setSortByNewest(false)}
          >
            Les plus anciens
          </button>
        </div>

        <div className="video__gallery__grid">
          {sortedVideos.map((video) => (
            <div
              key={video.id}
              className={`video__gallery__card${playingId === video.id ? ' is-playing' : ''}`}
            >
              <div className='video__gallery__card__head'>
              <h2 className="video__gallery__exercice">{video.exerciceName}</h2>
              <p className="video__gallery__reps">{video.repetitions}</p>
              <p className="video__gallery__break">{video.break}</p>
			  </div>
              <img
                src={video.thumbnail}
                alt={video.title}
                className={`video__gallery__thumb video__gallery__thumb--${video.id}`}
                draggable={false}
              />
              <video
                src={video.videoUrl}
                controls
                preload="metadata"
                className="video__gallery__video"
                onPlay={() => setPlayingId(video.id)}
                onPause={() => setPlayingId(null)}
                onEnded={() => setPlayingId(null)}
              />
              <h3>{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
