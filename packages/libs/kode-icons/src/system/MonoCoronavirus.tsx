import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoCoronavirus = (
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
    <path d="M21.25 10.5c-.41 0-.75.34-.75.75h-1.54a7 7 0 0 0-1.52-3.65l1.09-1.09.01.01c.29.29.77.29 1.06 0s.29-.77 0-1.06L18.54 4.4a.754.754 0 0 0-1.06 0c-.29.29-.29.76-.01 1.05l-1.09 1.09a7 7 0 0 0-3.64-1.51V3.5h.01c.41 0 .75-.34.75-.75S13.16 2 12.75 2h-1.5c-.41 0-.75.34-.75.75s.33.74.74.75v1.55c-1.37.14-2.62.69-3.64 1.51L6.51 5.47l.01-.01c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0L4.4 5.46c-.29.29-.29.77 0 1.06s.76.29 1.05.01l1.09 1.09a6.9 6.9 0 0 0-1.5 3.63H3.5c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.5c0 .41.34.75.75.75s.75-.34.75-.75h1.54c.15 1.37.69 2.61 1.5 3.63l-1.09 1.09a.74.74 0 0 0-1.05.01c-.29.29-.29.77 0 1.06l1.06 1.06c.29.29.77.29 1.06 0s.29-.77 0-1.06l-.01-.01 1.09-1.09c1.02.82 2.26 1.36 3.63 1.51v1.55c-.41.01-.74.34-.74.75s.34.75.75.75h1.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-.01v-1.54c1.37-.14 2.62-.69 3.64-1.51l1.09 1.09c-.29.29-.28.76.01 1.05s.77.29 1.06 0l1.06-1.06c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.01.01-1.09-1.09a7.03 7.03 0 0 0 1.52-3.65h1.54c0 .41.34.75.75.75s.75-.34.75-.75v-1.5c.01-.4-.33-.74-.74-.74M13.75 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M12 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-1.75-5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M8.5 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m1.75 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m3.5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m.75-4c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1" />
  </svg>
);
export default MonoCoronavirus;
