import React from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface KeyFeaturesProps {
  features: Feature[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ features }) => (
  <div className="flex flex-col items-start gap-4 py-4">
    {features.map(({ icon, title, description }, index) => (
      <div key={index} className="flex items-center gap-8 p-2">
        <div>{icon}</div>
        <div className="flex flex-col">
          <h1 className="font-semibold">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default KeyFeatures;
