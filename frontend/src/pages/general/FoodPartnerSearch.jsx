import React from "react";
import "../../style/home.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FoodPartnerSearch() {

   const [search , setSearch] = useState("");
   const [partners , setPartners] = useState([]);
   

    const getSearches = async () => {
      const response = await axios.get(`http://localhost:3000/api/auth/foodpartner/search/${search}`,{
        withCredentials:true
      });
      
      setPartners(response.data.partners);
    }
 useEffect(() => {
  if (search.length > 0) {
    getSearches();
  } else {
    setPartners([]); // clear results when input is empty
  }
}, [search]);





  return (
    <main className="home-page">
      <header className="home-header">
        <h1>Find Food Partners</h1>

        
        <form className="search-form" role="search" aria-label="Search food partners" onSubmit={(e) => e.preventDefault()}>
          {/* <label htmlFor="partner-search" className="visually-hidden">Search food partners</label> */}

          <div className="search-input-wrap">
            <input
              id="partner-search"
              className="search-input"
              onChange={(e)=>setSearch(e.target.value)}
              type="search"
              placeholder="Search food partners by name, cuisine, or location"
              aria-label="Search food partners"
            />

            <button type="submit" className="search-btn" aria-label="Search">
             
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

         
        </form>
      </header>

      <section className="partners-section">
        <div className="partners-grid" aria-live="polite">
          
          {
            partners.length > 0 && partners.map((partner,key)=>(<div key={partner._id} className="partner-card">
            <div className="partner-avatar" aria-hidden ></div>
            <div className="partner-info">
              <div className="partner-name">{partner.name}</div>
              <div className="partner-meta">Admin</div>
            </div>
            <button onClick={(e)=>e.stopPropagation} className="partner-view-btn"><Link to={`/profile/${partner._id}`}>View</Link></button>
          </div>))
          }
          

        </div>
      </section>
    </main>
  );
}
