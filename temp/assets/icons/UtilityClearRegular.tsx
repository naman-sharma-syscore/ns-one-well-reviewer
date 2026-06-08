import React from "react";
import { cn } from "../../lib/utils";

interface UtilityClearRegularProps {
  className?: string;
}

export const UtilityClearRegular: React.FC<UtilityClearRegularProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className={cn("size-[14px] text-inherit")}
      >
        <path
          d="M6.65039 12.65L0.650391 6.65L6.65039 0.65"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6504 6.65H0.650391"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
