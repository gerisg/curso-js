import React from 'react';

function Card(props) {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card ${ props.border } shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{ props.name }</div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">{ props.value }</div>
          </div>
          <div className="col-auto">
            <i className={` ${ props.icon } fa-2x text-gray-300`}></i>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;