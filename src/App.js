import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import {
  Switch,
  Route
} from 'react-router-dom';
import HomePage from 'pages';
import RealEstatePage from 'pages/real-estate';
import AboutPage from 'pages/about';
import NewsPage from 'pages/news';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ProjectsPage from 'pages/projects';
import ProjectDetailsPage from 'pages/projects/project-details';
import VerifyPage from 'pages/verify-email';
import UserLayout from 'layouts/UserLayout/UserLayout';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';

import Cookies from 'js-cookie';
import { setAccessToken, getProfileAction } from 'store/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';



const App = props => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userState);

  useEffect(() => {
    const accessToken = Cookies.get('access');
    if (accessToken && !userState.accessToken && localStorage.user) {
      dispatch(setAccessToken(accessToken));
      dispatch(getProfileAction(accessToken));
    }
  });

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/real-estate" component={RealEstatePage} />
        <Route path="/project" exact component={ProjectsPage} />
        <Route path="/project/:slug" component={ProjectDetailsPage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/verify-email" component={VerifyPage} />
        <Route path="/me" component={UserLayout} />
        <Route path="/admin" component={AdminLayout} />
      </Switch>
    </Router>
  )
}

export default App;