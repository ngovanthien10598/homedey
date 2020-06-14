import React from 'react';
import { Layout, Menu } from 'antd';
import { HashRouter, Switch, Route, useRouteMatch, useLocation, Link, Redirect } from 'react-router-dom';
import withUserRoute from 'HOCs/withUserRoute';
import UserHomePage from 'pages/user';
import UserRealEstatePage from 'pages/user/real-estate';

import './UserLayout.scss';


const { Header, Sider, Content } = Layout;

const UserLayout = props => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const adminRoutes = [
    { path: `${path}/`, name: 'Tài khoản' },
    { path: `${path}/bds`, name: 'Bất động sản' },
  ]
  return (
    <HashRouter>
      <Layout className="user-layout">
        <Header className="user-layout_header">
          <Link to="/" className="user-layout_brand">
            <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="Homedey" width={32} />
          </Link>
        </Header>
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
              <Route path={`${path}/bds`} component={UserRealEstatePage} />
              <Route path={`${path}/*`} component={() => <Redirect to={`${path}/`} />} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  )
}

export default withUserRoute(UserLayout);