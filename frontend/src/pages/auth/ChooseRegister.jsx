import React from "react";
import { Link } from "react-router-dom";
import "../../style/auth-shared.css";

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card auth-card--choice">
        <header className="choice-header">
          <h1 className="auth-title">FoodFlix 🍔🎥</h1>
          <p className="auth-subtitle">
            Choose how you want to use the platform
          </p>
        </header>

        <div className="choice-grid">
          <Link to="/user/register" className="choice-box">
            <div className="choice-icon">👤</div>
            <h3>Food Lover</h3>
            <p>
              Watch food reels, discover dishes, follow partners & order food
            </p>
            <span className="choice-action">Continue →</span>
          </Link>

          <Link
            to="/food-partner/register"
            className="choice-box secondary"
          >
            <div className="choice-icon">🏪</div>
            <h3>Food Partner</h3>
            <p>
              Upload food reels, showcase menu items & grow your business
            </p>
            <span className="choice-action">Continue →</span>
          </Link>
        </div>

        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
