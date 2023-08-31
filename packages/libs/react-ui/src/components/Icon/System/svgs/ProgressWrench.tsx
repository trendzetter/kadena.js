import * as React from 'react';
import { type SVGProps } from 'react';

const ProgressWrench: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>,
) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="currentColor"
      d="M13 2.03V2.05V4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.03ZM11 2.06C9.04999 2.25 7.18999 3 5.66999 4.26L7.09999 5.74C8.21999 4.84 9.56999 4.26 11 4.06V2.06ZM4.25999 5.67C2.99999 7.19 2.24999 9.04 2.04999 11H4.04999C4.23999 9.58 4.79999 8.23 5.68999 7.1L4.25999 5.67ZM2.05999 13C2.25999 14.96 3.02999 16.81 4.26999 18.33L5.68999 16.9C4.80999 15.77 4.23999 14.42 4.05999 13H2.05999ZM7.09999 18.37L5.66999 19.74C7.17999 21 9.03999 21.79 11 22V20C9.57999 19.82 8.22999 19.25 7.09999 18.37ZM16.82 15.19L12.71 11.08C13.12 10.04 12.89 8.82 12.03 7.97C11.13 7.06 9.77999 6.88 8.68999 7.38L10.63 9.32L9.27999 10.68L7.28999 8.73C6.74999 9.82 6.99999 11.17 7.87999 12.08C8.73999 12.94 9.95999 13.16 11 12.76L15.11 16.86C15.29 17.05 15.56 17.05 15.74 16.86L16.78 15.83C17 15.65 17 15.33 16.82 15.19Z"
    />
  </svg>
);

export { ProgressWrench };
