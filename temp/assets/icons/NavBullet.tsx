import React from "react";

interface NavBulletProps {
  color: string;
}

export const NavBullet: React.FC<NavBulletProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
    >
      <circle cx="4" cy="4.5" r="3.5" fill={color} stroke="#F3E7D8" />
    </svg>
  );
};
