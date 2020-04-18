/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const Marker = ({ color, size }) => (
  <svg
    height={size}
    viewBox="0 0 48 48"
    width={size}
  >
    <g>
      <path
        d="M18.72,8.31a10.79,10.79,0,0,0-5.17,5.24A12.74,12.74,0,0,0,14.7,26.81l9.93,14.25,9.92-14.25A12.33,12.33,0,0,0,37,19.36C37,10.6,28,4,18.72,8.31Zm6.08,15.2A4.51,4.51,0,1,1,29.3,19,4.51,4.51,0,0,1,24.8,23.51Z"
        fill={color}
      />
    </g>
  </svg>
);

Marker.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

Marker.defaultProps = {
  color: 'red',
  size: '30px',
};

export default Marker;
