import React from 'react';
import MyCalendar from '../../components/calendar';
import NavBar from '../../components/NavBar';
import RestaurantList from '../../components/RestaurantList';

const HomePage = () => {
  return (
    <div>
      <div style={{ display: 'flex', marginTop: '50px'}}>
        <div style={{ padding: '20px' ,flex:1,position : 'relative'}}>
          <MyCalendar />
          <RestaurantList />
        </div>
        <div style={{ flex: 3 }}>
          <h1>Insert Restaurant View Here</h1>
          <p>This is the home page.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
