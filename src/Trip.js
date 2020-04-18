/* eslint-disable no-underscore-dangle */
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

import Path from './Path';

import './SVG';

import 'leaflet/dist/leaflet.css';
import './Trip.css';

const SEGMENT = 'segment';
const ALL = 'all';

const Trip = ({
  children,
  className,
  delayStart,
  fitWorld,
  flyDuration,
  height,
  in: inProp,
  mode,
  reset,
  tile,
  width,
}) => {
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
      const journeys = computeJourneys();
      const layerGroup = L.layerGroup(journeys);

      layerGroup.addTo(map.current.leafletElement);
      setGroup(layerGroup);
    },
    [],
  );

  useEffect(
    () => {
      if (fitWorld) {
        map.current.leafletElement.fitWorld();
      }
    },
    [group],
  );

  useEffect(
    () => {
      if (inProp) {
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
    [inProp],
  );

  useEffect(
    () => {
      const layers = group && group.getLayers();

      if (layers && layers[current]) {
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
      } else if (current && !layers[current] && reset) {
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
    [current],
  );

  return (
    <div
      className={className}
      style={{ height, width }}
    >
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
  reset: true,
  tile: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
  width: '100%',
};

Trip.mode = {
  ALL,
  SEGMENT,
};

export default Trip;
