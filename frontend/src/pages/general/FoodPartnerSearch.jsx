import React, { useState, useEffect } from "react";
import "../../style/home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReelsBottomNav from "./BottomNav";
import API_URL from "../../config/api.js";

export default function FoodPartnerSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [partners, setPartners] = useState([]);

  const getSearches = async () => {
    const response = await axios.get(
      `${API_URL}/api/auth/foodpartner/search/${search}`,
      { withCredentials: true }
    );
    setPartners(response.data.partners);
  };

  useEffect(() => {
    if (search.length > 0) getSearches();
    else setPartners([]);
  }, [search]);

  return (
    <>
      <main className="home-page">
        <header className="home-header">
          <div className="header-row">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              ←
            </button>

            <h1 className="header-title">Find Food Partners</h1>
          </div>

          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <div className="search-input-wrap">
              <input
                className="search-input"
                type="search"
                placeholder="Search food partners by name, cuisine"
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit" className="search-btn">
                🔍
              </button>
            </div>
          </form>
        </header>

        <section className="partners-section">
          <div className="partners-grid" aria-live="polite">
            {partners.map((partner) => (
              <div key={partner._id} className="partner-card">
                <div className="partner-avatar" aria-hidden />
                <div className="partner-info">
                  <div className="partner-name">{partner.name}</div>
                  <div className="partner-meta">Admin</div>
                </div>
                <button className="partner-view-btn">
                  <Link to={`/profile/${partner._id}`}>View</Link>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReelsBottomNav />
    </>
  );
}
