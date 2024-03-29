import React from 'react';

const Map = props => {
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <p>{props.address}</p>
    </div>
  );
};

export default Map;