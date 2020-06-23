import React from 'react';
import { Card } from 'antd';

import './RealEstate.scss';
import { Link } from 'react-router-dom';

const RealEstate = props => {
  return (
    <Card
      className={`real-estate${props.thumbnail ? ' real-estate--thumbnail' : ''}`}
      bordered={!props.thumbnail}
      cover={<Link className="real-estate_link" to="/real-estate/slug" title="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
        <img src="//via.placeholder.com/800x600" alt="cover" />
      </Link>}>
      <Card.Meta title={
        <h3><small>
          <Link className="real-estate_link" to="/real-estate/slug" title="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Link>
        </small></h3>
      } />
      {
        !props.thumbnail &&
        <div className="real-estate_content">
          <div className="real-estate_price">Giá</div>
          <div className="real-estate_city">Tỉnh/TP</div>
        </div>
      }
    </Card>
  )
}

export default RealEstate;