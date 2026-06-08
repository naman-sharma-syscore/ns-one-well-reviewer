import React from "react";
import { cn } from "../../lib/utils";

interface UtilityEditProps {
  className?: string;
}

export const UtilityEdit: React.FC<UtilityEditProps> = ({ className }) => {
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
          d="M14.4221 4.36874C14.7922 3.99873 15.0001 3.49685 15.0002 2.97351C15.0003 2.45017 14.7924 1.94823 14.4224 1.57813C14.0524 1.20803 13.5505 1.00007 13.0272 1C12.5038 0.999934 12.0019 1.20777 11.6318 1.57778L2.28938 10.9223C2.12685 11.0843 2.00666 11.2839 1.93938 11.5033L1.01465 14.5498C0.996563 14.6103 0.995196 14.6746 1.0107 14.7359C1.0262 14.7971 1.058 14.853 1.10271 14.8977C1.14743 14.9423 1.20339 14.974 1.26467 14.9894C1.32595 15.0048 1.39025 15.0034 1.45076 14.9852L4.49793 14.0612C4.71716 13.9945 4.91666 13.875 5.07895 13.7133L14.4221 4.36874Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.1002 3.10034L12.9003 5.90041"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
