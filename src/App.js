import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import {
  Switch,
  Route
} from 'react-router-dom';
import HomePage from 'pages';
import AboutPage from 'pages/about';
import ListingsPage from 'pages/listings';
import NewsPage from 'pages/news';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ProjectsPage from 'pages/projects';
import VerifyPage from 'pages/verify-email';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';

import { useCookies } from 'react-cookie';
import { setToken, getProfileAction } from 'store/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';



const App = props => {

  const [cookies] = useCookies(['token']);
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userState);

  useEffect(() => {
    if (cookies['token'] && !userState.token && localStorage.user) {
      dispatch(setToken(cookies['token']));
      dispatch(getProfileAction(cookies['token']));
    }
  });

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/thong-tin" component={AboutPage} />
        <Route path="/bat-dong-san" component={ListingsPage} />
        <Route path="/du-an" component={ProjectsPage} />
        <Route path="/tin-tuc" component={NewsPage} />
        <Route path="/dang-nhap" component={LoginPage} />
        <Route path="/dang-ky" component={RegisterPage} />
        <Route path="/verify-email" component={VerifyPage} />
        <Route path="/admin" component={AdminLayout} />
      </Switch>
    </Router>
  )
}

export default App;