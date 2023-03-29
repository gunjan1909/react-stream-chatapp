import { LinkProps, Link as RouterLink } from "react-router-dom";

export function Link({ children, className, ...restProps }: LinkProps) {
  return (
    <RouterLink
      className={`text-blue-500 underline underline-offset-2 ${className}`}
      {...restProps}
    >
      {children}
    </RouterLink>
  );
}
