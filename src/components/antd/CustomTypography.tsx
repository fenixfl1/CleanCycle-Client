import React from 'react';
import { Typography, TypographyProps } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import { ParagraphProps } from 'antd/es/typography/Paragraph';
import { LinkProps } from 'antd/es/typography/Link';
import styled from 'styled-components';

const { Paragraph, Text, Link } = Typography;

interface CustomTextProps extends TextProps {
  decorator?: string;
}

const StyledText = styled(Text)<CustomTextProps>`
  ${({ decorator }) => decorator && `::before { content: '${decorator}'; }`}
`;

export const CustomText = React.forwardRef<HTMLSpanElement, CustomTextProps>(
  ({ decorator, ...props }, ref) => {
    return (
      <StyledText decorator={decorator} {...props} ref={ref}>
        {props.children}
      </StyledText>
    );
  },
);

export const CustomLink = React.forwardRef<HTMLElement, LinkProps>(
  ({ target = '_blank', ...props }, ref) => {
    return (
      <Link target={target} {...props} ref={ref}>
        {props.children}
      </Link>
    );
  },
);

export const CustomParagraph = React.forwardRef<HTMLElement, ParagraphProps>(
  (props, ref) => {
    return (
      <Paragraph {...props} ref={ref}>
        {props.children}
      </Paragraph>
    );
  },
);
