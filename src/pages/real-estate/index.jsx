import React, { useEffect, useState } from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { Divider, Empty } from 'antd';
import RealEstate from 'components/RealEstate/RealEstate';
import { getAllRealEstateAPI, getRealEstateForSaleAPI, getRealEstateForRentAPI, getFeaturedRealEstatesAPI } from 'services/user/real-estate';
import { setLoading } from 'store/actions/loading.action';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const RealEstatePage = props => {

  const [realEstate, setRealEstate] = useState(null);
  const [featuredRealEstates, setFeaturedRealEstates] = useState(null);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const for_rent = searchParams.get('for_rent');

  const getAllRealEstate = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getAllRealEstateAPI();
      setRealEstate(response.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  const getRealEstateForSale = async (query) => {
    dispatch(setLoading(true));
    try {
      const response = await getRealEstateForSaleAPI(query);
      setRealEstate(response.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  const getRealEstateForRent = async (query) => {
    dispatch(setLoading(true));
    try {
      const response = await getRealEstateForRentAPI(query);
      setRealEstate(response.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    if (for_rent === 'true') {
      const newSearchParams = new URLSearchParams(search);
      newSearchParams.delete('for_rent');
      getRealEstateForRent(newSearchParams.toString());

    } else if (for_rent === 'false') {
      const newSearchParams = new URLSearchParams(search);
      newSearchParams.delete('for_rent');
      getRealEstateForSale(newSearchParams.toString());
    } else {
      getAllRealEstate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const response = await getFeaturedRealEstatesAPI();
        setFeaturedRealEstates(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFeatured();
  }, [])

  return (
    <MainLayout>
      <LayoutWithAside featured={featuredRealEstates} latest={realEstate?.results.slice(0, 3)}>
        <h2>Nhà đất {for_rent === 'true' ? 'cho thuê' : 'bán'}</h2>
        <Divider />
        {
          realEstate &&
          <ul className="real-estate-page_grid">
            {
              realEstate.results.length > 0 ?
                realEstate.results.map(item => {
                  return <RealEstate realEstate={item} key={item.id} />
                })
                :
                <Empty />
            }
          </ul>
        }
      </LayoutWithAside>
    </MainLayout>
  )
}

export default RealEstatePage;