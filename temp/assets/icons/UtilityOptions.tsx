import React from "react";
import { cn } from "../../lib/utils";

interface UtilityOptionsProps {
  className?: string;
  color?: string;
}

export const UtilityOptions: React.FC<UtilityOptionsProps> = ({
  className = "",
  color = "#71747D",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="16"
      viewBox="0 0 4 16"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M2 8.875C2.55228 8.875 3 8.48325 3 8C3 7.51675 2.55228 7.125 2 7.125C1.44772 7.125 1 7.51675 1 8C1 8.48325 1.44772 8.875 2 8.875Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2.75C2.55228 2.75 3 2.35825 3 1.875C3 1.39175 2.55228 1 2 1C1.44772 1 1 1.39175 1 1.875C1 2.35825 1.44772 2.75 2 2.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 15C2.55228 15 3 14.6082 3 14.125C3 13.6418 2.55228 13.25 2 13.25C1.44772 13.25 1 13.6418 1 14.125C1 14.6082 1.44772 15 2 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
