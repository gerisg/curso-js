import React from 'react';
import ResumeCard from './card/ResumeCard';
import LastProductCard from './card/LastProductCard';
import CategoriesCard from './card/categories/CategoriesCard';
import MainTitle from './MainTitle'

function Main() {
  return (
    <div className="container-fluid">
      <MainTitle />
      <div className="row">
        <ResumeCard name='Products in Data Base' value='135' icon='fas fa-clipboard-list' border='border-left-primary' />
        <ResumeCard name='Amount in products' value='$546.456' icon='fas fa-dollar-sign' border='border-left-success' />
        <ResumeCard name='Users quantity' value='38' icon='fas fa-user-check' border='border-left-warning' />
      </div>
      <div className="row">
        <LastProductCard />
        <CategoriesCard />
      </div>
    </div>
  );
}

export default Main;