import React, { useEffect, useRef } from 'react';

const VimeoPlayer = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      const iframe = playerRef.current.querySelector('iframe');
      iframe.src = `https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`;
    }
  }, [videoId]);

  return (
    <div ref={playerRef} style={{padding:'50.33% 0 0 0', position:'relative'}}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
        title="Vimeo video player"
      ></iframe>
    </div>
  );
};

export default VimeoPlayer;