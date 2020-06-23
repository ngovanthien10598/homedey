import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { Divider, Row, Col } from 'antd';

const ForSalePage = props => {
  console.log(LayoutWithAside);
  return (
    <MainLayout>
      <LayoutWithAside>
        <Divider orientation="left"><h2>Nhà đất bán</h2></Divider>
        <Row>
          {
            Array(15).fill().map((item, index) => {
              return <Col xs={24} sm={12} md={8} xl={6} xxl={4} key={index}>
                Item
              </Col>
            })
          }
        </Row>
      </LayoutWithAside>
    </MainLayout>
  )
}

export default ForSalePage;