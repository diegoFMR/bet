import SideBar from "../components/SideBar";
import {Outlet } from 'react-router-dom';

function SharedLayout() {

  return (
    <div className='section'>
      <div className="bar-container" id="bar-container">
        <SideBar/>
      </div>
      <div className="content-container">
        <Outlet/>
      </div>
    </div>
  );
};

export default SharedLayout;
