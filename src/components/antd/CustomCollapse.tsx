import React from 'react';
import styled from 'styled-components';
import { CaretRightOutlined } from '@ant-design/icons';
import Collapse, { CollapseProps } from 'antd/lib/collapse';

interface CustomCollapseProps extends CollapseProps {
  gap?: number;
}

const StyledCollapse = styled(Collapse)<CustomCollapseProps>`
  background: ${({ theme }) => theme.whiteBackground};

  .ant-collapse-item {
    border: none;
    margin-bottom: ${({ gap }) => gap}px !important;
    background: ${({ theme }) => theme.backgroundColor};
    border-radius: ${({ theme }) => theme.borderRadius};

    .ant-collapse-header {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ant-collapse-header-text {
        font-size: 16px;
        font-weight: 500;
      }
    }

    &:last-child {
      border: none;
      margin-bottom: 15px !important;
      background: ${({ theme }) => theme.backgroundColor};
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }
`;

const CustomCollapse = React.forwardRef<HTMLDivElement, CustomCollapseProps>(
  (
    { gap = 10, expandIconPosition = 'right', bordered = false, ...props },
    ref,
  ) => {
    return (
      <StyledCollapse
        gap={gap}
        bordered={bordered}
        expandIconPosition={expandIconPosition}
        ref={ref}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ fontSize: '20px' }}
            rotate={isActive ? 90 : 0}
          />
        )}
        {...props}
      />
    );
  },
);

export default CustomCollapse;
