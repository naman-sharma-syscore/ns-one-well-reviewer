import React from "react";
import { cn } from "../../lib/utils";

interface NavAccountProps {
  className?: string;
}

export const NavAccount: React.FC<NavAccountProps> = ({ className = "" }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition-colors duration-300 text-bronze-500",
        className,
      )}
    >
      <path
        d="M16.0001 14.5C18.2093 14.5 20.0001 12.7091 20.0001 10.5C20.0001 8.29086 18.2093 6.5 16.0001 6.5C13.791 6.5 12.0001 8.29086 12.0001 10.5C12.0001 12.7091 13.791 14.5 16.0001 14.5Z"
        fill="currentColor"
      />
      <path
        d="M6.90759 23.3314C8.48801 19.8899 11.9649 17.5 16 17.5C20.0351 17.5 23.5121 19.89 25.0924 23.3316C22.8919 25.8841 19.6347 27.5 16.0001 27.5C12.3654 27.5 9.10818 25.8841 6.90759 23.3314Z"
        fill="currentColor"
      />
    </svg>
  );
};
