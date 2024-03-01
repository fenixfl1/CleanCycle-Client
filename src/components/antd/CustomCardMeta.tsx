import React from 'react';
import { Card } from 'antd';
import { CardMetaProps } from 'antd/es/card';

const { Meta } = Card;

const CustomCardMeta: React.FC<CardMetaProps> = ({ ...props }) => {
  return <Meta {...props} />;
};

export default CustomCardMeta;
