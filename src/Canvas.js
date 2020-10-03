/* eslint-disable no-underscore-dangle */
import L from 'leaflet';

L.Canvas.include({
  _animationElement: null,
  _clear() {
    this._animationElement.getContext('2d').clearRect(
      0,
      0,
      this._animationElement.width,
      this._animationElement.height,
    );
  },
  _curvePointsToPath(points) {
    let point = '';
    let curCommand = '';
    let str = '';

    for (let i = 0; i < points.length; i += 1) {
      point = points[i];

      if (typeof point === 'string' || point instanceof String) {
        curCommand = point;
        str += curCommand;
      } else {
        str += `${point.x},${point.y} `;
      }
    }

    return str || 'M0 0';
  },
  _redraw() {
    if (!this._canvasAnimating) {
      this._clear();
      const ctx = this._animationElement.getContext('2d');
      this._curveFillStroke(this._path2d, ctx);
    }
  },
  _reset() {
    const topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._animationElement, topLeft);

    this._redraw();
  },
  _resize() {
    const size = this._map.getSize();
    this._animationElement.width = size.x;
    this._animationElement.height = size.y;

    this._reset();
  },
  _updateCurve() {
    this._project();

    const pathString = this._curvePointsToPath(this._points);

    this._pathSvgElement.setAttribute('d', pathString);

    if (
      this.options.animate
      // && typeof(TWEEN) === 'object'
      && this._canvasSetDashArray
    ) {
      this._pathLength = this._pathSvgElement.getTotalLength();
      this.options.dashArray = `${this._pathLength}`;
      this._renderer._updateDashArray(this);
    }

    this._path2d = new Path2D(pathString);

    if (this._animationElement) {
      this._reset();
    }
  },
});
