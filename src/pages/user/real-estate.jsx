import React from 'react';
import { Divider, Row, Col, Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';

const UserRealEstatePage = props => {
  const { path } = useRouteMatch();
  return (
    <div className="user-re-page">
      <section className="user-re-page_new">
        <Row>
          <Col flex="1">
            <h2><strong>Bất động sản</strong></h2>
          </Col>
          <Col>
          <Button>
            <Link to={`${path}/create`}>Tạo mới</Link>
          </Button>
          </Col>
        </Row>
        <Divider />

      </section>
    </div>
  )
}

export default UserRealEstatePage;