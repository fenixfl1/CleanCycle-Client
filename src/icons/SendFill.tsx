import React from 'react';

export interface SendFillProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  rotate?: number;
}

const SendFill: React.FC<SendFillProps> = ({
  size = 16,
  fill = 'currentColor',
  className = 'bi bi-send-fill',
  viewBox = '0 0 16 16',
  rotate,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={size}
      viewBox={viewBox}
      width={size}
      xmlns={'http://www.w3.org/2000/svg'}
      style={{ ...props.style, transform: `rotate(${rotate}deg)` }}
      {...props}
    >
      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
    </svg>
  );
};

export default SendFill;
