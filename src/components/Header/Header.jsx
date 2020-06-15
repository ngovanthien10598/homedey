import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'store/actions/user.action';
import Cookies from 'js-cookie';

const { Header } = Layout;

const PageHeader = (props) => {

  const menuItems = [
    { name: 'Thông tin', path: '/about' },
    { name: 'Bất động sản', path: '/listings' },
    { name: 'Dự án', path: '/project' },
    { name: 'Tin tức', path: '/news' },
    // { name: 'Liên hệ', path: '/lien-he' },
  ]
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userState);
  const { user } = userState;
  const userLocal = localStorage.getItem('user');

  const handleLogout = () => {
    dispatch(logoutAction());
    Cookies.remove('access');
    localStorage.removeItem('user');
  }

  return (
    <Header className="header">
      <Link className="header_brand" to="/">
        <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="Homedey" width="32" />
      </Link>

      <Menu className="header_menu" theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        {
          menuItems.map(menu => {
            return (
              <Menu.Item key={menu.path}>
                <Link to={menu.path}>{menu.name}</Link>
              </Menu.Item>
            )
          })
        }
      </Menu>
      {
        user || userLocal ?
          <Menu className="header_menu header_menu--auth" theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/me/">
              <Link to={`${user ? (user.is_staff ? '/admin/' : '/me/') : ''}`}>{user ? user.first_name + ' ' + user.last_name : userLocal}</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
              <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
            </Menu.Item>
          </Menu>
          :
          <Menu className="header_menu header_menu--auth" theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/login">
              <Link to="/login">Đăng nhập</Link>
            </Menu.Item>
            <Menu.Item key="/register">
              <Link to="/register">Đăng ký</Link>
            </Menu.Item>
          </Menu>
      }

    </Header>
  )
}

export default PageHeader;