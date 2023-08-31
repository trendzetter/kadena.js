import * as React from 'react';
import { type SVGProps } from 'react';

const Syntax: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>,
) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1080_2285)">
      <path
        d="M349.07,225.81H334.7l-32.72-81a30.64,30.64,0,0,0-16.16-16.19L318,56.48c3.93-8.83,0-16-8.88-16h-228c-8.83,0-19.19,7.17-23.12,16L21.52,138.31c-3.94,8.83,0,16,8.87,16h15L78,235.16a30.6,30.6,0,0,0,15.76,16L61.52,323.64c-3.94,8.83,0,16,8.87,16h228c8.84,0,19.19-7.17,23.13-16L358,241.81C361.88,233,357.91,225.81,349.07,225.81Z"
        fill="white"
      />
      <g style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M31.4095 35.7516H7.40947C6.48 35.7516 6.06105 34.9968 6.47579 34.0674L10.3158 25.4537C10.7295 24.5242 11.8189 23.7695 12.7495 23.7695H36.7495C37.68 23.7695 38.0979 24.5242 37.6842 25.4537L33.8495 34.0674C33.4295 34.9968 32.34 35.7516 31.4095 35.7516Z"
          fill="#66CC33"
        />
      </g>
      <g style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M27.199 16.2432H3.19896C2.26949 16.2432 1.85054 15.4884 2.26528 14.5589L6.10528 5.94526C6.51896 5.01579 7.60843 4.26105 8.53896 4.26105H32.539C33.4695 4.26105 33.8874 5.01579 33.4737 5.94526L29.639 14.5589C29.219 15.4884 28.1295 16.2432 27.199 16.2432Z"
          fill="#66CC33"
        />
      </g>
      <g style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M34.6937 26.6126H10.6506C9.71898 26.6126 8.6274 25.78 8.21266 24.7537L4.37056 15.2463C3.95582 14.22 4.37056 13.3874 5.30634 13.3874H29.3495C30.2811 13.3874 31.3727 14.22 31.7874 15.2463L35.6295 24.7537C36.0442 25.78 35.6253 26.6126 34.6937 26.6126Z"
          fill="#FFCC00"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1080_2285">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export { Syntax };
