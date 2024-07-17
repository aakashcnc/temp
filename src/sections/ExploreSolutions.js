// ExploreProducts Section

import React from "react";
import TabinationSlider from "../comps/TabinationSlider";

// Platform Images
import CRMImg from "../assets/media/platforms/platform-crm.webp";
import InvestorPortalIcon from "../assets/media/custom-icons/investor-portal-icon.webp";
import FundraisingIcon from "../assets/media/custom-icons/fundraising-icon.webp";
import CRMIcon from "../assets/media/custom-icons/crm-icon.webp";
import InvestmentManagementIcon from "../assets/media/custom-icons/investment-management-icon.webp";
import InvestorReportingIcon from "../assets/media/custom-icons/investor-reporting-icon.webp";
import DocumentManagementIcon from "../assets/media/custom-icons/document-management-icon.webp";
import PaymentsIcon from "../assets/media/custom-icons/payments-icon.webp";

const tabData = [
  {
    tabIcon: FundraisingIcon,
    title: "Fundraising",
    description: "Fundraising Description will be placed here",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
  {
    tabIcon: InvestorPortalIcon,
    title: "Investor Portal",
    description: "Investor Portal Description will be placed here",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
  {
    tabIcon: CRMIcon,
    title: "CRM",
    description:
      "Streamline your fundraising process from initial marketing to contribution.",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
  {
    tabIcon: InvestmentManagementIcon,
    title: "Investment management",
    description: "Investment management Description will be placed here",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
  {
    tabIcon: InvestorReportingIcon,
    title: "Investor reporting",
    description: "Investor reporting Description will be placed here",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
  {
    tabIcon: DocumentManagementIcon,
    title: "Document management",
    description: "Document management Description will be placed here",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
  {
    tabIcon: PaymentsIcon,
    title: "Payments",
    description: "Payments Description will be placed here",
    imgSrc: CRMImg,
    btnText: "Learn more",
    link: "#",
  },
];

const ExploreSolutions = () => {
  return (
    <section className="explore-product-section">
      <div className="explore-product-section-inner-wrapper container">
        <div className="heading-area">
          <h6>Explore</h6>
          <h1>
            Our <strong>solutions</strong>
          </h1>
       </div>

        <TabinationSlider tabData={tabData} />
      </div>
    </section>
  );
};

export default ExploreSolutions;
