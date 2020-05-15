/* eslint-disable no-underscore-dangle */
import L from 'leaflet';

const RENDERER_LAYER_SELECTOR = '.leaflet-overlay-pane > svg';
const NS = 'http://www.w3.org/2000/svg';

export default L.Path.extend({
  _computeBounds() {
    const bound = new L.LatLngBounds();

    bound.extend(this._coords.from);
    bound.extend(this._coords.to);
    bound.extend(this._coords.mid);

    return bound;
  },
  _project() {
    this._points = [];
    this._points.push('M');

    let curPoint = this._map.latLngToLayerPoint(this._coords.from);
    this._points.push(curPoint);

    if (this._coords.mid) {
      this._points.push('Q');
      curPoint = this._map.latLngToLayerPoint(this._coords.mid);
      this._points.push(curPoint);
    }

    curPoint = this._map.latLngToLayerPoint(this._coords.to);
    this._points.push(curPoint);
  },
  _repaint() {
    if (!this._initialUpdate) {
      if (this._finalUpdate) {
        this._renderer._updatecurve(this);
      }

      const d = this._renderer._curvePointsToPath(this._points);
      this.ghostPath.setAttribute('d', d);
      const length = this.ghostPath.getTotalLength();

      this._path.setAttribute('stroke-dasharray', `${length} ${length}`);

      this.animate.setAttribute('from', length);
      this.animate.setAttribute('values', `${length};0`);

      if (this.options.icon) {
        this.animateMotion.setAttribute('path', d);
      }

      if (this.options.showGhostPath) {
        this.ghostPath.setAttribute('d', d);
      }
    }

    this._initialUpdate = false;
  },
  _setPath(path) {
    this._coords = path;
    this._bounds = this._computeBounds();
  },
  _update() {
    if (this._map) {
      this._repaint();
    }
  },
  getBounds() {
    return this._bounds;
  },
  getCenter() {
    this._bounds.getCenter();
  },
  getMidPoint(from, to, deep = 8, roundSide) {
    let offset = 3.14;

    if (
      roundSide === 'RIGHT_ROUND'
      || (!roundSide && from[1] > to[1])
    ) {
      offset *= -1;
    }

    const offsetX = to[1] - from[1];
    const offsetY = to[0] - from[0];

    const r = Math.sqrt((offsetX ** 2) + (offsetY ** 2));
    const thetaOffset = offset / deep;

    const r2 = (r / 2) / (Math.cos(thetaOffset));
    const theta = Math.atan2(offsetY, offsetX) + thetaOffset;

    const midpointX = (r2 * Math.cos(theta)) + from[1];
    const midpointY = (r2 * Math.sin(theta)) + from[0];

    return [midpointY, midpointX];
  },
  getPath() {
    return this._coords;
  },
  initialize(path, options) {
    if (!path.mid || path.mid[0] === undefined) {
      path.mid = this.getMidPoint(
        path.from,
        path.to,
        options.deep,
        options.roundSide,
      );
    }

    L.setOptions(this, options);
    this._initialUpdate = true;
    this._finalUpdate = false;
    this.setPath(path);
  },
  // Just after path is added
  onAdd() {
    // Init and pre-render the path
    this._renderer._initPath(this);
    this._reset();
    this._renderer._addPath(this);

    const svg = document.querySelector(RENDERER_LAYER_SELECTOR);
    const d = this._renderer._curvePointsToPath(this._points);
    // Generate an identifier to synchronize the animations smoothly
    const id = Math.random().toString(36).substring(2, 15);
    // Create a aux ghost path to get the lenght of the path, if ghostPath
    // is enable it will be use later.
    const ghostPath = document.createElementNS(NS, 'path');
    ghostPath.setAttribute('d', d);
    const length = ghostPath.getTotalLength();

    // Configure the dash array to the lenght to perform the animation
    this._path.setAttribute('stroke-dasharray', `${length} ${length}`);

    // Create an animate element to append within the _path to perform
    // the animation
    const animate = document.createElementNS(NS, 'animate');
    animate.setAttribute('attributeName', 'stroke-dashoffset');
    animate.setAttribute('begin', 'indefinite');
    animate.setAttribute('calcMode', 'spline');
    animate.setAttribute('dur', `${this.options.duration / 1000}s`);
    animate.setAttribute('from', length);
    animate.setAttribute('id', id);
    animate.setAttribute('keySplines', this.options.cubicBezier);
    animate.setAttribute('to', 0);
    animate.setAttribute('values', `${length};0`);
    this.animate = animate;
    this._path.appendChild(this.animate);

    if (!this.options.keepPathOnFinish) {
      const animateOpacity = document.createElementNS(NS, 'animate');
      animateOpacity.setAttribute('attributeName', 'opacity');
      animateOpacity.setAttribute('begin', 'indefinite');
      animateOpacity.setAttribute('begin', `${id}.end`);
      animateOpacity.setAttribute('dur', '0.5s');
      animateOpacity.setAttribute('from', 1.0);
      animateOpacity.setAttribute('to', 0);
      animateOpacity.setAttribute('values', '1;0');
      animateOpacity.setAttribute('fill', 'freeze');

      this._path.appendChild(animateOpacity);
    }

    // Create an animateMotion element to append within the icon to follow
    // the animate element
    if (this.options.icon) {
      const animateMotion = document.createElementNS(NS, 'animateMotion');
      animateMotion.setAttribute('begin', `${id}.begin`);
      animateMotion.setAttribute('calcMode', 'spline');
      animateMotion.setAttribute('dur', `${this.options.duration / 1000}s`);
      animateMotion.setAttribute('fill', 'freeze');
      animateMotion.setAttribute('keySplines', this.options.cubicBezier);
      animateMotion.setAttribute('keyTimes', '0;1');
      animateMotion.setAttribute('path', d);
      animateMotion.setAttribute('rotate', 'auto');
      this.animateMotion = animateMotion;

      // Create the icon
      const icon = document.createElementNS(NS, 'image');
      const size = this.options.iconSize;
      icon.setAttribute('height', size);
      icon.setAttribute('href', this.options.icon);
      icon.setAttribute('visibility', 'hidden');
      icon.setAttribute('width', size);
      icon.setAttribute('transform', `translate(-${size / 2},-${size / 2})`);
      icon.appendChild(animateMotion);

      this.icon = icon;
      svg.appendChild(this.icon);
    }

    if (this.options.showGhostPath) {
      const { ghostColor, ghostDashArray, ghostWeight } = this.options;

      ghostPath.setAttribute('stroke', ghostColor);
      ghostPath.setAttribute('fill', 'none');
      ghostPath.setAttribute('stroke-dasharray', ghostDashArray);
      ghostPath.setAttribute('stroke-width', ghostWeight);

      svg.prepend(ghostPath);
    }

    this.ghostPath = ghostPath;
  },
  options: {},
  setPath(path) {
    this._setPath(path);

    return this.redraw();
  },
  start() {
    return new Promise((resolve) => {
      const animateEnd = () => {
        this._finalUpdate = true;
        this.icon.setAttribute('visibility', 'hidden');

        resolve();
      };

      this.animate.addEventListener('endEvent', animateEnd);

      setTimeout(
        () => {
          this.icon.setAttribute('visibility', 'visible');
          this._renderer._updatecurve(this);
          this.animate.beginElement();
        },
        this.options.delay || 0,
      );
    });
  },
});
