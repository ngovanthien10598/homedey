import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'store/actions/user.action';
import { useEffect } from 'react';
import { getAllRealEstateCategoriesAPI } from 'services/user/real-estate-category';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header } = Layout;

const PageHeader = (props) => {

  const menuItems = [
    { name: 'Dự án', path: '/project' },
    { name: 'Tin tức', path: '/news' },
    { name: 'Thông tin', path: '/about' },
    // { name: 'Liên hệ', path: '/lien-he' },
  ]
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(null);
  const userState = useSelector(state => state.userState);
  const { user } = userState;
  const userLocal = localStorage.getItem('user');
  const href = window.location.href;

  useEffect(() => {
    const getCategories = async () => {
      const response = await getAllRealEstateCategoriesAPI();
      setCategories(response.data);
    }
    getCategories();
  }, []);

  const handleLogout = () => {
    history.replace('/');
    dispatch(logoutAction());
  }

  return (
    <Header  className={`header${props.isDashboard ? ' header--dashboard' : ''}`}>
      <Link className="header_brand" to="/">
        <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="Homedey" width="32" />
      </Link>

      {
        !props.isDashboard &&
        <Menu className="header_menu" theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <SubMenu
            className={`${href.includes('/real-estate?for_rent=false') ? ' ant-menu-item-selected' : ''}`}
            title={<Link to="/real-estate?for_rent=false" className="header_submenu">Nhà đất bán</Link>}>
            {
              categories &&
              categories.filter(c => !c.for_rent).map(c => {
                return <Menu.Item key={`/for-sale-${c.id}`}>
                  <Link to={`/real-estate?for_rent=false&&type=${c.id}`}>Bán {c.name}</Link>
                </Menu.Item>
              })
            }
          </SubMenu>
          <SubMenu
            className={`${href.includes('/real-estate?for_rent=true') ? ' ant-menu-item-selected' : ''}`}
            title={<Link to="/real-estate?for_rent=true" className="header_submenu">Nhà đất cho thuê</Link>}>
            {
              categories &&
              categories.filter(c => c.for_rent).map(c => {
                return <Menu.Item key={`/real-estate?for_rent=true${c.id}`}>
                  <Link to={`/real-estate?for_rent=true&&type=${c.id}`}>Cho thuê {c.name}</Link>
                </Menu.Item>
              })
            }
          </SubMenu>
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
      }
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