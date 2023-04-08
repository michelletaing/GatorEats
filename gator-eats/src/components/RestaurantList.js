import React, { useState } from 'react';

const RestaurantList = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const restaurants = [
    { id: 1, name: 'Restaurant A' },
    { id: 2, name: 'Restaurant B' },
    { id: 3, name: 'Restaurant C' },
    { id: 4, name: 'Restaurant D' },
    { id: 5, name: 'Restaurant E' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Restaurant List</h2>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          style={{
            padding: '10px',
            backgroundColor:
              selectedRestaurant?.id === restaurant.id ? '#f2f2f2' : 'white',
            cursor: 'pointer',
          }}
          onClick={() => handleRestaurantClick(restaurant)}
        >
          {restaurant.name}
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
