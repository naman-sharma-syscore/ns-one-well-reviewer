import React from "react";
import { cn } from "../../lib/utils";

interface UtilitySortProps {
  color?: string;
  className?: string;
}

export const UtilitySort: React.FC<UtilitySortProps> = ({
  color = "#71747D",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M15.0001 10L11.8889 13L8.77783 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8887 13V2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 4L4.11111 1L7.22222 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.11133 1V12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
