import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoWifiOff = (
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
    <path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7zm-4 4a9.8 9.8 0 0 0-4.49-2.56l3.53 3.53zM2 3.05 5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.7 9.7 0 0 0 5 13v.01L6.99 15a7.04 7.04 0 0 1 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79zM9 17l3 3 3-3a4.237 4.237 0 0 0-6 0" />
  </svg>
);
export default MonoWifiOff;
