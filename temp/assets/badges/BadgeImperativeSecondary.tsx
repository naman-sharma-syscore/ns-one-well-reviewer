import { cn } from "@/lib/utils";

export const BadgeImperativeSecondary = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("size-6 flex items-center justify-center", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
      >
        <path
          d="M19.2133 7.81921C19.2133 6.38498 18.4454 5.06051 17.2008 4.3479L11.5941 1.13788C10.3629 0.432974 8.85042 0.432974 7.61921 1.13788L2.01255 4.3479C0.767878 5.06051 0 6.38498 0 7.81921V14.1808C0 15.615 0.767878 16.9395 2.01255 17.6521L7.61921 20.8621C8.85042 21.567 10.3629 21.567 11.5941 20.8621L17.2008 17.6521C18.4454 16.9395 19.2133 15.615 19.2133 14.1808V7.81921Z"
          fill="#128BA6"
          fillOpacity="0.08"
        />
        <path
          d="M7.86719 1.57227C8.9445 0.955469 10.2684 0.955469 11.3457 1.57227L16.9521 4.78223C18.0412 5.40577 18.7129 6.56439 18.7129 7.81934V14.1807C18.7129 15.4356 18.0412 16.5942 16.9521 17.2178L11.3457 20.4277C10.2684 21.0445 8.9445 21.0445 7.86719 20.4277L2.26074 17.2178C1.17187 16.5942 0.5 15.4355 0.5 14.1807V7.81934C0.5 6.56452 1.17187 5.40582 2.26074 4.78223L7.86719 1.57227Z"
          stroke="#128BA6"
          strokeOpacity="0.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.68994 5.5V16.5023"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4542 8.25055L4.92627 13.7517"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.92627 8.25055L14.4542 13.7517"
          stroke="#0F748A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
