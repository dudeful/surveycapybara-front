import React from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import CreatePool from '../CreatePool';

const PoolForms = () =>{
    return (
        <>
          <Header> </Header>
            <div className="page">
                <SideBar />
                <CreatePool />
            </div>
        </>
      );
}

export default PoolForms;