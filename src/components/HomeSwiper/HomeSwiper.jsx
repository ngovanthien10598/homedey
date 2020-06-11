import React from 'react';
import Swiper from 'react-id-swiper';
import SwiperItem from './SwiperItem/SwiperItem';
import 'swiper/css/swiper.css';
import './HomeSwiper.scss';

const HomeSwiper = props => {
  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false
    // },
    speed: 1500,
    loop: true
  }

  return (
    <Swiper {...params}>
      <div>
        <SwiperItem />
      </div>
      <div>
        <SwiperItem />
      </div>
      <div>
        <SwiperItem />
      </div>
    </Swiper>
  )
}

export default HomeSwiper;