import React from 'react';
import Layout from 'layouts/Layout';
import {
  Switch,
  Route
} from 'react-router-dom';
import HomePage from 'pages';
import AboutPage from 'pages/about';
import ListingsPage from 'pages/listings';
import NewsPage from 'pages/news';
import ContactPage from 'pages/contact';

const App = props => {
  return <Layout>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/listings" component={ListingsPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/contact" component={ContactPage} />
    </Switch>
  </Layout>
}

export default App;