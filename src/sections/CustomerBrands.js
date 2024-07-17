import React from "react";

import CustomerBrandList from "../comps/CustomerBrandList";

const CustomerBrands = () => {
  return (
    <section className="customer-brands-section bg-blue">
      <div className="customer-brands-section-inner-wrapper container">
        <h6 className="urbanist-regular-24 text-center">
          Trusted by <strong>500+</strong> customers worldwide
        </h6>

        <CustomerBrandList />
      </div>
    </section>
  );
};

export default CustomerBrands;
