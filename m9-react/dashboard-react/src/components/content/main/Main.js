import React from 'react';
import Card from './card/Card';
import LastProductCard from './card/LastProductCard';
import CategoriesCard from './card/categories/CategoriesCard';
import Title from './Title'
import Products from './products/Products'

function Main() {

  const metrics = [
    { name: 'Products in Data Base', value: 135, icon: 'fas fa-clipboard-list', color: 'primary' },
    { name: 'Amount in products', value: '$546.456', icon: 'fas fa-dollar-sign', color: 'success' },
    { name: 'Users quantity', value: 38, icon: 'fas fa-user-check', color: 'warning' },
  ]

  return (
    <div className="container-fluid">

      <Title title="App Dashboard" />
      <div className="row">
        { metrics.map((metric, i) => <Card key={`${i}-metric`} metric={metric} />) }
      </div>
      
      <div className="row">
        <LastProductCard />
        <CategoriesCard />
      </div>
      
      <Title title="All the products in the Database" />
      <div className="card shadow">
        <div className="card-body">
          <Products />
        </div>
      </div>

    </div>
  );
}

export default Main;