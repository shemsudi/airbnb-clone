import React from "react";

interface HostInfoProps {
  photoUrl?: string;
  hostName: string;
  hostingDuration: string; // e.g., "9 years hosting"
}

const HostInfo: React.FC<HostInfoProps> = ({
  photoUrl,
  hostName,
  hostingDuration,
}) => (
  <div className="flex gap-5 py-4 items-center">
    <img
      src={photoUrl}
      alt={`Profile of ${hostName}`}
      className="h-10 w-10 object-cover rounded-full"
    />
    <div className="flex flex-col gap-0">
      <h2 className="font-semibold">Hosted by {hostName}</h2>
      <p className="text-gray-600">{hostingDuration}</p>
    </div>
  </div>
);

export default HostInfo;
