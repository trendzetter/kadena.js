import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoRsvp = (
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
    <path d="M16 9h1.5l-1.75 6h-1.5L12.5 9H14l1 3.43zM5.1 12.9 6 15H4.5l-.85-2H2.5v2H1V9h3.5c.85 0 1.5.65 1.5 1.5v1c0 .6-.4 1.15-.9 1.4m-.6-2.4h-2v1h2zm17 2.5h-2v2H18V9h3.5c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5m0-2.5h-2v1h2zM11.5 9v1.5h-3v.75h2c.55 0 1 .45 1 1V14c0 .55-.45 1-1 1H7v-1.5h3v-.75H7.75c-.41 0-.75-.34-.75-.75v-2c0-.55.45-1 1-1z" />
  </svg>
);
export default MonoRsvp;
