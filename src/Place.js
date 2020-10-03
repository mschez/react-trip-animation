import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

let Marker = null;
let L = null;

const Place = ({
  markerIcon: MarkerIcon,
  markerAnchor,
  position,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(
    () => {
      // eslint-disable-next-line global-require
      ({ Marker } = require('react-leaflet'));
      // eslint-disable-next-line global-require
      ({ L } = require('leaflet'));

      setIsBrowser(true);
    },
    [],
  );

  if (isBrowser && MarkerIcon) {
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
