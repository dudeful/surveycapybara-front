import React from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import CreatePool from '../CreatePool';

const PoolForms = () =>{
    return (
        <>
          <Header> </Header>
            <div className="page">
                <SideBar itens={[{name:"teste", code:"ea78cc88"}]} />
                <CreatePool />
            </div>
        </>
      );
}

export default PoolForms;