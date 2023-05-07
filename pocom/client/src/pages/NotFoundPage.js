import React from 'react';
import '../styles/NotFoundPage.css';
import NotFound from '../images/NotFoundPage.png';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='notFoundPage'>
      <img src={NotFound} alt='NotFoundPage' />
      <Link to="/">
        <button className='button'>Volver a la página de inicio</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;