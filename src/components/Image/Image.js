import React from 'react';
import './Image.css';

const Image = ({ imageUrl, faceArea }) => {
  
  const faceBox = faceArea.map((v, i) => {
    return (
      <div key={i} className="bounding-box" style={{top: v.top_row, bottom: v.bottom_row, left: v.left_col, right: v.right_col}}></div>
    );
  });
  
  return (
    <div id="bounding-box-container" className="pa2">
      <img id="image-detection" alt="" src={imageUrl} />
      {faceBox}
    </div>
  );
};

export default Image;