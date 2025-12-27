import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../style/profile.css";

function PartnerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [partner, setPartner] = useState(state?.partner || null);
  const [videos, setVideos] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const viewerRef = useRef(null);

  const fetchPartner = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/auth/foodpartner/${id}`
      );
      setPartner(res.data.partner);
      setVideos(res.data.foodItems);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPartner();
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return;

    const vids = viewerRef.current?.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting ? entry.target.play() : entry.target.pause();
        });
      },
      { threshold: 0.7 }
    );

    vids?.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [isViewerOpen]);

  if (!partner) {
    return (
      <main className="center">
        <p>Profile not available</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </main>
    );
  }

  return (
    <main className="profile-page">
      {/* HEADER */}
      <header className="profile-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>{partner.name}</h3>
      </header>

      {/* PROFILE INFO */}
      <section className="profile-info">
        <img
          src={'data:image/jpeg;base64,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'}
          alt={partner.name}
        />
        <div>
          <h2>{partner.name}</h2>
          <p>{partner.email}</p>
          <p>{partner.address}</p>
        </div>
      </section>

      {/* POSTS */}
      <section className="profile-posts">
        <h4>Reels</h4>

        {videos.length === 0 ? (
          <p>No reels yet</p>
        ) : (
          <div className="reels-grid">
            {videos.map((v, index) => (
              <div
                key={v._id}
                className="reel-thumb"
                onClick={() => {
                  setStartIndex(index);
                  setIsViewerOpen(true);
                }}
              >
                <video src={v.video} muted />
                <span className="reel-play">▶</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CREATE REEL BUTTON */}
      <button
        className="create-reel-btn"
        onClick={() =>
          navigate("/create-food")
        }
      >
        + Create Reel
      </button>

      {/* REELS VIEWER MODAL */}
      {isViewerOpen && (
        <div className="reels-modal">
          <button
            className="close-reels"
            onClick={() => setIsViewerOpen(false)}
          >
            ✕
          </button>

          <div
            ref={viewerRef}
            className="reels-scroll"
            style={{ transform: `translateY(-${startIndex * 100}vh)` }}
          >
            {videos.map((v) => (
              <div key={v._id} className="reel-full">
                <video src={v.video} loop muted playsInline />
                <div className="reel-caption">
                  <h5>{v.name}</h5>
                  <p>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default PartnerProfile;
