import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

import { useMediaQuery } from "react-responsive";

import RightArrowBlue4Icon from "../assets/media/icons/arrow-right-blue-4.svg";

import RaiseCapitalImg from "../assets/media/features/raise-capital-faster.webp";
import ElevateInvestorImg from "../assets/media/features/elevate-investor-experience.webp";
import SimplifyManagementImg from "../assets/media/features/simplify-investment-management.webp";
import IntegratedAccountingImg from "../assets/media/features/integrated-accounting-services.webp";

const featuresData = [
  {
    title: (
      <>
        Raise capital <span>faster</span>
      </>
    ),
    description:
      "Raising capital has never been easier with Agora’s comprehensive fundraising tools to streamline the entire fundraising process and automate investor onboarding.",
    imgSrc: RaiseCapitalImg,
    btnText: "Read More",
    link: "#",
  },
  {
    title: (
      <>
        Elevate investor <span>experience</span>
      </>
    ),
    description:
      "Elevate your investors’ experience and simplify investor management. With Agora’s modern and intuitive Investor Portal, provide full transparency and easy access to essential information.",
    imgSrc: ElevateInvestorImg,
    btnText: "Read More",
    link: "#",
  },
  {
    title: (
      <>
        Simplify investment <span>management</span>
      </>
    ),
    description:
      "Simplify your investment management with one comprehensive tool that allows you to manage your active investments effortlessly and achieve operational efficiency.",
    imgSrc: SimplifyManagementImg,
    btnText: "Read More",
    link: "#",
  },
  {
    title: (
      <>
        Integrated accounting <span>features</span>
      </>
    ),
    description:
      "Streamline financial operations with Agora’s expert tax and bookkeeping features. Save time while cutting costs with our tech-driven approach and dedicated CPAs and bookkeepers.",
    imgSrc: IntegratedAccountingImg,
    btnText: "Read More",
    link: "#",
  },
];

const HoveredFeaturesList = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div className="features-list">
      {isSmallScreen ? (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {featuresData.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="feature-list-itm">
                <h6 className="feature-title urbanist-regular-30 text-neutral-6">
                  {feature.title}
                </h6>
                <div className="content-wrap">
                  <img
                    className="feature-thumbnail"
                    src={feature.imgSrc}
                    alt="Feature Name"
                  />

                  <div className="hovered-content">
                    <p className="feature-desc urbanist-regular-16 text-neutral-6">
                      {feature.description}
                    </p>

                    <a
                      href={feature.link}
                      className="agora-action-btn text-blue-4"
                    >
                      <span>{feature.btnText}</span>
                      <img
                        className="arrow-icon"
                        src={RightArrowBlue4Icon}
                        alt="→"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        featuresData.map((feature, index) => (
          <div key={index} className="feature-list-itm">
            <h6 className="feature-title urbanist-regular-30 text-neutral-6">
              {feature.title}
            </h6>
            <div className="content-wrap">
              <img
                className="feature-thumbnail"
                src={feature.imgSrc}
                alt="Feature Name"
              />

              <div className="hovered-content">
                <p className="feature-desc urbanist-regular-16 text-neutral-6">
                  {feature.description}
                </p>

                <a href={feature.link} className="agora-action-btn text-blue-4">
                  <span>{feature.btnText}</span>
                  <img
                    className="arrow-icon"
                    src={RightArrowBlue4Icon}
                    alt="→"
                  />
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HoveredFeaturesList;
