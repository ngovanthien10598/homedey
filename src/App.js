import React, { useEffect } from 'react';
import Layout from 'layouts/MainLayout/MainLayout';
import {
  Switch,
  Route
} from 'react-router-dom';
import HomePage from 'pages';
import AboutPage from 'pages/about';
import ListingsPage from 'pages/listings';
import NewsPage from 'pages/news';
import ContactPage from 'pages/contact';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ProjectsPage from 'pages/projects';

import { useCookies } from 'react-cookie';
import { setToken, getProfileAction } from 'store/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';

const App = props => {

  const [cookies] = useCookies(['token']);
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userState);

  useEffect(() => {
    if (cookies['token'] && !userState.token) {
      dispatch(setToken(cookies['token']));
      dispatch(getProfileAction(cookies['token']));
    }
  });

  return <Layout>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/thong-tin" component={AboutPage} />
      <Route path="/bat-dong-san" component={ListingsPage} />
      <Route path="/du-an" component={ProjectsPage} />
      <Route path="/tin-tuc" component={NewsPage} />
      <Route path="/lien-he" component={ContactPage} />
      <Route path="/dang-nhap" component={LoginPage} />
      <Route path="/dang-ky" component={RegisterPage} />
    </Switch>
  </Layout>
}

export default App;