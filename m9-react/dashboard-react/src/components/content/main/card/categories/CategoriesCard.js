import React from 'react';
import Category from './Category';

function CategoriesCard() {
  return (
    <div className="col-lg-6 mb-4">						
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <Category name='Category 01' />
            <Category name='Category 02' />
            <Category name='Category 03' />
            <Category name='Category 04' />
            <Category name='Category 05' />
            <Category name='Category 06' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesCard;