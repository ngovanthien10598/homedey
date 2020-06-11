import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import PageHeader from 'components/Header/Header';
// import PageFooter from 'components/Footer/Footer';
import './MainLayout.scss';
const { Content } = Layout;

const MainLayout = props => {
  return (
    <Layout className="layout">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <PageHeader />
        <Content className="layout_content">

          {
            props.children
          }

        </Content>

        {/* <Footer>
          <PageFooter />
        </Footer> */}
      </BrowserRouter>
    </Layout >
  )
}

export default MainLayout;