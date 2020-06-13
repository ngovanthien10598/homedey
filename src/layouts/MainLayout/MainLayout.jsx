import React from 'react';
import { Layout } from 'antd';
import PageHeader from 'components/Header/Header';
// import PageFooter from 'components/Footer/Footer';
import './MainLayout.scss';
const { Content } = Layout;

const MainLayout = props => {
  return (
    <Layout className="layout">
      <PageHeader />
      <Content className="layout_content">

        {
          props.children
        }

      </Content>

      {/* <Footer>
          <PageFooter />
        </Footer> */}
    </Layout >
  )
}

export default MainLayout;