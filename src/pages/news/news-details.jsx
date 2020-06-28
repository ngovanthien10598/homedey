import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { useRouteMatch } from 'react-router-dom';
import { getNewsDetailsAPI } from 'services/user/news';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/loading.action';
import { Empty, Divider } from 'antd';

const NewsDetailsPage = props => {

  const [newsDetails, setNewsDetails] = useState(null);
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const slug = params.slug;

  async function getNewsDetails(slug) {
    dispatch(setLoading(true));
    try {
      const response = await getNewsDetailsAPI(slug);
      setNewsDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    if (slug && slug.length > 0) {
      getNewsDetails(slug);
    }
  }, [slug]);
  return (
    <MainLayout>
      <LayoutWithAside>
        {
          newsDetails ?
            <div>
              <h2>{newsDetails.title}</h2>
              <p><small>{new Date(newsDetails.created_at).toLocaleDateString('vi-VN')}</small></p>
              <Divider />
              <div dangerouslySetInnerHTML={{ __html: newsDetails.content }}></div>
            </div>

            :
            <Empty />
        }
      </LayoutWithAside>
    </MainLayout>
  )
}

export default NewsDetailsPage;