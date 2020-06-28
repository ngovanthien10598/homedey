import React, { useEffect, useState } from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { Divider } from 'antd';
import RealEstate from 'components/RealEstate/RealEstate';
import { getAllRealEstateAPI } from 'services/user/real-estate';
import { setLoading } from 'store/actions/loading.action';
import { useDispatch } from 'react-redux';

const RealEstatePage = props => {

  const [realEstate, setRealEstate] = useState(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    getAllRealEstate();
  }, []);

  return (
    <MainLayout>
      <LayoutWithAside>
        <h2>Nhà đất bán</h2>
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
                <li>No posts found.</li>
            }
          </ul>
        }
      </LayoutWithAside>
    </MainLayout>
  )
}

export default RealEstatePage;