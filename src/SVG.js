/* eslint-disable no-underscore-dangle */
import L from 'leaflet';

L.SVG.include({
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
  _updatecurve(layer) {
    const svgPath = this._curvePointsToPath(layer._points);

    this.options = { padding: 1 };
    this._setPath(layer, svgPath);
  },
});
