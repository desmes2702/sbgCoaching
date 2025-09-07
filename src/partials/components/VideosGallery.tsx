import React, { useState, useRef } from 'react';
import { sampleVideos } from '@js/data/videosDatas.ts';

const VideoGallery: React.FC = () => {
  const [sortByNewest, setSortByNewest] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const sortedVideos = [...sampleVideos].sort((a, b) =>
    sortByNewest ? b.id - a.id : a.id - b.id
  );

  // Fonction pour gérer le clic sur la carte ou la miniature
  const handleCardClick = (id: number) => {
    // Si une autre vidéo joue, la mettre en pause
    if (playingId !== null && playingId !== id && videoRefs.current[playingId]) {
      videoRefs.current[playingId]?.pause();
    }
    setPlayingId(id);
  };

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
              {playingId === video.id ? (
                <video
                  ref={el => { videoRefs.current[video.id] = el; }}
                  src={video.videoUrl}
                  controls
                  autoPlay
                  muted
                  preload="metadata"
                  className="video__gallery__video"
                />
              ) : (
                <div
                  className="video__gallery__thumbs"
                  onClick={() => handleCardClick(video.id)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <img
                    src={video.position}
                    alt={video.title}
                    className={`video__gallery__position video__gallery__position--${video.id}`}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`video__gallery__thumbnail video__gallery__thumbnail--${video.id}`}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <h3>{video.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VideoGallery;
