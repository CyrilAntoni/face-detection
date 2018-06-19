import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div className="white text-shadow pb4">
      <div className="f2">{name}, you are rank</div>
      <div className="f1">{entries}</div>
    </div>
  );
};

export default Rank;