import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import target from './logo.svg';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br4 shadow-2" options={{ max : 55, scale : 1 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner"><img src={target} alt="logo" /></div>
      </Tilt>
    </div>
  );
};

export default Logo;