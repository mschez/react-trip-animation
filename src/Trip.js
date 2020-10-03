/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const ALL = 'all';
const CANVAS = 'canvas';
const SEGMENT = 'segment';
const SVG = 'svg';

let Path = null;
let Map = null;
let TileLayer = null;

const Trip = ({
  children,
  className,
  delayStart,
  fitWorld,
  flyDuration,
  height,
  in: inProp,
  mode,
  renderer,
  reset,
  tile,
  width,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [current, setCurrent] = useState(null);
  const [group, setGroup] = useState(null);
  const map = useRef(null);
  const bounds = [];

  React.Children.forEach(children, (child) => {
    const from = (
      child.props.children[0]
      && child.props.children[0].props
      && child.props.children[0].props.position
    );
    const to = (
      child.props.children[1]
      && child.props.children[1].props
      && child.props.children[1].props.position
    );

    if (from && to) {
      bounds.push(from);
      bounds.push(to);
    }
  });

  const computeJourneys = () => {
    const journeys = [];

    React.Children.forEach(children, (child) => {
      const from = (
        child.props.children[0]
        && child.props.children[0].props
        && child.props.children[0].props.position
      );
      const to = (
        child.props.children[1]
        && child.props.children[1].props
        && child.props.children[1].props.position
      );

      if (from && to) {
        const {
          cubicBezier,
          deep,
          delay,
          duration,
          keepPathOnFinish,
          pathColor,
          pathIcon,
          pathIconSize,
          pathWeight,
          roundSide,
          showGhostPath,
          ghostPathDashArray,
          ghostPathColor,
          ghostPathWeight,
        } = child.props;
        const route = new Path(
          {
            from,
            to,
          },
          {
            color: pathColor,
            cubicBezier,
            deep,
            delay,
            duration,
            ghostColor: ghostPathColor,
            ghostDashArray: ghostPathDashArray,
            ghostWeight: ghostPathWeight,
            icon: pathIcon,
            iconSize: pathIconSize,
            keepPathOnFinish,
            roundSide,
            showGhostPath,
            weight: pathWeight,
          },
        );
        journeys.push(route);
      }
    });

    return journeys;
  };

  useEffect(
    () => {
      if (isBrowser) {
        // eslint-disable-next-line global-require
        const L = require('leaflet');
        const journeys = computeJourneys();
        const layerGroup = L.layerGroup(journeys);

        if (map.current) {
          layerGroup.addTo(map.current.leafletElement);
        }

        setGroup(layerGroup);
      }
    },
    [isBrowser, map.current],
  );

  useEffect(
    () => {
      if (fitWorld && map.current) {
        map.current.leafletElement.fitWorld();
      }
    },
    [group, map.current],
  );

  useEffect(
    () => {
      if (inProp && map.current) {
        setTimeout(
          () => {
            map.current.leafletElement.once('moveend', () => {
              setCurrent(0);
            });

            // All route is visible
            if (mode === ALL && fitWorld) {
              map.current.leafletElement.flyToBounds(
                bounds,
                {
                  duration: flyDuration / 1000,
                },
              );
            } else {
              setCurrent(0);
            }
          },
          delayStart,
        );
      }
    },
    [inProp, map.current],
  );

  useEffect(
    () => {
      const layers = group && group.getLayers();

      if (layers && layers[current] && map.current) {
        map.current.leafletElement.once('moveend', () => {
          layers[current].start().then(() => setCurrent(current + 1));
        });

        // Current Segment
        // Fly to the segment bound
        if (mode === SEGMENT) {
          map.current.leafletElement.flyToBounds(
            layers[current].getBounds(),
            {
              duration: flyDuration / 1000,
            },
          );
        } else {
          layers[current].start().then(() => setCurrent(current + 1));
        }
      } else if (current && !layers[current] && map.current && reset) {
        if (fitWorld) {
          map.current.leafletElement.fitWorld();
        } else {
          map.current.leafletElement.flyToBounds(
            bounds,
            {
              duration: flyDuration / 1000,
            },
          );
        }
      }
    },
    [current, map.current],
  );

  useEffect(
    () => {
      if (renderer === 'SVG') {
        // eslint-disable-next-line global-require
        require('./SVG');
      } else {
        // eslint-disable-next-line global-require
        require('./Canvas');
      }
      // eslint-disable-next-line global-require
      require('leaflet/dist/leaflet.css');
      // eslint-disable-next-line global-require
      require('./Trip.css');
      // eslint-disable-next-line global-require
      (Path = require('./Path').default);
      // eslint-disable-next-line global-require
      ({ Map, TileLayer } = require('react-leaflet'));

      setIsBrowser(true);
    },
    [],
  );

  return (
    <div
      className={className}
      style={{ height, width }}
    >
      {isBrowser && Map && TileLayer && (
        <Map
          attributionControl={false}
          bounds={bounds}
          boxZoom={false}
          doubleClickZoom={false}
          dragging={false}
          keyboard={false}
          ref={map}
          scrollWheelZoom={false}
          tap={false}
          touchZoom={false}
          useFlyTo
          zoomControl={false}
        >
          <TileLayer
            url={tile}
          />
          <>
            {children}
          </>
        </Map>
      )}
    </div>
  );
};

Trip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delayStart: PropTypes.number,
  fitWorld: PropTypes.bool,
  flyDuration: PropTypes.number,
  height: PropTypes.string,
  in: PropTypes.bool,
  mode: PropTypes.oneOf([SEGMENT, ALL]),
  renderer: PropTypes.oneOf([SVG, CANVAS]),
  reset: PropTypes.bool,
  tile: PropTypes.string,
  width: PropTypes.string,
};

Trip.defaultProps = {
  className: '',
  delayStart: 0,
  fitWorld: false,
  flyDuration: 2000,
  height: '400px',
  in: true,
  mode: ALL,
  renderer: SVG,
  reset: true,
  tile: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
  width: '100%',
};

Trip.mode = {
  ALL,
  SEGMENT,
};

export default Trip;
