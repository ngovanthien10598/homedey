import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { Divider } from 'antd';
import News from 'components/News/News';

const NewsPage = props => {
  return (
    <MainLayout>
      <LayoutWithAside>
        <div className="page-news">
          <h2>Tin tức</h2>
          <Divider />
          <section className="page-news_wrapper">
            {
              Array(10).fill().map((news, index) => <News key={index} />)
            }
          </section>
        </div>
      </LayoutWithAside>
    </MainLayout>
  )
}

export default NewsPage;