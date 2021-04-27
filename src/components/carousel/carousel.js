import React, { Component } from "react";
import Slider from "react-slick";
import { AppColors } from '../../constants';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from 'styled-components';

const SliderContainer = styled.div`
  max-width: 196px;
  padding: 24px 28px 24px 28px;
  margin: auto;
  background-color: white;

  .slick-prev:before,
  .slick-next:before {
    color: ${AppColors.DarkGrey};
    opacity: 1;
  }
`;

const ArrowWrapper = styled.div`
  .arrow-left {
    margin-left: -23px;
  }

  .arrow-right {
    margin-left: 199px;
  }
`;

const ArrowPlaceholder = styled.div`
  position: absolute;
  margin-top: 22px;
  color: ${AppColors.LightGrey};
  font-family: 'slick';
  font-size: 20px;
  line-height: 1;
`;

function Carousel({ children }) {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      swipe: false,
      draggable: false,
      rows: 1
    };

    const showPlaceholderArrows = (children.length <= 4);
    
    return (
      <SliderContainer>
        {showPlaceholderArrows && <ArrowWrapper>
          <ArrowPlaceholder className="arrow-left">←</ArrowPlaceholder>
          <ArrowPlaceholder className="arrow-right">→</ArrowPlaceholder>
        </ArrowWrapper>}
        <Slider {...settings}>
          {children}
        </Slider>
      </SliderContainer>
    );
  
}

export default Carousel;