import React from "react";
import { cn } from "../../lib/utils";

/** Green = low, Plum = medium, Coral = high */
export type UtilityTriangleInfoVariant = "low" | "medium" | "high";

const VARIANT_COLORS: Record<
  UtilityTriangleInfoVariant,
  { fill: string; stroke: string }
> = {
  low: { fill: "#50E7CA", stroke: "#1BC5A3" },
  medium: { fill: "#DCADD2", stroke: "#AA6A9B" },
  high: { fill: "#F0AA99", stroke: "#E67357" },
};

interface UtilityTriangleInfoProps {
  className?: string;
  /** Low (green), Medium (plum), High (coral) */
  variant?: UtilityTriangleInfoVariant;
}

export const UtilityTriangleInfo: React.FC<UtilityTriangleInfoProps> = ({
  className,
  variant = "low",
}) => {
  const { fill, stroke } = VARIANT_COLORS[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M7.78821 1.348C7.6827 1.16611 7.53127 1.01514 7.34906 0.910189C7.16685 0.80524 6.96027 0.75 6.75 0.75C6.53973 0.75 6.33315 0.80524 6.15094 0.910189C5.96873 1.01514 5.8173 1.16611 5.71179 1.348L0.910803 9.74972C0.805511 9.93209 0.750054 10.139 0.75 10.3495C0.749946 10.5601 0.805297 10.767 0.910495 10.9494C1.01569 11.1319 1.16703 11.2834 1.34932 11.3888C1.53161 11.4943 1.73843 11.5499 1.94902 11.5501H11.551C11.7616 11.5499 11.9684 11.4943 12.1507 11.3888C12.333 11.2834 12.4843 11.1319 12.5895 10.9494C12.6947 10.767 12.7501 10.5601 12.75 10.3495C12.7499 10.139 12.6945 9.93209 12.5892 9.74972L7.78821 1.348Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
