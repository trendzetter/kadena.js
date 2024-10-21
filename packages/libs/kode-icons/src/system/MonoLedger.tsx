import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoLedger = (
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
    <path d="M8 15c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m7.07-10.31L16.5 6.1l-1.43 1.4-1.41-1.4zM17.9 7.5l1.41 1.43-1.41 1.41-1.4-1.41zM8 13c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3m1.77-8.67.73.75 3.79-3.79c.18-.18.43-.29.71-.29s.53.11.71.29l7.07 7.07v.01a1.02 1.02 0 0 1-.12 1.39l-3.73 3.74.74.73-6.72 6.72A6.98 6.98 0 0 1 8 23c-3.87 0-7-3.13-7-7 0-1.93.78-3.68 2.05-4.95zM20.59 9 15 3.41 11.93 6.5l5.57 5.58z" />
  </svg>
);
export default MonoLedger;
