import React from 'react';

function ProductsHeader(props) {
  return (
    <thead>
      <tr>
        { props.colsName.map( (colName, i) => <th key={`${colName}-${i}`} scope="col">{ colName }</th>) }
      </tr>
    </thead>
  );
}

export default ProductsHeader;