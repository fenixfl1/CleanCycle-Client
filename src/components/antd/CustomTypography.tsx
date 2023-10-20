import React from 'react'
import { Typography, TypographyProps } from 'antd'
import { TextProps } from 'antd/es/typography/Text'
import { ParagraphProps } from 'antd/es/typography/Paragraph'
import { LinkProps } from 'antd/es/typography/Link'

const { Paragraph, Text, Link } = Typography

export const CustomText = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ ...props }, ref) => {
    return (
      <Text {...props} ref={ref}>
        {props.children}
      </Text>
    )
  },
)

export const CustomLink = React.forwardRef<HTMLElement, LinkProps>(
  ({ target = '_blank', ...props }, ref) => {
    return (
      <Link target={target} {...props} ref={ref}>
        {props.children}
      </Link>
    )
  },
)

export const CustomParagraph = React.forwardRef<HTMLElement, ParagraphProps>(
  (props, ref) => {
    return (
      <Paragraph {...props} ref={ref}>
        {props.children}
      </Paragraph>
    )
  },
)
