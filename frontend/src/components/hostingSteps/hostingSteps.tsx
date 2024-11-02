import React from "react";

interface stepProps {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl: string;
}

const HostingSteps: React.FC<stepProps> = ({
  stepNumber,
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="flex pt-6 md:pb-10 gap-2">
      <div className="font-bold">{stepNumber}</div>{" "}
      <div className=" flex flex-col">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-gray-600">{description} </p>
      </div>
      <div className="flex items-center">
        <img height={"112px"} width={"112px"} src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default HostingSteps;
