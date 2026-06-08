import { cn } from "../../lib/utils";

export function UtilityRevisionsHide({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
        className={cn("text-inherit w-full h-full")}
      >
        <path
          d="M5.48682 6.27734L0.75 11.0142V13.3826H7.85523L10.2236 11.0142"
          fill="#F6EFD0"
        />
        <path
          d="M5.48682 6.27734L0.75 11.0142V13.3826H7.85523L10.2236 11.0142"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.7502 7.06576L12.1187 10.6973C11.8235 10.9866 11.4267 11.1487 11.0134 11.1487C10.6001 11.1487 10.2033 10.9866 9.90816 10.6973L5.80291 6.59208C5.51361 6.29693 5.35156 5.90011 5.35156 5.48682C5.35156 5.07353 5.51361 4.67671 5.80291 4.38156L9.43448 0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 3.72266L15.72 0.752693"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 0.75L15.72 3.71996"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
