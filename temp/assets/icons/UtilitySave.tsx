import React from "react";
import { cn } from "../../lib/utils";

interface UtilitySaveProps {
  className?: string;
}

export const UtilitySave: React.FC<UtilitySaveProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="16"
        viewBox="0 0 13 16"
        fill="none"
        className={cn("size-[14px] text-inherit")}
      >
        <path
          d="M11.75 14.75L6.25 11.6389L0.75 14.75V2.30556C0.75 1.893 0.915561 1.49733 1.21026 1.20561C1.50496 0.913888 1.90466 0.75 2.32143 0.75H10.1786C10.5953 0.75 10.995 0.913888 11.2897 1.20561C11.5844 1.49733 11.75 1.893 11.75 2.30556V14.75Z"
          fill="#F7F2F6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
