import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoWifiTetheringOff = (
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
    <path d="M2.81 2.81 1.39 4.22l2.69 2.69A9.96 9.96 0 0 0 2 13c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42a7.96 7.96 0 0 1-.84-10.31l1.43 1.43a6 6 0 0 0 .82 7.47l1.42-1.42A3.93 3.93 0 0 1 8 13c0-.63.15-1.23.41-1.76l1.61 1.61c0 .05-.02.1-.02.15 0 .55.23 1.05.59 1.41s.86.59 1.41.59c.05 0 .1-.01.16-.02l7.62 7.62 1.41-1.41zM17.7 14.87c.19-.59.3-1.22.3-1.87 0-3.31-2.69-6-6-6-.65 0-1.28.1-1.87.3l1.71 1.71C11.89 9 11.95 9 12 9c2.21 0 4 1.79 4 4 0 .05 0 .11-.01.16zM12 5c4.42 0 8 3.58 8 8 0 1.22-.27 2.37-.77 3.4l1.49 1.49A9.95 9.95 0 0 0 22 13c0-5.52-4.48-10-10-10-1.78 0-3.44.46-4.89 1.28l1.48 1.48C9.63 5.27 10.78 5 12 5" />
  </svg>
);
export default MonoWifiTetheringOff;
