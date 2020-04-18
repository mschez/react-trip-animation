import PropTypes from 'prop-types';

const LEFT_ROUND = 'LEFT_ROUND';
const RIGHT_ROUND = 'RIGHT_ROUND';

const Journey = (props) => {
  if (props.children.length !== 2) {
    throw new Error('Journey must receive an Origin and a Destination');
  }

  return props.children;
};

Journey.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  cubicBezier: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  deep: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  delay: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  duration: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  ghostPathColor: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  ghostPathDashArray: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  ghostPathWeight: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  keepPathOnFinish: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  pathColor: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  pathIcon: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  pathIconSize: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  pathWeight: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  roundSide: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  showGhostPath: PropTypes.bool,
};

Journey.defaultProps = {
  cubicBezier: '0.8 0.12 0.2 0.9',
  deep: 8,
  delay: 2000,
  duration: 4000,
  ghostPathColor: 'white',
  ghostPathDashArray: '4,10',
  ghostPathWeight: 2,
  keepPathOnFinish: true,
  pathColor: 'red',
  pathIcon: null,
  pathIconSize: 40,
  pathWeight: 3,
  roundSide: null,
  showGhostPath: false,
};

Journey.roundSide = {
  LEFT_ROUND,
  RIGHT_ROUND,
};

export default Journey;
