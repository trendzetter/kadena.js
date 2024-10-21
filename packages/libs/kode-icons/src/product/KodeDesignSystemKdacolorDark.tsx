import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const KodeDesignSystemKdacolorDark = (
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
      d="M50.538 49.318H35.17l-.01-.008-.121-.093-19.046-14.866 7.795-6.25L50.41 49.216zM50.538 6.88H35.17l-.01.008-.121.092-19.046 14.867 7.795 6.253L50.41 6.98z"
    />
    <path
      fill="#4A9079"
      d="M15.996 29.042v20.275l-.01-.007-.119-.093-9.264-7.326-.023-.018-.134-.103V14.428l.134-.103.023-.018L15.87 6.98l.118-.092.01-.008v22.162z"
    />
    <path
      fill="#F0EAE6"
      d="M58.032 40.728v-25.26h3.865v10.499h.597q2.358-2.606 9.388-10.5h5.062c-1.9 2.092-5.682 6.238-11.354 12.437q2.95 3.203 11.776 12.826h-5.237a3500 3500 0 0 0-9.632-10.71H61.9v10.71h-3.865zM78.416 40.728l7.17-25.26h6.855c1.194 4.202 3.587 12.624 7.169 25.26h-4.007c-.283-.986-.83-2.97-1.652-5.955h-9.876q-.389 1.477-1.653 5.955zm6.644-9.548h7.908c-.61-2.23-1.83-6.66-3.654-13.28h-.597q-.916 3.312-3.654 13.28zM102.075 40.728v-25.26h10.088q5.026.002 7.697 2.57 2.706 2.574 2.707 7.715v4.722q0 5.18-2.707 7.715-2.671 2.536-7.697 2.535h-10.088zm3.938-3.523h6.186q3.269 0 4.853-1.655 1.582-1.69 1.58-4.97v-4.968q0-3.313-1.58-4.933t-4.853-1.62h-6.186zM126.96 40.728v-25.26h15.852v3.558h-11.987v7.221h11.004v3.56h-11.004v7.398h12.162v3.523h-16.03zM147.068 40.728v-25.26h7.489q1.686 5.672 6.819 22.653h.597V15.467h3.832v25.26h-7.488a7661 7661 0 0 0-6.82-22.689h-.597v22.69zM169.21 40.728q1.793-6.306 7.169-25.26h6.856q1.791 6.305 7.169 25.26h-4.007q-.423-1.478-1.652-5.955h-9.876q-.389 1.477-1.653 5.955zm6.642-9.548h7.908c-.61-2.23-1.827-6.66-3.655-13.28h-.597q-.915 3.312-3.654 13.28zM64.612 57.91v-8.649h1.037v3.775h.17q.916-.954 3.654-3.775h1.387q-1.049 1.074-4.21 4.282 1.085 1.086 4.354 4.367h-1.41q-.942-.965-3.775-3.837h-.17v3.837zM75.286 58.08q-1.544 0-2.46-.893-.93-.892-.929-2.604v-1.98q0-1.725.93-2.616.915-.893 2.46-.893c1.029 0 1.86.298 2.472.893q.93.89.93 2.617v1.979q0 1.713-.93 2.604-.918.893-2.473.893m0-.916q1.124-.002 1.737-.674.627-.674.628-1.871v-2.051q0-1.205-.627-1.881-.615-.664-1.738-.664c-.748 0-1.315.221-1.724.664q-.627.676-.628 1.88v2.052q0 1.194.628 1.87.616.676 1.724.675M80.003 57.91v-8.649h3.377q1.701-.002 2.63.87.942.869.942 2.653v1.603q0 1.81-.942 2.666-.929.857-2.63.857zm1.037-.94h2.34q1.254 0 1.894-.614.651-.616.65-1.917V52.75q.001-1.33-.65-1.93-.64-.603-1.894-.603h-2.34v6.755zM88.604 57.91v-8.649h5.319v.942H89.64v2.895h3.945v.929H89.64v2.944h4.344v.942h-5.381zM98.326 57.91v-8.649h3.376q1.701-.002 2.63.87.942.869.942 2.653v1.603q0 1.81-.942 2.666-.929.857-2.63.857zm1.037-.94h2.339q1.255 0 1.894-.614.652-.616.651-1.917V52.75q0-1.33-.651-1.93-.64-.603-1.894-.603h-2.339v6.755zM106.926 57.91v-8.649h5.319v.942h-4.282v2.895h3.945v.929h-3.945v2.944h4.344v.942h-5.381zM116.769 58.08q-.94 0-1.688-.327a2.74 2.74 0 0 1-1.171-1q-.421-.687-.422-1.702V54.8h1.024v.252q0 1.085.628 1.603.642.531 1.629.53c.659 0 1.182-.151 1.544-.458q.531-.459.53-1.158.001-.47-.241-.759a1.64 1.64 0 0 0-.675-.458 7 7 0 0 0-1.014-.327 20 20 0 0 1-.638-.157 6.5 6.5 0 0 1-1.338-.483 2.4 2.4 0 0 1-.916-.736q-.313-.47-.314-1.207c0-.492.121-.901.363-1.256a2.34 2.34 0 0 1 1.014-.821q.675-.278 1.531-.278c.571 0 1.114.1 1.58.301q.7.302 1.086.893.41.58.409 1.472v.52h-1.024v-.52q0-.627-.265-1.014a1.54 1.54 0 0 0-.736-.566 2.8 2.8 0 0 0-1.05-.18q-.845-.001-1.364.373t-.52 1.06q0 .459.216.75.218.276.628.47.41.17.978.301.217.062.638.17.761.157 1.351.435.603.277.965.759.363.47.363 1.23c0 .507-.128.96-.386 1.338q-.386.567-1.086.893-.697.3-1.629.301zM121.463 57.91v-8.649h1.037v8.65zM127.495 58.08q-.964 0-1.701-.399a2.82 2.82 0 0 1-1.158-1.181q-.41-.772-.409-1.917v-1.98q0-1.725.916-2.616.916-.893 2.46-.893c1.03 0 1.802.278 2.339.831q.796.845.796 2.257v.059h-1.025v-.085q0-.616-.216-1.099a1.7 1.7 0 0 0-.7-.759q-.472-.278-1.194-.278-1.096 0-1.714.664-.626.674-.628 1.894v2.028q0 1.205.628 1.881.616.675 1.725.674c.738 0 1.258-.208 1.603-.628q.506-.614.507-1.641v-.206h-2.617v-.893h3.631v4.112h-.942v-.942h-.17a1.9 1.9 0 0 1-.386.53q-.24.266-.664.422-.423.158-1.086.157zM132.632 57.91v-8.649h2.015q.747 2.004 3.016 7.998h.157v-7.998h1.024v8.65h-2.015q-.749-2.003-3.003-8.01h-.17v8.01zM146.891 58.08q-.94 0-1.688-.327a2.74 2.74 0 0 1-1.171-1q-.422-.687-.422-1.702V54.8h1.024v.252q-.001 1.085.628 1.603.64.531 1.629.53c.659 0 1.181-.151 1.544-.458q.531-.459.53-1.158 0-.47-.242-.759a1.64 1.64 0 0 0-.674-.458 7 7 0 0 0-1.014-.327c-.144-.03-.358-.085-.638-.157a6.5 6.5 0 0 1-1.338-.483 2.4 2.4 0 0 1-.917-.736q-.313-.47-.314-1.207c0-.492.121-.901.363-1.256a2.34 2.34 0 0 1 1.014-.821q.675-.278 1.531-.278c.572 0 1.115.1 1.58.301q.7.302 1.086.893.41.58.41 1.472v.52h-1.025v-.52q.001-.627-.265-1.014a1.54 1.54 0 0 0-.736-.566 2.8 2.8 0 0 0-1.05-.18q-.843-.001-1.364.373-.52.374-.519 1.06 0 .459.216.75.217.276.628.47.409.17.978.301.216.062.638.17.76.157 1.351.435.602.277.965.759.363.47.363 1.23c0 .507-.129.96-.386 1.338q-.387.567-1.086.893-.699.3-1.629.301zM153.839 57.91v-3.294q-.76-1.34-3.075-5.355h1.194l2.316 4.148h.17q.59-1.038 2.329-4.148h1.181q-.76 1.34-3.075 5.355v3.294h-1.04M162.007 58.08q-.94 0-1.688-.327a2.74 2.74 0 0 1-1.171-1q-.422-.687-.422-1.702V54.8h1.024v.252q-.001 1.085.628 1.603.64.531 1.629.53c.659 0 1.181-.151 1.544-.458q.531-.459.53-1.158 0-.47-.242-.759a1.64 1.64 0 0 0-.674-.458 7 7 0 0 0-1.014-.327c-.144-.03-.358-.085-.638-.157a6.5 6.5 0 0 1-1.338-.483 2.4 2.4 0 0 1-.917-.736q-.313-.47-.314-1.207c0-.492.121-.901.363-1.256a2.34 2.34 0 0 1 1.014-.821q.675-.278 1.531-.278c.572 0 1.115.1 1.58.301q.7.302 1.086.893.41.58.41 1.472v.52h-1.025v-.52q.001-.627-.265-1.014a1.54 1.54 0 0 0-.736-.566 2.8 2.8 0 0 0-1.05-.18q-.843-.001-1.363.373-.521.374-.52 1.06 0 .459.216.75.217.276.628.47.41.17.978.301.216.062.638.17.76.157 1.351.435.602.277.965.759.363.47.363 1.23c0 .507-.129.96-.386 1.338q-.387.567-1.086.893-.699.3-1.629.301zM168.821 57.91v-7.707h-2.774v-.942h6.585v.942h-2.774v7.707zM173.96 57.91v-8.649h5.319v.942h-4.282v2.895h3.945v.929h-3.945v2.944h4.344v.942h-5.381zM180.921 57.91v-8.649h1.979q.567 2.004 2.293 7.998h.17a2220 2220 0 0 1 2.293-7.998h1.979v8.65h-1.001v-7.963h-.17q-.58 1.991-2.293 7.962h-1.786q-.579-1.99-2.293-7.962h-.17v7.962z"
    />
  </svg>
);
export default KodeDesignSystemKdacolorDark;
