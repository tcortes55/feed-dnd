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
  position: absolute;
  margin-top: 22px;
  color: darkgrey;
  font-family: 'slick';
  font-size: 20px;
  line-height: 1;

  .arrow-left {
    margin-left: -25px;
  }

  .arrow-right {
    margin-left: calc(256px + 5px);
  }
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
        <ArrowPlaceholder><div className="arrow-left">←</div></ArrowPlaceholder>
        <ArrowPlaceholder><div className="arrow-right">→</div></ArrowPlaceholder>
        <Slider {...settings}>
          {children}
        </Slider>
      </SliderContainer>
    );
  
}

export default Carousel;