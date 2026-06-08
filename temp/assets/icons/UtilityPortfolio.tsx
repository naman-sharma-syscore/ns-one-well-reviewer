import React from "react";
import { cn } from "../../lib/utils";

interface UtilityPortfolioProps {
  className?: string;
}

export const UtilityPortfolio: React.FC<UtilityPortfolioProps> = ({
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
          d="M3.80005 14.9998V2.39982C3.80005 2.02851 3.94755 1.67242 4.2101 1.40987C4.47265 1.14732 4.82875 0.999817 5.20005 0.999817H10.8C11.1714 0.999817 11.5274 1.14732 11.79 1.40987C12.0525 1.67242 12.2 2.02851 12.2 2.39982V14.9998H3.80005Z"
          fill="white"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.8 7.99982H2.4C2.0287 7.99982 1.6726 8.14732 1.41005 8.40987C1.1475 8.67242 1 9.02851 1 9.39982V13.5998C1 13.9711 1.1475 14.3272 1.41005 14.5898C1.6726 14.8523 2.0287 14.9998 2.4 14.9998H3.8"
          fill="#D6F4FB"
        />
        <path
          d="M3.8 7.99982H2.4C2.0287 7.99982 1.6726 8.14732 1.41005 8.40987C1.1475 8.67242 1 9.02851 1 9.39982V13.5998C1 13.9711 1.1475 14.3272 1.41005 14.5898C1.6726 14.8523 2.0287 14.9998 2.4 14.9998H3.8"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2 5.89981H13.6C13.9713 5.89981 14.3273 6.04731 14.5899 6.30986C14.8525 6.57241 15 6.92851 15 7.29981V13.5998C15 13.9711 14.8525 14.3272 14.5899 14.5898C14.3273 14.8523 13.9713 14.9998 13.6 14.9998H12.2"
          fill="#D6F4FB"
        />
        <path
          d="M12.2 5.89981H13.6C13.9713 5.89981 14.3273 6.04731 14.5899 6.30986C14.8525 6.57241 15 6.92851 15 7.29981V13.5998C15 13.9711 14.8525 14.3272 14.5899 14.5898C14.3273 14.8523 13.9713 14.9998 13.6 14.9998H12.2"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.59998 3.7998H9.39998"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.59998 6.59982H9.39998"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.59998 9.39981H9.39998"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.59998 12.1998H9.39998"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
