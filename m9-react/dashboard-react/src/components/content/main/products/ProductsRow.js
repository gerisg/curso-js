import React from 'react';

function ProductsRow(props) {
  return (
    <tbody>
      { 
        props.products.map( (product, i) => {
          return (
            <tr key={`${i}-product`}>
              <td>{ product.name }</td>
              <td>{ product.description }</td>
              <td>{ product.price }</td>
              <td>
                <ul>
                  { product.categories.map( (category, i) => <li key={`${i}-category`}>{ category }</li>) }
                </ul>
              </td>
              <td>
                <ul>
                  { product.colors.map( (color, i) => <li key={`${i}-color`} className={`text-${ color.color }`}>{ color.name }</li>) }
                </ul>
              </td>
              <td>{ product.stock }</td>
            </tr>
          );
        })
      }
    </tbody>
  );
}

export default ProductsRow;