import React from 'react';
import SearchForm from 'forms/SearchForm/SearchForm';
import MainLayout from 'layouts/MainLayout/MainLayout';

const HomePage = props => {
  return (
    <MainLayout>
      <div className="page-home">
        <section className="header">
          <div className="header_wrapper">
            <h1 className="header_heading">Homedey</h1>
          </div>
        </section>
        <div className="search-form">
          <SearchForm />
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage;