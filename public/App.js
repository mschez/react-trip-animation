import React, { useState } from 'react';

import {
  Destination,
  Journey,
  Origin,
  Trip,
} from '../src';
import iconDark from './iconDark.png';
import iconLight from './iconLight.png';
import iconAccent from './iconAccent.png';
import Marker from './Marker';

// eslint-disable-next-line max-len
const TILE_DARK = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
// eslint-disable-next-line max-len
const TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';
// eslint-disable-next-line max-len
const TILE_WATERCOLOR = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png';
// eslint-disable-next-line max-len
const TILE_TONER = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png';

const journeyPredefinedStyle = {
  [TILE_DARK]: {
    pathIcon: iconLight,
  },
  [TILE_LIGHT]: {
    pathIcon: iconDark,
  },
  [TILE_TONER]: {
    pathIcon: iconAccent,
  },
  [TILE_WATERCOLOR]: {
    pathIcon: iconDark,
  },
};

const defaultTripState = {
  delayStart: 2000,
  fitWorld: false,
  flyDuration: 2000,
  height: '100%',
  mode: Trip.mode.SEGMENT,
  tile: TILE_DARK,
  width: '100%',
};

const defaultJurneyState = {
  cubicBezier: '0.8 0.12 0.2 0.9',
  deep: 8,
  delay: 2000,
  duration: 6000,
  ghostPathColor: 'white',
  ghostPathDashArray: '4,10',
  ghostPathWeight: 2,
  keepPathOnFinish: true,
  pathColor: 'turquoise',
  pathIcon: iconLight,
  pathWeight: 3,
  reset: true,
  roundSide: null,
  showGhostPath: true,
};

const JourneyDemo = () => {
  const [selected, setSelected] = useState(0);
  const [trip, setTrip] = useState(defaultTripState);
  const [barcelonaDoha, setBarcelonaDoha] = useState(defaultJurneyState);
  const [dohaHanoi, setDohaHanoi] = useState(defaultJurneyState);

  const journeys = [barcelonaDoha, dohaHanoi];
  const setters = [setBarcelonaDoha, setDohaHanoi];

  const handleTrip = (event) => {
    event.persist();

    let { value } = event.target;

    if (event.target.type === 'number') {
      value = +event.target.value;
    }

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    if (
      event.target.name === 'tile'
    ) {
      setBarcelonaDoha((prev) => ({
        ...prev,
        ...journeyPredefinedStyle[value],
      }));
      setDohaHanoi((prev) => ({
        ...prev,
        ...journeyPredefinedStyle[value],
      }));
    }

    setTrip((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  const handleChangeJurney = (event) => {
    event.persist();

    let { value } = event.target;

    if (event.target.type === 'number') {
      value = +event.target.value;
    }

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    setters[selected]((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="map">
        <Trip
          delayStart={trip.delayStart}
          fitWorld={trip.fitWorld}
          height={trip.height}
          key={JSON.stringify({ bd: barcelonaDoha, dh: dohaHanoi, t: trip })}
          mode={trip.mode}
          tile={trip.tile}
          width={trip.width}
        >
          <Journey
            deep={barcelonaDoha.deep}
            delay={barcelonaDoha.delay}
            duration={barcelonaDoha.duration}
            ghostPathColor={barcelonaDoha.ghostPathColor}
            ghostPathDashArray={barcelonaDoha.ghostPathDashArray}
            ghostPathWeight={barcelonaDoha.ghostPathWeight}
            keepPathOnFinish={barcelonaDoha.keepPathOnFinish}
            pathColor={barcelonaDoha.pathColor}
            pathIcon={barcelonaDoha.pathIcon}
            pathIconSize={40}
            pathWeight={barcelonaDoha.pathWeight}
            roundSide={barcelonaDoha.roundSide}
            showGhostPath={barcelonaDoha.showGhostPath}
          >
            <Origin
              markerAnchor={[16, 24]}
              markerIcon={<Marker />}
              position={[41.3887901, 2.1589899]}
            />
            <Destination
              markerAnchor={[16, 24]}
              markerIcon={<Marker />}
              position={[25.286106, 51.534817]}
            />
          </Journey>
          <Journey
            deep={dohaHanoi.deep}
            delay={dohaHanoi.delay}
            duration={dohaHanoi.duration}
            ghostPathColor={dohaHanoi.ghostPathColor}
            ghostPathDashArray={dohaHanoi.ghostPathDashArray}
            ghostPathWeight={dohaHanoi.ghostPathWeight}
            keepPathOnFinish={dohaHanoi.keepPathOnFinish}
            pathColor={dohaHanoi.pathColor}
            pathIcon={dohaHanoi.pathIcon}
            pathIconSize={40}
            pathWeight={dohaHanoi.pathWeight}
            roundSide={dohaHanoi.roundSide}
            showGhostPath={dohaHanoi.showGhostPath}
          >
            <Origin
              markerAnchor={[16, 24]}
              markerIcon={<Marker />}
              position={[25.286106, 51.534817]}
            />
            <Destination
              markerAnchor={[16, 24]}
              markerIcon={<Marker />}
              position={[21.028511, 105.804817]}
            />
          </Journey>
        </Trip>
      </div>
      <div className="controls">
        <h1>
          React Trip Animation
        </h1>
        <div className="explain">
          Demo props for
          {' '}
          <a href="https://github.com/mschez/react-trip-animation/">
            React Trip Animation
          </a>
        </div>
        <div className="panel">
          <h3>
            Trip
          </h3>
          <section>
            <div className="title">
              Tile
            </div>
            <div className="explain">
              The
              {' '}
              <strong>tile</strong>
              {' '}
              prop defines the map skin. It is based on the standard map
              tiles system. You can find your favourite
              {' '}
              <a
                href="http://leaflet-extras.github.io/leaflet-providers/preview"
              >
                here
              </a>
              {' '}
              (even you can build your own).
            </div>
            <div className="option-wrapper">
              <select
                name="tile"
                onChange={handleTrip}
                value={trip.tile}
              >
                <option value={TILE_DARK}>Dark</option>
                <option value={TILE_LIGHT}>Light</option>
                <option value={TILE_WATERCOLOR}>Watercolor</option>
                <option value={TILE_TONER}>Toner</option>
              </select>
            </div>
          </section>
          <section>
            <div className="title">
              Mode
            </div>
            <div className="explain">
              <strong>mode</strong>
              {' '}
              prop describes the way the map play with the diferent journeys
              defined in the map.
            </div>
            <div className="option-wrapper">
              <select
                name="mode"
                onChange={handleTrip}
                value={trip.mode}
              >
                <option value={Trip.mode.ALL}>ALL</option>
                <option value={Trip.mode.SEGMENT}>SEGMENT</option>
              </select>
            </div>
          </section>
          <section>
            <div className="title">
              Delay Start
            </div>
            <div className="explain">
              <strong>delayStart</strong>
              {' '}
              prop allows you to add time before the animation start
            </div>
            <div className="option-wrapper">
              <input
                name="delayStart"
                onChange={handleTrip}
                type="text"
                value={trip.delayStart}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Fly Duration
            </div>
            <div className="explain">
              <strong>flyDuration</strong>
              {' '}
              prop configures the time of the initial animation and the
              time between the different journeys animation (fly animation)
            </div>
            <div className="option-wrapper">
              <input
                name="flyDuration"
                onChange={handleTrip}
                type="text"
                value={trip.flyDuration}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Fit World
            </div>
            <div className="explain">
              <strong>fitWorld</strong>
              {' '}
              prop allows to change the initial point to start the animation to
              fit the world
            </div>
            <div className="option-wrapper">
              <label htmlFor="fitWorld-option">
                <input
                  checked={trip.fitWorld}
                  id="fitWorld-option"
                  name="fitWorld"
                  onChange={handleTrip}
                  type="checkbox"
                />
                Fit World
              </label>
            </div>
          </section>
          <section>
            <div className="title">
              Reset
            </div>
            <div className="explain">
              <strong>reset</strong>
              {' '}
              prop allows to reset the animation on finish
            </div>
            <div className="option-wrapper">
              <label htmlFor="fitWorld-option">
                <input
                  checked={trip.reset}
                  id="reset-option"
                  name="reset"
                  onChange={handleTrip}
                  type="checkbox"
                />
                Reset
              </label>
            </div>
          </section>
        </div>
        <div className="panel">
          <h3>
            Journeys
          </h3>
          <section>
            <div className="title">
              Journey
            </div>
            <div className="explain">
              Select the journey to configure the props individually
            </div>
            <div className="option-wrapper">
              <select
                onChange={(event) => setSelected(event.target.value)}
                value={selected}
              >
                <option value={0}>Barcelona - Doha</option>
                <option value={1}>Doha - Hanoi</option>
              </select>
            </div>
          </section>
          <section>
            <div className="title">
              Cubic Bezier
            </div>
            <div className="explain">
              <strong>cubicBezier</strong>
              {' '}
              describes the ease animation between the origin and destination.
              You can calculate it
              {' '}
              <a
                href="http://franzheidl.github.io/keysplines/"
              >
                here
              </a>
            </div>
            <div className="option-wrapper">
              <input
                name="cubicBezier"
                onChange={handleChangeJurney}
                type="text"
                value={journeys[selected].cubicBezier}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Deep
            </div>
            <div className="explain">
              <strong>deep</strong>
              {' '}
              prop defines the curvature of the path between the origin and
              destination.
            </div>
            <div className="option-wrapper">
              <input
                name="deep"
                onChange={handleChangeJurney}
                type="number"
                value={+journeys[selected].deep}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Delay
            </div>
            <div className="explain">
              <strong>delay</strong>
              {' '}
              prop allows to add a time before start the animation for the
              journey
            </div>
            <div className="option-wrapper">
              <input
                name="delay"
                onChange={handleChangeJurney}
                type="number"
                value={+journeys[selected].delay}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Duration
            </div>
            <div className="explain">
              <strong>duration</strong>
              {' '}
              prop defines the journey duration
            </div>
            <div className="option-wrapper">
              <input
                name="duration"
                onChange={handleChangeJurney}
                type="number"
                value={+journeys[selected].duration}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Show Ghost Path
            </div>
            <div className="explain">
              <strong>showGhostPath</strong>
              {' '}
              prop allows to show a ghost path.
            </div>
            <div className="option-wrapper">
              <label htmlFor="showGhostPath-option">
                <input
                  checked={journeys[selected].showGhostPath}
                  id="showGhostPath-option"
                  name="showGhostPath"
                  onChange={handleChangeJurney}
                  type="checkbox"
                />
                Show Ghost Path
              </label>
            </div>
          </section>
          {journeys[selected].showGhostPath && (
            <section>
              <div className="title">
                Ghost Path Color
              </div>
              <div className="explain">
                <strong>ghostPathColor</strong>
                {' '}
                prop defines the color of the ghost path
              </div>
              <div className="option-wrapper">
                <input
                  name="ghostPathColor"
                  onChange={handleChangeJurney}
                  type="text"
                  value={journeys[selected].ghostPathColor}
                />
              </div>
            </section>
          )}
          {journeys[selected].showGhostPath && (
            <section>
              <div className="title">
                Ghost Path Dash Array
              </div>
              <div className="explain">
                <strong>ghostPathDashArray</strong>
                {' '}
                prop defines the style of the ghost path
              </div>
              <div className="option-wrapper">
                <input
                  name="ghostPathDashArray"
                  onChange={handleChangeJurney}
                  type="text"
                  value={journeys[selected].ghostPathDashArray}
                />
              </div>
            </section>
          )}
          {journeys[selected].showGhostPath && (
            <section>
              <div className="title">
                Ghost Path Weight
              </div>
              <div className="explain">
                <strong>ghostPathWeight</strong>
                {' '}
                prop defines the weight of the ghost path
              </div>
              <div className="option-wrapper">
                <input
                  name="ghostPathWeight"
                  onChange={handleChangeJurney}
                  type="number"
                  value={+journeys[selected].ghostPathWeight}
                />
              </div>
            </section>
          )}
          <section>
            <div className="title">
              Keep path on finish
            </div>
            <div className="explain">
              <strong>keepPathOnFinish</strong>
              {' '}
              prop allows to hide/show de path after finish
            </div>
            <div className="option-wrapper">
              <label htmlFor="keepPathOnFinish-option">
                <input
                  checked={journeys[selected].keepPathOnFinish}
                  id="keepPathOnFinish-option"
                  name="keepPathOnFinish"
                  onChange={handleChangeJurney}
                  type="checkbox"
                />
                keepPathOnFinish
              </label>
            </div>
          </section>
          <section>
            <div className="title">
              Path Color
            </div>
            <div className="explain">
              <strong>pathColor</strong>
              {' '}
              props defines the color of the path
            </div>
            <div className="option-wrapper">
              <input
                name="pathColor"
                onChange={handleChangeJurney}
                type="text"
                value={journeys[selected].pathColor}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Path Weight
            </div>
            <div className="explain">
              <strong>pathWeight</strong>
              {' '}
              props defines the weight of the path
            </div>
            <div className="option-wrapper">
              <input
                name="pathWeight"
                onChange={handleChangeJurney}
                type="number"
                value={+journeys[selected].pathWeight}
              />
            </div>
          </section>
          <section>
            <div className="title">
              Round Side
            </div>
            <div className="explain">
              <strong>roundSide</strong>
              {' '}
              prop allows to change the way of the curvature
            </div>
            <div className="option-wrapper">
              <select
                name="roundSide"
                onChange={handleChangeJurney}
                value={trip.roundSide}
              >
                <option value={null}>none</option>
                <option value={Journey.roundSide.LEFT_ROUND}>Left</option>
                <option value={Journey.roundSide.RIGHT_ROUND}>Right</option>
              </select>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JourneyDemo;
