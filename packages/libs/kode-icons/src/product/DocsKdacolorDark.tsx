import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const DocsKdacolorDark = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-style="kdacolor"
    viewBox="0 0 197 64"
    fontSize="1.5em"
    fill="currentColor"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#4A9079"
      d="M50.54 49.32H35.16l-.12-.1-19.05-14.87 7.79-6.25L50.4 49.22l.13.1zM50.54 6.88H35.16l-.12.1-19.05 14.87 7.79 6.25L50.41 6.98z"
    />
    <path
      fill="#4A9079"
      d="M16 29.04v20.28h-.01l-.12-.1-9.26-7.33-.02-.02-.13-.1V14.43l.13-.1.02-.02 9.27-7.33.12-.09h.01v22.16z"
    />
    <path
      fill="#F0EAE6"
      d="M58.03 40.73V15.47h3.87v10.5h.6q2.355-2.61 9.39-10.5h5.06c-1.9 2.09-5.68 6.24-11.35 12.44 1.97 2.14 5.89 6.41 11.78 12.83h-5.24q-2.385-2.685-9.63-10.71h-.6v10.71h-3.87zM78.42 40.73q1.785-6.3 7.17-25.26h6.86c1.19 4.2 3.59 12.62 7.17 25.26h-4.01c-.28-.99-.83-2.97-1.65-5.95h-9.88c-.26.99-.81 2.97-1.65 5.95zm6.64-9.55h7.91c-.61-2.23-1.83-6.66-3.65-13.28h-.6c-.61 2.21-1.83 6.64-3.65 13.28zM102.07 40.73V15.47h10.09c3.35 0 5.92.86 7.7 2.57 1.8 1.72 2.71 4.29 2.71 7.72v4.72c0 3.45-.9 6.02-2.71 7.72-1.78 1.69-4.35 2.53-7.7 2.53zm3.94-3.53h6.19c2.18 0 3.8-.55 4.85-1.65 1.06-1.13 1.58-2.78 1.58-4.97v-4.97c0-2.21-.53-3.85-1.58-4.93-1.06-1.08-2.67-1.62-4.85-1.62h-6.19zM126.96 40.73V15.47h15.85v3.56h-11.99v7.22h11v3.56h-11v7.4h12.16v3.52h-16.03zM147.07 40.73V15.47h7.49c1.12 3.78 3.4 11.33 6.82 22.65h.6V15.47h3.83v25.26h-7.49c-1.12-3.78-3.4-11.34-6.82-22.69h-.6v22.69zM169.21 40.73c1.2-4.2 3.58-12.62 7.17-25.26h6.86q1.785 6.3 7.17 25.26h-4.01c-.28-.99-.83-2.97-1.65-5.95h-9.88c-.26.99-.81 2.97-1.65 5.95zm6.64-9.55h7.91c-.61-2.23-1.83-6.66-3.65-13.28h-.6c-.61 2.21-1.83 6.64-3.65 13.28zM153.82 57.91v-.93h1.21v-6.79h-1.21v-.93h3.37c1.14 0 2.01.29 2.64.86.62.58.93 1.46.93 2.66v1.61c0 1.2-.31 2.09-.93 2.66s-1.5.86-2.64.86zm2.25-.94h1.12c.84 0 1.47-.21 1.9-.62s.64-1.05.64-1.92v-1.69c0-.88-.21-1.52-.64-1.93-.43-.4-1.06-.61-1.9-.61h-1.12v6.77M167.03 58.08q-1.545 0-2.46-.9c-.61-.6-.92-1.47-.92-2.61v-1.98c0-1.14.31-2.01.92-2.61q.915-.9 2.46-.9c1.03 0 1.86.3 2.48.9.61.6.92 1.47.92 2.61v1.98c0 1.14-.31 2.02-.92 2.61-.61.6-1.44.9-2.48.9m0-.92c.75 0 1.33-.22 1.74-.67s.62-1.07.62-1.87v-2.05c0-.8-.21-1.42-.62-1.87s-.99-.67-1.74-.67-1.32.22-1.73.67-.62 1.07-.62 1.87v2.05c0 .8.21 1.42.62 1.87s.99.67 1.73.67M176.77 58.08q-1.545 0-2.46-.9c-.61-.6-.91-1.47-.91-2.61v-1.98c0-1.14.3-2.01.91-2.61q.915-.9 2.46-.9c1.03 0 1.81.28 2.35.85.55.57.82 1.35.82 2.33v.06h-1.02v-.1c0-.65-.17-1.18-.53-1.6-.35-.42-.89-.62-1.62-.62s-1.3.22-1.72.67c-.41.45-.62 1.08-.62 1.88v2.03c0 .81.21 1.43.62 1.88s.98.67 1.72.67 1.27-.21 1.62-.62c.35-.42.53-.95.53-1.6v-.2h1.02v.16c0 .99-.27 1.77-.82 2.33-.55.57-1.33.85-2.35.85zM185.93 58.08c-.62 0-1.19-.11-1.68-.33a2.67 2.67 0 0 1-1.17-1.01c-.29-.45-.43-1.01-.43-1.69v-.26h1.03v.26c0 .72.21 1.25.63 1.6s.96.53 1.62.53 1.19-.15 1.54-.46c.35-.3.53-.69.53-1.15 0-.32-.08-.58-.24-.77s-.38-.34-.67-.46-.63-.22-1.01-.32l-.64-.16c-.5-.13-.95-.29-1.33-.48-.39-.19-.69-.44-.91-.75s-.33-.71-.33-1.19.12-.91.36-1.26.58-.63 1.03-.82.95-.28 1.53-.28 1.11.1 1.57.3.83.5 1.1.89.4.88.4 1.48v.52h-1.03v-.52c0-.42-.09-.76-.27-1.01a1.67 1.67 0 0 0-.73-.57c-.31-.12-.66-.18-1.06-.18-.57 0-1.03.12-1.37.38-.35.25-.52.61-.52 1.07 0 .3.07.55.22.74s.36.34.63.46.6.22.98.32l.64.16c.5.11.95.25 1.35.44q.6.285.96.75c.24.32.36.73.36 1.24s-.13.96-.38 1.33c-.26.38-.62.67-1.08.88s-1.01.31-1.64.31z"
    />
  </svg>
);
export default DocsKdacolorDark;
