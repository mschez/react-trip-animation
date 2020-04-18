import { Marker } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const Place = ({
  markerIcon: MarkerIcon,
  markerAnchor,
  position,
}) => {
  if (MarkerIcon) {
    const icon = L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(MarkerIcon),
      iconAnchor: markerAnchor,
      iconSize: 'auto',
    });

    return (
      <Marker
        icon={icon}
        position={position}
      />
    );
  }

  return null;
};

Place.propTypes = {
  markerAnchor: PropTypes.array,
  markerIcon: PropTypes.node,
  position: PropTypes.array.isRequired,
};

Place.defaultProps = {
  markerAnchor: [16, 24],
  markerIcon: null,
};

export default Place;
