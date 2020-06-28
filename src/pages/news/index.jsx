import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { Divider, Tag, Empty } from 'antd';
import News from 'components/News/News';
import { getAllNewsAPI, getNewsByCategoryAPI } from 'services/user/news';
import { getAllNewsCategoriesAPI } from 'services/user/news-category';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/loading.action';
import { Helmet } from 'react-helmet';

const NewsPage = props => {

  const [newsCategories, setNewsCategories] = useState(null);
  const [news, setNews] = useState(null);
  const { pathname } = useLocation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get('category');
  const dispatch = useDispatch();

  async function getNewsCategories() {
    try {
      const response = await getAllNewsCategoriesAPI();
      setNewsCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllNews() {
    dispatch(setLoading(true));
    try {
      const response = await getAllNewsAPI();
      setNews(response.data.results);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  async function getNewsByCategory(categorySlug) {
    dispatch(setLoading(true));
    try {
      const response = await getNewsByCategoryAPI(categorySlug);
      setNews(response.data.results);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    getNewsCategories();
  }, []);

  useEffect(() => {
    if (category && category.length > 0) {
      getNewsByCategory(category);
    } else {
      getAllNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <MainLayout>
      <Helmet>
        <title>Tin tức | Homedey</title>
        <meta name="description" content="Đọc tin tức tại homedey"/>
      </Helmet>
      <LayoutWithAside>
        <div className="page-news">
          <h2>Tin tức</h2>
          <div>
            <Tag color={(pathname === '/news' && !category) ? '#2db7f5' : ''}>
              <Link to="/news">Tất cả</Link>
            </Tag>
            {
              newsCategories &&
              newsCategories.map(c => {
                return <Tag color={c.slug === category ? '#2db7f5' : ''} key={c.id}>
                  <Link to={`/news?category=${c.slug}`}>{c.name}</Link>
                </Tag>
              })
            }
          </div>
          <Divider />
          <section className="page-news_wrapper">
            {
              news &&
                news.length > 0 ?
                news.map(n => (
                  <News key={n.id} news={n} />
                ))
                :
                <Empty />
            }
          </section>
        </div>
      </LayoutWithAside>
    </MainLayout>
  )
}

export default NewsPage;