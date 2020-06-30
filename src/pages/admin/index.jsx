import React from 'react';
import { Redirect } from 'react-router-dom';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';

const AdminHomePage = props => {
  return (
    <Redirect to="/admin/real-estate" />
  )
}

export default AdminHomePage;