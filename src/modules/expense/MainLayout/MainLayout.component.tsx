import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../../shared/components/Header/Header.component';
import  './MainLayout.css';


class MainLayout extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
            <Outlet/>
        </div>
      </div>
    );
  }
}

export default MainLayout;
