import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from 'styled-components';

const SliderContainer = styled.div`
  max-width: 256px;
  padding: 24px 28px 24px 28px;
  margin: auto;
  background-color: white;

  .slick-prev:before,
  .slick-next:before {
    color: darkgrey;
  }
`;

const ArrowPlaceholder = styled.div`
  color: darkgrey;
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
      slidesToScroll: 3,
      swipe: false,
      draggable: false,
      rows: 1
    };

    let className = 'slick-arrow slick-prev lala';
    return (
      <SliderContainer>
        <ArrowPlaceholder>←</ArrowPlaceholder>
        <Slider {...settings}>
          {children}
        </Slider>
      </SliderContainer>
    );
  
}

export default Carousel;