import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarOutlined } from '@ant-design/icons';
import { truncateText } from 'utils/string';
import { Tag } from 'antd';
import './News.scss';

const News = props => {
  const { news } = props;
  const { title, content, created_at, images, news_category, slug } = news;

  const div = document.createElement("div");
  div.innerHTML = content;
  const contentStr = truncateText(div.innerText, 100);

  return (
    <div className="news">
      <Link to={`/news/${slug}`} className="news_thumbnail">
        <img src={images[0]?.url || '//via.placeholder.com/800x600'} alt={images[0]?.url || '//via.placeholder.com/800x600'} />
      </Link>
      <div className="news-content">
        <h3 className="news_title"><Link to={`/news/${slug}`}>{title}</Link></h3>
        <p className="news_summary">{contentStr}</p>

        <p>
          <Tag>
            <Link to={`/news?category=${news_category.slug}`}>{news_category.name}</Link>
          </Tag>
        </p>

        <p className="news_date"><CalendarOutlined /> {new Date(created_at).toLocaleDateString("vi-VN")}</p>
      </div>
    </div>
  )
}

export default News;