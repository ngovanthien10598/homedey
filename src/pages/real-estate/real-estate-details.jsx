import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { getRealEstateDetailsAPI } from 'services/user/real-estate';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/loading.action';
import { Empty, Divider, Carousel } from 'antd';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import RealEstateDetails from 'pages/shared/real-estate-detail';
import LLMap from 'components/LLMap/LLMap';
import { Marker } from 'react-leaflet';

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
              <Carousel adaptiveHeight autoplay>
                {
                  realEstate.images.map(image => {
                    return <div key={image.id}>
                      <img width="100%" src={image.url || '//via.placeholder.com/800x600'} alt={image.url || '//via.placeholder.com/800x600'} />
                    </div>
                  })
                }
              </Carousel>

              <br />
              <h3><strong>Thông tin chi tiết</strong></h3>
              <div dangerouslySetInnerHTML={{ __html: realEstate.detail }}></div>

              <h3><strong>Bản đồ</strong></h3>
              <LLMap style={{height: 400}} zoom={10} center={
                { lat: realEstate.address.latitude, lng: realEstate.address.longitude }
              }>
                <Marker position={
                  { lat: realEstate.address.latitude, lng: realEstate.address.longitude }
                } />
              </LLMap>
            </div>
            :
            <Empty />
        }
      </LayoutWithAside>
    </MainLayout>

  )
}

export default RealEstateDetailsPage;