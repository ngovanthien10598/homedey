import React from 'react';
import './SwiperItem.scss';

const SwiperItem = props => {
  return (
    <div className="swiper-item">
      <div className="swiper-item_text">
        <div className="swiper-item_name">1243 Main Avenue Left Town</div>
        <div className="swiper-item_price">$ 482 900</div>
      </div>
    </div>
  )
}

export default SwiperItem;