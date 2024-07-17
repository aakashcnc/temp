// Common TabinationSlider

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Controller, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Icons
import RightArrowOrangeIcon from "../assets/media/icons/arrow-right-orange.svg";

const TabinationSlider = ({ tabData }) => {
  // Receive tabData from the page as a prop
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDelayedActive, setIsDelayedActive] = useState(false);

  const screenWidth = window.innerWidth;

  // Function to convert a title string to a slug for the tab target (Href) and the id in the content list
  // I'm keeping this script as it could be used if the tabination is handled with custom script as I've used swiperjs right now
  const toSlug = (str) => {
    return str
      .toLowerCase() // Convert to lowercase
      .replace(/ /g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ""); // Remove all non-word characters
  };

  // Update active index on slide change
  const handleSlideChange = () => {
    if (mainSwiper) {
      setActiveIndex(mainSwiper.activeIndex);
    }
  };

  useEffect(() => {
    if (mainSwiper) {
      mainSwiper.on("slideChange", handleSlideChange);
    }
  }, [mainSwiper]);

  // Handle delayed activation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayedActive(true);
    }, 500); // 0.5 second delay

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tabination-slider">
      {screenWidth > 767 && (
        <div className="tabs-wrap">
          <ul className="nav-tab-listing">
            {tabData.map((tab, index) => (
              <li
                key={index}
                className={`nav-tab-itm ${
                  isDelayedActive && activeIndex === index ? "active" : ""
                }`}
              >
                <a
                  href={`#${toSlug(tab.title)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    mainSwiper.slideTo(index);
                  }}
                >
                  <img
                    src={tab.tabIcon}
                    className="tab-icon"
                    alt={tab.title + " icon"}
                  />
                  {tab.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="content-wrap">
        <div className="swiper-container main-slider">
          <Swiper
            modules={[Autoplay, Pagination, Controller, EffectFade]}
            pagination={{ clickable: true }}
            onSwiper={setMainSwiper}
            effect="fade"
            autoplay={{
              delay: 15000, // For now have added 15s (In wiz example it is nearly 20s), if you change the value here, change the value of transition in the _tabination-slider.scss file as well
              disableOnInteraction: false,
            }}
            loop={screenWidth < 768 ? true : false}
          >
            {tabData.map((tab, index) => (
              <SwiperSlide key={index}>
                <div id={`${toSlug(tab.title)}`} className="tab-content">
                  <h6 className="content-title">{tab.title}</h6>
                  <img
                    src={tab.imgSrc}
                    className="content-img"
                    alt={tab.title}
                  />
                  <p className="content-desc">{tab.description}</p>
                  <a href={tab.link} className="agora-action-btn text-orange">
                    <span>{tab.btnText}</span>
                    <img
                      className="arrow-icon"
                      src={RightArrowOrangeIcon}
                      alt="→"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TabinationSlider;
