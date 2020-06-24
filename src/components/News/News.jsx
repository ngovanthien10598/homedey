import React from 'react';
import { Link } from 'react-router-dom';

import './News.scss';
import { CalendarOutlined } from '@ant-design/icons';

const News = props => {
  return (
    <div className="news">
      <Link to="/news/slug" className="news_thumbnail">
        <img src="//via.placeholder.com/800x600" alt="" />
      </Link>
      <div className="news-content">
        <h3 className="news_title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <p className="news_summary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus magnam, debitis saepe accusamus ex aperiam id autem dolore hic voluptatibus necessitatibus facere pariatur exercitationem praesentium ducimus, provident possimus reprehenderit doloremque?</p>
        <p className="news_date"><CalendarOutlined /> {new Date().toLocaleDateString("vi-VN")}</p>
      </div>
    </div>
  )
}

export default News;