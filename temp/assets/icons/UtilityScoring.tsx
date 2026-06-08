import React from "react";
import { cn } from "../../lib/utils";

interface UtilityScoringProps {
  className?: string;
}

export const UtilityScoring: React.FC<UtilityScoringProps> = ({
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
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        className={cn("size-[14px] text-inherit")}
      >
        <path
          d="M12.2 0.999939L4.5 8.65211L1 5.17385"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9992 3.78253L9.74922 8.99992L8.69922 7.95644"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
