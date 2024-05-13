type Props = {
  className?: string;
};

export default function Star({ className }: Props) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.28797 12.415L5.54117 7.14129L0.274004 6.34946L5.54774 5.60266L6.33957 0.335493L7.08637 5.60923L12.3535 6.40106L7.0798 7.14786L6.28797 12.415Z"
        fill="currentColor"
      />
    </svg>
  );
}
