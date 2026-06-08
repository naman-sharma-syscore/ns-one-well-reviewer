import { cn } from "../../lib/utils";

export function UtilityRevisionsShow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-4 flex items-center justify-center text-gray-500",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="26"
        viewBox="0 0 30 26"
        fill="none"
        className={cn("text-inherit w-full h-full")}
      >
        <path
          d="M9.84194 11.5L1 20.5006V25.0009H14.2629L18.6839 20.5006"
          fill="#F6EFD0"
        />
        <path
          d="M9.84194 11.5L1 20.5006V25.0009H14.2629L18.6839 20.5006"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.9999 13.0008L22.2211 19.9013C21.6702 20.451 20.9295 20.7589 20.158 20.7589C19.3865 20.7589 18.6458 20.451 18.0949 19.9013L10.4319 12.1008C9.89184 11.5399 9.58936 10.7859 9.58936 10.0006C9.58936 9.21531 9.89184 8.4613 10.4319 7.90048L17.2107 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
