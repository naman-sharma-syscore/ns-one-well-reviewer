import React from "react";
import { cn } from "../../lib/utils";

interface UtilityResetProps {
  className?: string;
}

export const UtilityReset: React.FC<UtilityResetProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className
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
          d="M14.75 7.75C14.75 9.13447 14.3395 10.4878 13.5703 11.639C12.8011 12.7901 11.7079 13.6873 10.4288 14.2172C9.1497 14.747 7.74224 14.8856 6.38437 14.6155C5.0265 14.3454 3.77922 13.6787 2.80026 12.6997C1.82129 11.7208 1.1546 10.4735 0.884506 9.11563C0.61441 7.75776 0.753033 6.3503 1.28285 5.07122C1.81266 3.79213 2.70987 2.69888 3.86101 1.92971C5.01215 1.16054 6.36553 0.75 7.75 0.75C9.71 0.75 11.5844 1.52778 12.9922 2.88111L14.75 4.63889"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.7502 0.75V4.63889H10.8613"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
