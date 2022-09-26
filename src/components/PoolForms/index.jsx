import React, {useState, useContext}  from 'react';
import { UserContext } from '../Context/UserContext';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import CreatePool from '../CreatePool';

const PoolForms = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <Header profile = {user.username}> </Header>
      <div className="page">
        <SideBar />
        <CreatePool />
      </div>
    </>
  );
};

export default PoolForms;
