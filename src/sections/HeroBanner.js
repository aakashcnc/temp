import React from "react";
import HoveredFeaturesList from "../comps/HoveredFeaturesList";

import RightArrowWhiteIcon from "../assets/media/icons/arrow-right-white.svg";

const HeroBanner = () => {
  return (
    <section className="hero-section custom-spacing">
      <div className="hero-section-inner-wrapper container">
        <div className="hero-content">
          <h1>
            Real estate investment,<br/>real growth, <strong>real easy.</strong>
          </h1>
          <p className="hero-banner-desc">The best real estate investment management experience starts with Agora.</p>

          <div className="btn-group">
            <a href="#" className="agora-btn btn-filled">
              <span>Book a demo</span>
              <img className="arrow-icon" src={RightArrowWhiteIcon} alt="→" />
            </a>
            <a className="agora-btn">See pricing</a>
          </div>
        </div>

        {/* Features List Section */}
        <HoveredFeaturesList />
      </div>
    </section>
  );
};

export default HeroBanner;
