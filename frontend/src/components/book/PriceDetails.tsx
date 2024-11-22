import React from "react";

const PriceDetails: React.FC = () => (
  <div className="flex flex-col gap-4">
    <h1 className="font-medium text-2xl">Price details</h1>
    <div className="flex justify-between items-center">
      <div className="font-medium">$ 324.00 * 5 nights </div>
      <div>$ 1620.00</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="underline font-meidum">Cleaning fee</div>
      <div>$12.00</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="underline font-meidum">Airbnb service fee</div>
      <div>$249.02</div>
    </div>
    <hr />
    <div className="flex justify-between items-center">
      <div className="font-medium text-xl ">Total(EUR)</div>
      <div className="font-medium">$ 1881.02</div>
    </div>
  </div>
);

export default PriceDetails;
