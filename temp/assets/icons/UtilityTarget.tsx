export function UtilityTarget({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} {...props}>
      <path
        d="M20.75 10.75C20.75 16.2728 16.2728 20.75 10.75 20.75C5.22715 20.75 0.75 16.2728 0.75 10.75C0.75 5.22715 5.22715 0.75 10.75 0.75C16.2728 0.75 20.75 5.22715 20.75 10.75Z"
        stroke="#CBCDD2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 10.75C15.75 13.5114 13.5114 15.75 10.75 15.75C7.98858 15.75 5.75 13.5114 5.75 10.75C5.75 7.98858 7.98858 5.75 10.75 5.75C13.5114 5.75 15.75 7.98858 15.75 10.75Z"
        fill="#D6F4FB"
        stroke="#CBCDD2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
