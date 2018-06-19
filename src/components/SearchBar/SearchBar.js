import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='flex flex-column items-center'>
      <div className='w-70 br3 flex flex-column items-center pb4 box shadow-5'>
        <p className="f3 white text-shadow">Past an image URL and target the faces!</p>
        <div className='flex justify-center w-50 box-input'>
          <input type="text" className="f4 pa2 w-70 br2 input-search" onChange={onInputChange} />
          <button 
            className="w-30 grow br2 bg-light-red white f4 link pointer btn-search"
            onClick={onButtonSubmit}
          >Target Face</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;