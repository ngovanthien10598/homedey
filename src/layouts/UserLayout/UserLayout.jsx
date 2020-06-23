import React from 'react';
import { Layout, Menu } from 'antd';
import { HashRouter, Switch, Route, useRouteMatch, useLocation, Link, Redirect } from 'react-router-dom';
import withUserRoute from 'HOCs/withUserRoute';
import UserHomePage from 'pages/user';
import UserRealEstatePage from 'pages/user/real-estate';
import UserRealEstateCreatePage from 'pages/user/real-estate-create';
import Header from 'components/Header/Header';

import './UserLayout.scss';
import RealEstateDetails from 'pages/shared/real-estate-detail';


const { Sider, Content } = Layout;

const UserLayout = props => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const adminRoutes = [
    { path: `${path}/`, name: 'Tài khoản' },
    { path: `${path}/real-estate`, name: 'Bất động sản' },
  ]
  return (
    <HashRouter>
      <Layout className="user-layout">
        <Header isDashboard />
        <Layout>
          <Sider breakpoint="md" collapsedWidth={0} width={200} className="user-layout_sider">
            <Menu theme="dark" mode="vertical" selectedKeys={[pathname]}>
              {
                adminRoutes.map(route => (
                  <Menu.Item key={route.path}>
                    <Link to={`${route.path}`}>
                      {route.name}
                    </Link>
                  </Menu.Item>
                ))
              }
            </Menu>
          </Sider>
          <Content className="user-layout_content">
            <Switch>
              <Route path={`${path}/`} exact component={UserHomePage} />
              <Route path={`${path}/real-estate`} exact component={UserRealEstatePage} />
              <Route path={`${path}/real-estate/create`} component={UserRealEstateCreatePage} />
              <Route path={`${path}/real-estate/:realEstateId`} component={RealEstateDetails} />
              <Route path={`${path}/*`} component={() => <Redirect to={`${path}/`} />} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  )
}

export default withUserRoute(UserLayout);