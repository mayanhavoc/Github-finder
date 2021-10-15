import React, { Fragment } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

const Home = () => {
  return (
    <Fragment>
      <h1>Hi, welcome to <span className="brand">Github Explorer <i className="fas fa-search"></i></span></h1>
      <p>Search github developrs by name.</p>
      <Search />
      <Users />
  </Fragment>
  )
  };

export default Home;