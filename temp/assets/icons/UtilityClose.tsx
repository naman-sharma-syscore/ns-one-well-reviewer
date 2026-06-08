import React from "react";
import { cn } from "../../lib/utils";

interface UtilityCloseProps {
  className?: string;
}

export const UtilityClose: React.FC<UtilityCloseProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500 ",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={cn("size-3 text-inherit")}
      >
        <path
          d="M10.8002 1.19995L1.2002 10.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.2002 1.19995L10.8002 10.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
