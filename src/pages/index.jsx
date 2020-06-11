import React from 'react';
import SearchForm from 'forms/SearchForm/SearchForm';

const HomePage = props => {
  return (
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
  )
}

export default HomePage;