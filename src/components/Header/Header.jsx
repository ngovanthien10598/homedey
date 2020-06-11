import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'store/actions/user.action';
import { useCookies } from 'react-cookie';

const { Header } = Layout;

const PageHeader = (props) => {

  const menuItems = [
    { name: 'Thông tin', path: '/thong-tin' },
    { name: 'Bất động sản', path: '/bat-dong-san' },
    { name: 'Dự án', path: '/du-an' },
    { name: 'Tin tức', path: '/tin-tuc' },
    { name: 'Liên hệ', path: '/lien-he' },
  ]
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userState);
  const { user } = userState;
  const userLocal = localStorage.getItem('user');
  const [,,removeCookies] = useCookies(['token']);

  const handleLogout = () => {
    dispatch(logoutAction());
    removeCookies('token');
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
            <Menu.Item key="/me">
              <Link to="/me">{user ? user.first_name + ' ' + user.last_name : userLocal}</Link>
            </Menu.Item>
            <Menu.Item key="/dang-xuat">
              <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
            </Menu.Item>
          </Menu>
          :
          <Menu className="header_menu header_menu--auth" theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/dang-nhap">
              <Link to="/dang-nhap">Đăng nhập</Link>
            </Menu.Item>
            <Menu.Item key="/dang-ky">
              <Link to="/dang-ky">Đăng ký</Link>
            </Menu.Item>
          </Menu>
      }

    </Header>
  )
}

export default PageHeader;