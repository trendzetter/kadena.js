import type { ITheme } from '@kadena/kode-ui';
import { Themes, useTheme } from '@kadena/kode-ui';
import type { ComponentPropsWithRef, FC } from 'react';
import React from 'react';

interface IProps extends ComponentPropsWithRef<'svg'> {
  overwriteTheme?: ITheme;
}

export const DocsLogo: FC<IProps> = ({ overwriteTheme, ...props }) => {
  const { theme } = useTheme({ overwriteTheme });

  if (theme === Themes.dark) {
    return (
      <svg
        width="216"
        height="42"
        viewBox="0 0 216 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M38.4893 31.4215V12.5754H41.3735V20.4079H41.8195C42.9916 19.1112 45.3246 16.5011 48.8223 12.5754H52.5984C51.1817 14.1359 48.3594 17.2285 44.128 21.8533C45.5956 23.4477 48.525 26.6365 52.9126 31.4215H49.0048C47.8157 30.0891 45.4206 27.4261 41.8195 23.4308H41.3735V31.4215H38.4893Z"
          fill="#F0EAE6"
        />
        <path
          d="M53.6987 31.4215C54.5905 28.2855 56.3742 22.0022 59.0478 12.5754H64.1616C65.0534 15.7114 66.837 21.9947 69.5106 31.4215H66.521C66.3102 30.6865 65.9001 29.2052 65.2886 26.9795H57.9208C57.7288 27.7145 57.3168 29.1958 56.6884 31.4215H53.6987ZM58.6545 24.2977H64.5548C64.0995 22.6336 63.1907 19.3299 61.8286 14.3884H61.3827C60.9273 16.0356 60.0186 19.3393 58.6564 24.2977H58.6545Z"
          fill="#F0EAE6"
        />
        <path
          d="M71.3496 31.4215V12.5754H78.8755C81.376 12.5754 83.2894 13.2162 84.6177 14.494C85.963 15.7736 86.6366 17.6921 86.6366 20.2496V23.7719C86.6366 26.3481 85.963 28.2667 84.6177 29.5275C83.2894 30.7883 81.3741 31.4196 78.8755 31.4196H71.3496V31.4215ZM74.2866 28.7925H78.9018C80.5274 28.7925 81.7334 28.3816 82.5218 27.558C83.3082 26.7175 83.7015 25.4812 83.7015 23.851V20.144C83.7015 18.4969 83.3082 17.27 82.5218 16.4634C81.7353 15.6587 80.5293 15.2553 78.9018 15.2553H74.2866V28.7925Z"
          fill="#F0EAE6"
        />
        <path
          d="M89.9141 31.4215V12.5754H101.741V15.2308H92.7984V20.6189H101.007V23.2743H92.7984V28.7943H101.873V31.4234H89.9141V31.4215Z"
          fill="#F0EAE6"
        />
        <path
          d="M104.917 31.4215V12.5754H110.503C111.342 15.3967 113.037 21.0298 115.591 29.4766H116.036V12.5754H118.894V31.4215H113.308C112.469 28.6002 110.774 22.9577 108.221 14.494H107.775V31.4215H104.917Z"
          fill="#F0EAE6"
        />
        <path
          d="M121.435 31.4215C122.327 28.2855 124.111 22.0022 126.784 12.5754H131.898C132.79 15.7114 134.573 21.9947 137.247 31.4215H134.257C134.047 30.6865 133.636 29.2052 133.025 26.9795H125.657C125.465 27.7145 125.053 29.1958 124.425 31.4215H121.435ZM126.391 24.2977H132.291C131.836 22.6336 130.927 19.3299 129.565 14.3884H129.119C128.664 16.0356 127.755 19.3393 126.393 24.2977H126.391Z"
          fill="#F0EAE6"
        />
        <path
          d="M32.9003 37.8297H21.4346L21.4271 37.824L21.3368 37.7543L7.12793 26.6634L12.9436 21.999L32.8044 37.7543L32.9003 37.8297Z"
          fill="#4A9079"
        />
        <path
          d="M32.9003 6.16846H21.4346L21.4271 6.17411L21.3368 6.24384L7.12793 17.3347L12.9436 21.9991L32.8044 6.24384L32.9003 6.16846Z"
          fill="#4A9079"
        />
        <path
          d="M7.12952 22.7021V26.6522V26.6654L7.13141 37.7544V37.8298L7.12388 37.8242L7.03545 37.7544L0.121046 32.2891L0.104112 32.2759L0.00439453 32.1986V11.7997L0.104112 11.7224L0.121046 11.7092L7.03545 6.24384L7.12388 6.17411L7.13141 6.16846V6.24384L7.12952 17.3329V17.346V21.9991V22.7021Z"
          fill="#4A9079"
        />
        <path
          d="M0.00376294 21.999H0V22.702H0.00376294V21.999Z"
          fill="#4A9079"
        />
        <path
          d="M7.12981 21.999H7.12793V22.702H7.12981V21.999Z"
          fill="#4A9079"
        />
        <path
          d="M211.711 28.3634C210.843 28.3634 210.065 28.2132 209.375 27.9128C208.696 27.6013 208.156 27.1396 207.756 26.5277C207.367 25.8935 207.172 25.1092 207.172 24.1747C207.172 24.0968 207.172 23.98 207.172 23.8242C207.406 23.8242 207.878 23.8242 208.59 23.8242C208.59 23.8798 208.59 23.9966 208.59 24.1747C208.59 25.176 208.88 25.9158 209.458 26.3942C210.048 26.8837 210.799 27.1285 211.711 27.1285C212.634 27.1285 213.347 26.9171 213.847 26.4943C214.337 26.0716 214.581 25.5375 214.581 24.8923C214.581 24.4584 214.47 24.1079 214.248 23.8409C214.025 23.5739 213.714 23.3625 213.313 23.2067C212.913 23.0399 212.445 22.8897 211.911 22.7562C211.711 22.7117 211.416 22.6393 211.027 22.5392C210.326 22.3612 209.708 22.1387 209.174 21.8717C208.64 21.6158 208.218 21.2765 207.906 20.8537C207.617 20.4198 207.472 19.8635 207.472 19.1849C207.472 18.5173 207.639 17.9388 207.973 17.4493C208.307 16.9598 208.774 16.5815 209.375 16.3145C209.998 16.0586 210.704 15.9307 211.494 15.9307C212.306 15.9307 213.035 16.0697 213.68 16.3479C214.326 16.626 214.826 17.0377 215.182 17.5828C215.56 18.1168 215.75 18.7955 215.75 19.6188C215.75 19.7745 215.75 20.0137 215.75 20.3364C215.516 20.3364 215.043 20.3364 214.331 20.3364C214.331 20.214 214.331 19.9748 214.331 19.6188C214.331 19.0402 214.209 18.573 213.964 18.217C213.719 17.8609 213.38 17.5995 212.946 17.4326C212.523 17.2657 212.039 17.1823 211.494 17.1823C210.715 17.1823 210.087 17.3547 209.608 17.6996C209.13 18.0445 208.891 18.534 208.891 19.1682C208.891 19.591 208.991 19.9358 209.191 20.2029C209.391 20.4587 209.681 20.6757 210.059 20.8537C210.437 21.0095 210.888 21.1485 211.411 21.2709C211.611 21.3265 211.906 21.4044 212.295 21.5045C212.996 21.6492 213.619 21.8494 214.164 22.1053C214.721 22.3612 215.166 22.7117 215.499 23.1567C215.833 23.5906 216 24.158 216 24.8589C216 25.5709 215.822 26.1884 215.466 26.7113C215.11 27.2342 214.609 27.6458 213.964 27.9462C213.319 28.2243 212.568 28.3634 211.711 28.3634Z"
          fill="#F0EAE6"
        />
        <path
          d="M201.081 28.3634C199.657 28.3634 198.522 27.9518 197.677 27.1285C196.831 26.3052 196.408 25.1036 196.408 23.5238C196.408 22.9119 196.408 21.9996 196.408 20.7869C196.408 19.196 196.831 17.9889 197.677 17.1656C198.522 16.3423 199.657 15.9307 201.081 15.9307C202.494 15.9307 203.579 16.3256 204.335 17.1155C205.092 17.8943 205.47 18.9679 205.47 20.3364C205.47 20.3586 205.47 20.3864 205.47 20.4198C205.236 20.4198 204.763 20.4198 204.051 20.4198C204.051 20.3976 204.051 20.353 204.051 20.2863C204.051 19.3851 203.812 18.6453 203.334 18.0668C202.844 17.4994 202.093 17.2157 201.081 17.2157C200.068 17.2157 199.279 17.5216 198.711 18.1335C198.133 18.7565 197.843 19.6299 197.843 20.7536C197.843 21.3766 197.843 22.3111 197.843 23.5572C197.843 24.6697 198.133 25.5375 198.711 26.1606C199.279 26.7836 200.068 27.0951 201.081 27.0951C202.093 27.0951 202.844 26.8058 203.334 26.2273C203.812 25.6488 204.051 24.9089 204.051 24.0078C204.051 23.9521 204.051 23.8631 204.051 23.7408C204.285 23.7408 204.758 23.7408 205.47 23.7408C205.47 23.7741 205.47 23.8465 205.47 23.9577C205.47 25.3261 205.092 26.4053 204.335 27.1952C203.579 27.974 202.494 28.3634 201.081 28.3634Z"
          fill="#F0EAE6"
        />
        <path
          d="M189.666 28.3634C188.242 28.3634 187.107 27.9518 186.262 27.1285C185.405 26.3052 184.977 25.1036 184.977 23.5238C184.977 22.9119 184.977 21.9996 184.977 20.7869C184.977 19.196 185.405 17.9889 186.262 17.1656C187.107 16.3423 188.242 15.9307 189.666 15.9307C191.101 15.9307 192.242 16.3423 193.087 17.1656C193.944 17.9889 194.372 19.196 194.372 20.7869C194.372 21.3877 194.372 22.3 194.372 23.5238C194.372 25.1036 193.944 26.3052 193.087 27.1285C192.242 27.9518 191.101 28.3634 189.666 28.3634ZM189.666 27.0951C190.701 27.0951 191.502 26.7836 192.069 26.1606C192.648 25.5375 192.937 24.6753 192.937 23.5739C192.937 22.9397 192.937 21.9941 192.937 20.7369C192.937 19.6243 192.648 18.7565 192.069 18.1335C191.502 17.5216 190.701 17.2157 189.666 17.2157C188.642 17.2157 187.847 17.5216 187.28 18.1335C186.701 18.7565 186.412 19.6243 186.412 20.7369C186.412 21.3599 186.412 22.3056 186.412 23.5739C186.412 24.6753 186.701 25.5375 187.28 26.1606C187.847 26.7836 188.642 27.0951 189.666 27.0951Z"
          fill="#F0EAE6"
        />
        <path
          d="M173.428 28.1298C173.428 27.9184 173.428 27.4901 173.428 26.8448C173.428 25.2761 173.428 22.1443 173.428 17.4493C173.428 17.2379 173.428 16.8096 173.428 16.1643C174.207 16.1643 175.765 16.1643 178.101 16.1643C179.67 16.1643 180.882 16.5648 181.739 17.3659C182.607 18.1669 183.041 19.3907 183.041 21.0373C183.041 21.5268 183.041 22.2666 183.041 23.2568C183.041 24.9256 182.607 26.155 181.739 26.9449C180.882 27.7348 179.67 28.1298 178.101 28.1298C177.055 28.1298 175.498 28.1298 173.428 28.1298ZM174.863 26.8281C175.409 26.8281 176.488 26.8281 178.101 26.8281C179.258 26.8281 180.131 26.5444 180.721 25.977C181.322 25.4096 181.622 24.5251 181.622 23.3236C181.622 22.8007 181.622 22.0219 181.622 20.9872C181.622 19.7634 181.322 18.8734 180.721 18.3171C180.131 17.7608 179.258 17.4827 178.101 17.4827C177.378 17.4827 176.299 17.4827 174.863 17.4827C174.863 19.0402 174.863 22.1554 174.863 26.8281Z"
          fill="#F0EAE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M154.67 37.8313L154.67 6.16846L155.652 6.16846L155.652 37.8313L154.67 37.8313Z"
          fill="#F0EAE6"
        />
      </svg>
    );
  }

  return (
    <svg
      width="216"
      height="44"
      viewBox="0 0 216 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.4893 31.4215V12.5754H41.3735V20.4079H41.8195C42.9916 19.1112 45.3246 16.5011 48.8223 12.5754H52.5984C51.1817 14.1359 48.3594 17.2285 44.128 21.8533C45.5956 23.4477 48.525 26.6365 52.9126 31.4215H49.0048C47.8157 30.0891 45.4206 27.4261 41.8195 23.4308H41.3735V31.4215H38.4893Z"
        fill="#0B1D2E"
      />
      <path
        d="M53.6987 31.4215C54.5905 28.2855 56.3742 22.0022 59.0478 12.5754H64.1616C65.0534 15.7114 66.837 21.9947 69.5106 31.4215H66.521C66.3102 30.6865 65.9001 29.2052 65.2886 26.9795H57.9208C57.7288 27.7145 57.3168 29.1958 56.6884 31.4215H53.6987ZM58.6545 24.2977H64.5548C64.0995 22.6336 63.1907 19.3299 61.8286 14.3884H61.3827C60.9273 16.0356 60.0186 19.3393 58.6564 24.2977H58.6545Z"
        fill="#0B1D2E"
      />
      <path
        d="M71.3496 31.4215V12.5754H78.8755C81.376 12.5754 83.2894 13.2162 84.6177 14.494C85.963 15.7736 86.6366 17.6921 86.6366 20.2496V23.7719C86.6366 26.3481 85.963 28.2667 84.6177 29.5275C83.2894 30.7883 81.3741 31.4196 78.8755 31.4196H71.3496V31.4215ZM74.2866 28.7925H78.9018C80.5274 28.7925 81.7334 28.3816 82.5218 27.558C83.3082 26.7175 83.7015 25.4812 83.7015 23.851V20.144C83.7015 18.4969 83.3082 17.27 82.5218 16.4634C81.7353 15.6587 80.5293 15.2553 78.9018 15.2553H74.2866V28.7925Z"
        fill="#0B1D2E"
      />
      <path
        d="M89.9141 31.4215V12.5754H101.741V15.2308H92.7984V20.6189H101.007V23.2743H92.7984V28.7943H101.873V31.4234H89.9141V31.4215Z"
        fill="#0B1D2E"
      />
      <path
        d="M104.917 31.4215V12.5754H110.503C111.342 15.3967 113.037 21.0298 115.591 29.4766H116.036V12.5754H118.894V31.4215H113.308C112.469 28.6002 110.774 22.9577 108.221 14.494H107.775V31.4215H104.917Z"
        fill="#0B1D2E"
      />
      <path
        d="M121.435 31.4215C122.327 28.2855 124.111 22.0022 126.784 12.5754H131.898C132.79 15.7114 134.573 21.9947 137.247 31.4215H134.257C134.047 30.6865 133.636 29.2052 133.025 26.9795H125.657C125.465 27.7145 125.053 29.1958 124.425 31.4215H121.435ZM126.391 24.2977H132.291C131.836 22.6336 130.927 19.3299 129.565 14.3884H129.119C128.664 16.0356 127.755 19.3393 126.393 24.2977H126.391Z"
        fill="#0B1D2E"
      />
      <path
        d="M32.9003 37.8297H21.4346L21.4271 37.824L21.3368 37.7543L7.12793 26.6634L12.9436 21.999L32.8044 37.7543L32.9003 37.8297Z"
        fill="#4A9079"
      />
      <path
        d="M32.9003 6.16846H21.4346L21.4271 6.17411L21.3368 6.24384L7.12793 17.3347L12.9436 21.9991L32.8044 6.24384L32.9003 6.16846Z"
        fill="#4A9079"
      />
      <path
        d="M7.12952 22.7021V26.6522V26.6654L7.13141 37.7544V37.8298L7.12388 37.8242L7.03545 37.7544L0.121046 32.2891L0.104112 32.2759L0.00439453 32.1986V11.7997L0.104112 11.7224L0.121046 11.7092L7.03545 6.24384L7.12388 6.17411L7.13141 6.16846V6.24384L7.12952 17.3329V17.346V21.9991V22.7021Z"
        fill="#4A9079"
      />
      <path d="M0.00376294 21.999H0V22.702H0.00376294V21.999Z" fill="#4A9079" />
      <path d="M7.12981 21.999H7.12793V22.702H7.12981V21.999Z" fill="#4A9079" />
      <path
        d="M211.711 28.3634C210.843 28.3634 210.065 28.2132 209.375 27.9128C208.696 27.6013 208.156 27.1396 207.756 26.5277C207.367 25.8935 207.172 25.1092 207.172 24.1747C207.172 24.0968 207.172 23.98 207.172 23.8242C207.406 23.8242 207.878 23.8242 208.59 23.8242C208.59 23.8798 208.59 23.9966 208.59 24.1747C208.59 25.176 208.88 25.9158 209.458 26.3942C210.048 26.8837 210.799 27.1285 211.711 27.1285C212.634 27.1285 213.347 26.9171 213.847 26.4943C214.337 26.0716 214.581 25.5375 214.581 24.8923C214.581 24.4584 214.47 24.1079 214.248 23.8409C214.025 23.5739 213.714 23.3625 213.313 23.2067C212.913 23.0399 212.445 22.8897 211.911 22.7562C211.711 22.7117 211.416 22.6393 211.027 22.5392C210.326 22.3612 209.708 22.1387 209.174 21.8717C208.64 21.6158 208.218 21.2765 207.906 20.8537C207.617 20.4198 207.472 19.8635 207.472 19.1849C207.472 18.5173 207.639 17.9388 207.973 17.4493C208.307 16.9598 208.774 16.5815 209.375 16.3145C209.998 16.0586 210.704 15.9307 211.494 15.9307C212.306 15.9307 213.035 16.0697 213.68 16.3479C214.326 16.626 214.826 17.0377 215.182 17.5828C215.56 18.1168 215.75 18.7955 215.75 19.6188C215.75 19.7745 215.75 20.0137 215.75 20.3364C215.516 20.3364 215.043 20.3364 214.331 20.3364C214.331 20.214 214.331 19.9748 214.331 19.6188C214.331 19.0402 214.209 18.573 213.964 18.217C213.719 17.8609 213.38 17.5995 212.946 17.4326C212.523 17.2657 212.039 17.1823 211.494 17.1823C210.715 17.1823 210.087 17.3547 209.608 17.6996C209.13 18.0445 208.891 18.534 208.891 19.1682C208.891 19.591 208.991 19.9358 209.191 20.2029C209.391 20.4587 209.681 20.6757 210.059 20.8537C210.437 21.0095 210.888 21.1485 211.411 21.2709C211.611 21.3265 211.906 21.4044 212.295 21.5045C212.996 21.6492 213.619 21.8494 214.164 22.1053C214.721 22.3612 215.166 22.7117 215.499 23.1567C215.833 23.5906 216 24.158 216 24.8589C216 25.5709 215.822 26.1884 215.466 26.7113C215.11 27.2342 214.609 27.6458 213.964 27.9462C213.319 28.2243 212.568 28.3634 211.711 28.3634Z"
        fill="#0B1D2E"
      />
      <path
        d="M201.081 28.3634C199.657 28.3634 198.522 27.9518 197.677 27.1285C196.831 26.3052 196.408 25.1036 196.408 23.5238C196.408 22.9119 196.408 21.9996 196.408 20.7869C196.408 19.196 196.831 17.9889 197.677 17.1656C198.522 16.3423 199.657 15.9307 201.081 15.9307C202.494 15.9307 203.579 16.3256 204.335 17.1155C205.092 17.8943 205.47 18.9679 205.47 20.3364C205.47 20.3586 205.47 20.3864 205.47 20.4198C205.236 20.4198 204.763 20.4198 204.051 20.4198C204.051 20.3976 204.051 20.353 204.051 20.2863C204.051 19.3851 203.812 18.6453 203.334 18.0668C202.844 17.4994 202.093 17.2157 201.081 17.2157C200.068 17.2157 199.279 17.5216 198.711 18.1335C198.133 18.7565 197.843 19.6299 197.843 20.7536C197.843 21.3766 197.843 22.3111 197.843 23.5572C197.843 24.6697 198.133 25.5375 198.711 26.1606C199.279 26.7836 200.068 27.0951 201.081 27.0951C202.093 27.0951 202.844 26.8058 203.334 26.2273C203.812 25.6488 204.051 24.9089 204.051 24.0078C204.051 23.9521 204.051 23.8631 204.051 23.7408C204.285 23.7408 204.758 23.7408 205.47 23.7408C205.47 23.7741 205.47 23.8465 205.47 23.9577C205.47 25.3261 205.092 26.4053 204.335 27.1952C203.579 27.974 202.494 28.3634 201.081 28.3634Z"
        fill="#0B1D2E"
      />
      <path
        d="M189.666 28.3634C188.242 28.3634 187.107 27.9518 186.262 27.1285C185.405 26.3052 184.977 25.1036 184.977 23.5238C184.977 22.9119 184.977 21.9996 184.977 20.7869C184.977 19.196 185.405 17.9889 186.262 17.1656C187.107 16.3423 188.242 15.9307 189.666 15.9307C191.101 15.9307 192.242 16.3423 193.087 17.1656C193.944 17.9889 194.372 19.196 194.372 20.7869C194.372 21.3877 194.372 22.3 194.372 23.5238C194.372 25.1036 193.944 26.3052 193.087 27.1285C192.242 27.9518 191.101 28.3634 189.666 28.3634ZM189.666 27.0951C190.701 27.0951 191.502 26.7836 192.069 26.1606C192.648 25.5375 192.937 24.6753 192.937 23.5739C192.937 22.9397 192.937 21.9941 192.937 20.7369C192.937 19.6243 192.648 18.7565 192.069 18.1335C191.502 17.5216 190.701 17.2157 189.666 17.2157C188.642 17.2157 187.847 17.5216 187.28 18.1335C186.701 18.7565 186.412 19.6243 186.412 20.7369C186.412 21.3599 186.412 22.3056 186.412 23.5739C186.412 24.6753 186.701 25.5375 187.28 26.1606C187.847 26.7836 188.642 27.0951 189.666 27.0951Z"
        fill="#0B1D2E"
      />
      <path
        d="M173.428 28.1298C173.428 27.9184 173.428 27.4901 173.428 26.8448C173.428 25.2761 173.428 22.1443 173.428 17.4493C173.428 17.2379 173.428 16.8096 173.428 16.1643C174.207 16.1643 175.765 16.1643 178.101 16.1643C179.67 16.1643 180.882 16.5648 181.739 17.3659C182.607 18.1669 183.041 19.3907 183.041 21.0373C183.041 21.5268 183.041 22.2666 183.041 23.2568C183.041 24.9256 182.607 26.155 181.739 26.9449C180.882 27.7348 179.67 28.1298 178.101 28.1298C177.055 28.1298 175.498 28.1298 173.428 28.1298ZM174.863 26.8281C175.409 26.8281 176.488 26.8281 178.101 26.8281C179.258 26.8281 180.131 26.5444 180.721 25.977C181.322 25.4096 181.622 24.5251 181.622 23.3236C181.622 22.8007 181.622 22.0219 181.622 20.9872C181.622 19.7634 181.322 18.8734 180.721 18.3171C180.131 17.7608 179.258 17.4827 178.101 17.4827C177.378 17.4827 176.299 17.4827 174.863 17.4827C174.863 19.0402 174.863 22.1554 174.863 26.8281Z"
        fill="#0B1D2E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M154.67 37.8313L154.67 6.16846L155.652 6.16846L155.652 37.8313L154.67 37.8313Z"
        fill="#0B1D2E"
      />
    </svg>
  );
};
