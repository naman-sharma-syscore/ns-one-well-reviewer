import React from "react";
import { cn } from "../../lib/utils";

interface UtilityCheckProps {
  className?: string;
}

export const UtilityCheck: React.FC<UtilityCheckProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="5"
        viewBox="0 0 7 5"
        fill="none"
      >
        <path
          d="M0.75 2.30556L2.30556 3.86111L5.41667 0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0.42, 0.19)"
        />
      </svg>
    </div>
  );
};
