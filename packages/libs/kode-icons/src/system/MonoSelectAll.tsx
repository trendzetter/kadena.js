import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoSelectAll = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-style="mono"
    viewBox="0 0 24 24"
    fontSize="1.5em"
    fill="currentColor"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 5h2V3c-1.1 0-2 .9-2 2m0 8h2v-2H3zm4 8h2v-2H7zM3 9h2V7H3zm10-6h-2v2h2zm6 0v2h2c0-1.1-.9-2-2-2M5 21v-2H3c0 1.1.9 2 2 2m-2-4h2v-2H3zM9 3H7v2h2zm2 18h2v-2h-2zm8-8h2v-2h-2zm0 8c1.1 0 2-.9 2-2h-2zm0-12h2V7h-2zm0 8h2v-2h-2zm-4 4h2v-2h-2zm0-16h2V3h-2zM7 17h10V7H7zm2-8h6v6H9z" />
  </svg>
);
export default MonoSelectAll;
