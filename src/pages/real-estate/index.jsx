import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { Divider } from 'antd';
import RealEstate from 'components/RealEstate/RealEstate';

const RealEstatePage = props => {
  console.log(LayoutWithAside);
  return (
    <MainLayout>
      <LayoutWithAside>
        <h2>Nhà đất bán</h2>
        <Divider />
        <div className="real-estate-page_grid">
          {
            Array(10).fill().map((item, index) => {
              return <RealEstate key={index} />
            })
          }
        </div>
      </LayoutWithAside>
    </MainLayout>
  )
}

export default RealEstatePage;