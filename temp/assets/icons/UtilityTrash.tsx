import React from "react";
import { cn } from "../../lib/utils";

interface UtilityTrashProps {
  className?: string;
}

export const UtilityTrash: React.FC<UtilityTrashProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className,
      )}
    >
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("size-[14px] text-inherit")}
      >
        <path
          d="M11.9504 3.5498V13.3498C11.9504 13.7211 11.8029 14.0772 11.5403 14.3398C11.2778 14.6023 10.9217 14.7498 10.5504 14.7498H3.55039C3.17909 14.7498 2.82299 14.6023 2.56044 14.3398C2.29789 14.0772 2.15039 13.7211 2.15039 13.3498V3.5498"
          fill="white"
        />
        <path
          d="M11.9504 3.5498V13.3498C11.9504 13.7211 11.8029 14.0772 11.5403 14.3398C11.2778 14.6023 10.9217 14.7498 10.5504 14.7498H3.55039C3.17909 14.7498 2.82299 14.6023 2.56044 14.3398C2.29789 14.0772 2.15039 13.7211 2.15039 13.3498V3.5498"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.75 3.5498H13.35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.25 3.55V2.15C4.25 1.7787 4.3975 1.4226 4.66005 1.16005C4.9226 0.8975 5.2787 0.75 5.65 0.75H8.45C8.8213 0.75 9.1774 0.8975 9.43995 1.16005C9.7025 1.4226 9.85 1.7787 9.85 2.15V3.55"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
