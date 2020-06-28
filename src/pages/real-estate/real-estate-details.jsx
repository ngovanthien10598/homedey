import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { getRealEstateDetailsAPI } from 'services/user/real-estate';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/loading.action';
import { Empty, Divider } from 'antd';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';

const RealEstateDetailsPage = () => {
  const [realEstate, setRealEstate] = useState(null);
  const { params } = useRouteMatch();
  const slug = params.slug;
  const dispatch = useDispatch();

  async function getRealEstateDetails(slug) {
    dispatch(setLoading(true));
    try {
      const response = await getRealEstateDetailsAPI(slug);
      setRealEstate(response.data.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    if (slug && slug.length > 0) {
      getRealEstateDetails(slug);
    }
  }, [slug]);

  return (
    <MainLayout>
      <LayoutWithAside>
        {
          realEstate ?
            <div className="real-estate-details-page">
              <h2>{realEstate.title}</h2>
              <p><small>{new Date(realEstate.created_at).toLocaleDateString('vi-VN')}</small></p>
              <Divider />
              <img src={realEstate.images[0]?.url || '//via.placeholder.com/800x600'} alt="{realEstate.images[0]?.url || '//via.placeholder.com/800x600'}" />
              <br />
              <div>{realEstate.detail}</div>
            </div>
            :
            <Empty />
        }
      </LayoutWithAside>
    </MainLayout>

  )
}

export default RealEstateDetailsPage;