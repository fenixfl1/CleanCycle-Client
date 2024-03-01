import React, { forwardRef } from 'react';
import { MentionProps, Mentions } from 'antd';
import { MentionsRef } from 'antd/es/mentions';

const CustomMentions = forwardRef<MentionsRef, MentionProps>(
  ({ prefix = ['@', '#', ''], ...props }, ref) => {
    return <Mentions prefix={prefix} ref={ref} {...props} />;
  },
);

export default CustomMentions;
