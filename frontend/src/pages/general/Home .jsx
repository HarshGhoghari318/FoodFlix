import React, { useEffect, useRef, useState } from 'react';
import '../../style/reels.css';
import axios from 'axios';

export default function Home() {
  const feedRef = useRef(null);
  const videoRefs = useRef(new Map());
  const currentPlaying = useRef(null);
  const [videos, setVideos] = useState([]);

  // ✅ Fetch data
  const GetData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/food/getfoods",
        { withCredentials: true }
      );
      console.log("Backend response:", response);
      setVideos(response.data.foods);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

 
  useEffect(() => {
    GetData();
    console.log("Videos fetched:", videos);
  }, []);

  // ✅ useEffect #2 → IntersectionObserver
  useEffect(() => {
    if (!videos.length) return;

    const options = { threshold: [0.25, 0.5, 0.75, 1] };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(Boolean)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      let toPlay = null;
      if (visible.length && visible[0].intersectionRatio >= 0.6) {
        toPlay = visible[0].target;
      }

      videoRefs.current.forEach((video) => {
        if (video === toPlay) {
          if (currentPlaying.current !== video) {
            currentPlaying.current = video;
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    }, options);

    const container = feedRef.current;
    const vids = container?.querySelectorAll('video.reel-video') ?? [];

    vids.forEach((v, i) => {
      videoRefs.current.set(i, v);
      observer.observe(v);
    });

    return () => {
      observer.disconnect();
      videoRefs.current.clear();
    };
  }, [videos]);

  return (
    <main className="reels-page">
      <section className="reels-feed" ref={feedRef}>
        {videos.map((item, idx) => (
          <article key={idx} className="reel">
            <video
              className="reel-video"
              src={item.video}
              muted
              loop
              playsInline
            />

            <div className="reel-overlay">
              <h3>Reel #{idx + 1}</h3>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
