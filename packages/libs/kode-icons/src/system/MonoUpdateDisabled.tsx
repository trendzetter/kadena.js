import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoUpdateDisabled = (
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
    <path d="M8.67 5.84 7.22 4.39A8.86 8.86 0 0 1 12 3c2.74 0 5.19 1.23 6.84 3.16L21 4v6h-6l2.41-2.41C16.12 6.02 14.18 5 12 5c-1.2 0-2.34.31-3.33.84M13 7h-2v1.17l2 2zm6.78 15.61-3-3A8.97 8.97 0 0 1 12 21a9 9 0 0 1-9-9c0-1.76.51-3.4 1.39-4.78l-3-3L2.8 2.81l18.38 18.38zm-4.46-4.46L5.84 8.67A7.06 7.06 0 0 0 5 12c0 3.86 3.14 7 7 7 1.2 0 2.34-.31 3.32-.85M20.94 13h-2.02c-.12.83-.39 1.61-.77 2.32l1.47 1.47c.7-1.12 1.17-2.41 1.32-3.79" />
  </svg>
);
export default MonoUpdateDisabled;
