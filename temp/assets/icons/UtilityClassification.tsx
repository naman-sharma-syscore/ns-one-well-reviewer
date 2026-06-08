import React from "react";
import { cn } from "../../lib/utils";

interface UtilityClassificationProps {
  className?: string;
}

export const UtilityClassification: React.FC<UtilityClassificationProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={cn("size-[14px] text-inherit")}
      >
        <path
          d="M8.412 1.4103C8.14945 1.14767 7.79333 1.00008 7.42196 1H2.40034C2.02895 1 1.67277 1.14754 1.41015 1.41015C1.14754 1.67277 1 2.02895 1 2.40034V7.42196C1.00008 7.79333 1.14767 8.14945 1.4103 8.412L7.50458 14.5063C7.82282 14.8225 8.25324 15 8.70187 15C9.15051 15 9.58093 14.8225 9.89917 14.5063L14.5063 9.89917C14.8225 9.58093 15 9.15051 15 8.70187C15 8.25324 14.8225 7.82282 14.5063 7.50458L8.412 1.4103Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.85106 5.20017C5.04441 5.20017 5.20115 5.04343 5.20115 4.85009C5.20115 4.65674 5.04441 4.5 4.85106 4.5C4.65772 4.5 4.50098 4.65674 4.50098 4.85009C4.50098 5.04343 4.65772 5.20017 4.85106 5.20017Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
