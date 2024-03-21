import React from 'react';
import { Carousel } from 'antd';
import { CarouselProps, CarouselRef } from 'antd/lib/carousel';

const CustomCarousel = React.forwardRef<CarouselRef, CarouselProps>(
  ({ autoplay = true, ...props }, ref) => {
    return <Carousel autoplay={autoplay} ref={ref} {...props} />;
  },
);

export default CustomCarousel;
