import { cn } from "@/lib/utils";

export function UtilityText({ className }: { className?: string }) {
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
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        className={cn("text-inherit w-full h-full")}
      >
        <path
          d="M8.75 12.75H0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.75 0.75H0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.75 6.75H0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
