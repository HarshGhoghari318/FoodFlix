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
  const [loading, setLoading] = useState(true);
  const [isPartner,setPartnerRole]=useState(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const viewerRef = useRef(null);

  const fetchPartner = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/auth/foodpartner/${id}`,
        { withCredentials: true }
      );

      setPartner(res.data.partner);
      setVideos(res.data.foodItems || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getPartnerMe = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/getpartnerFtoken/me",
        { withCredentials: true }
      );
      console.log(res)
      setPartnerRole(res.data.partner)
    } catch (err) {
      console.error(err);
      
    }
  }
  useEffect(() => {
    fetchPartner();
    
  }, [id]);
  useEffect(()=>{
    getPartnerMe();
  },[])

  useEffect(() => {
    if (!isViewerOpen) return;

    const vids = viewerRef.current?.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting ? entry.target.play() : entry.target.pause()
        );
      },
      { threshold: 0.7 }
    );

    vids?.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [isViewerOpen]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <main className="center">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  /* ================= NO DATA ================= */
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
          src="data:image/png;base64,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"
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

      {isPartner ?  <button
        className="create-reel-btn"
        onClick={() => navigate("/create-food")}
      >
        + Create Reel
      </button>: ""}
      {/* */}

      {/* REELS VIEWER */}
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
