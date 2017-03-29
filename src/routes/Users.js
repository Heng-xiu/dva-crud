// src/routes/Users.js
// 這裡比較像是 view 的概念

import React, { Component, PropTypes } from 'react';
// import { connect } from 'dva';

import UsersComponent from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

export default Users;
// export default connect()(Users);
