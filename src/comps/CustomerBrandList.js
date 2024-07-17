import React from "react";

import Swissroc from "../assets/media/brand-logos/swissroc.webp";
import GreenLeaf from "../assets/media/brand-logos/greenleaf.webp";
import Electra from "../assets/media/brand-logos/electra.webp";
import SpruceS3 from "../assets/media/brand-logos/spruce-s3.webp";
import Reality from "../assets/media/brand-logos/reality.webp";
import FaroPoint from "../assets/media/brand-logos/faropoint.webp";
import EquityMultiple from "../assets/media/brand-logos/equity-multiple.webp";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import { useMediaQuery } from "react-responsive";

const BrandList = [
  {
    alterText: "Swissroc",
    imgSrc: Swissroc,
  },
  {
    alterText: "Green Leaf",
    imgSrc: GreenLeaf,
  },
  {
    alterText: "Electra",
    imgSrc: Electra,
  },
  {
    alterText: "Spruce S3",
    imgSrc: SpruceS3,
  },
  {
    alterText: "Reality",
    imgSrc: Reality,
  },
  {
    alterText: "Faro Point",
    imgSrc: FaroPoint,
  },
  {
    alterText: "Equity Multiple",
    imgSrc: EquityMultiple,
  },
];

const CustomerBrandList = () => {
  const isMediumScreen = useMediaQuery({ query: "(max-width: 991px)" });

  return (
    <div className="customer-brands-list">
      {isMediumScreen ? (
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          loop={true}
          spaceBetween={60}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {BrandList.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="brand-list-itm">
                <img
                  className="brand-logo"
                  src={brand.imgSrc}
                  alt={brand.alterText}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        BrandList.map((brand, index) => (
          <div key={index} className="brand-list-itm">
            <img
              className="brand-logo"
              src={brand.imgSrc}
              alt={brand.alterText}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerBrandList;
