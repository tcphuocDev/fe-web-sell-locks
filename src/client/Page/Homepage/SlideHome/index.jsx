import React from "react";
import BannerSlide from "../BannerSlide";
import "./style.scss";
import BannerIconHome from "../BannerIconHome.jsx";
function SlideHome() {
  return (
    <section className="banner-slide">
      <div className="banner-slide__content container">
        <BannerSlide />
        <BannerIconHome />
      </div>
    </section>
  );
}

export default SlideHome;
