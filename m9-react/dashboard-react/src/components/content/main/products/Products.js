import React from 'react';
import ProductsHeader from './ProductsHeader';
import ProductsRow from './ProductsRow';
import './Products.css';

const products = [
  { 
    name: 'Tiger Nixon', 
    description: 'System Architect', 
    price: 320800, 
    categories: ['Category 01','Category 02','Category 03'],
    colors: [{ name: 'Red', color: 'danger' }, { name: 'Blue', color: 'primary' }, { name: 'Green', color: 'success' }],
    stock: 245
  },
  { 
    name: 'Jane Doe', 
    description: 'Fullstack Developer', 
    price: 320800, 
    categories: ['Category 01','Category 02','Category 03'],
    colors: [{ name: 'Red', color: 'danger' }, { name: 'Blue', color: 'primary' }, { name: 'Green', color: 'success' }],
    stock: 245
  }
];

function Products() {
  return(
    <div className="table-responsive">
      <table className="table table-bordered">
        <ProductsHeader colsName={ Object.keys(products[0]) } />
        <ProductsRow products= { products } />
        <ProductsHeader colsName={ Object.keys(products[0]) } />
      </table>
    </div>
  );
}

export default Products;