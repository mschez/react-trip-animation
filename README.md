# React Trip Animation

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mschezes%40gmail%2ecom&lc=ES&item_name=Miguel%20S%c3%a1nchez&item_number=github&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest) [![npm](https://img.shields.io/npm/v/react-trip-animation.svg?)](http://badge.fury.io/js/react-trip-animation) [![npm](https://img.shields.io/npm/dt/react-trip-animation.svg)]() [![npm](https://img.shields.io/npm/l/react-trip-animation.svg)](https://opensource.org/licenses/MIT)

## Demo

Check the [demo](https://mschez.github.io/react-trip-animation/public).


## Installation

You can install `react-trip-animation` by executing this command:

```
npm install --save react-trip-animation
```

When the installation process ends, you are ready to import `react-trip-animation` to your project.


## How to Use

To use `react-trip-animation` you have to import the component in your project:

```javascript
import { Destination, Journey, Origin, Trip } from 'react-trip-animation';

/* Barcelona to Doha, Doha to Hanoi */
const TripAnimation = () => (
  <Trip>
    <Journey>
      <Origin position={[41.3887901, 2.1589899]} />
      <Destination position={[25.286106, 51.534817]} />
    </Journey>
    <Journey>
      <Origin position={[25.286106, 51.534817]} />
      <Destination position={[21.028511, 105.804817]} />
    </Journey>
  </Trip>
);
```

You can add more properties to `react-trip-animation`, see the list of available properties in [Properties](#properties) section.

## Trip Component Properties

### className (*String*)
> Default: *''*

The class name to wrap the *Trip* component.

### delayStart (*Number* milliseconds)
> Default: *0*

Defines time to wait before start the animation.

### fitWorld (*Boolean*)
> Default: *false*

The animation will start with the map adjusted to the whole view of the world.

### flyDuration (*number* milliseconds)
> Default: *2000*

Defines the time spent to move between the different scenes (initial animation and the time between the different journeys animation).

### height (*String*)
> Default: *'100%'*

Height size. It will override the size specified in the *className* prop.

### in (*Boolean*)
> Default: *true*

This prop stops the inmediately starting. The animation will not start until *in* is true.

### mode (*String*: **Trip.mode.ALL** | **Trip.mode.SEGMENT**)
> Default: *Trip.mode.ALL*

It defines the whole animation scene:
- *Trip.mode.ALL*: The map view will fit to the bounds of all journeys and never will move.
- *Trip.mode.SEGMENT*: The map view will fit to the bounds of the current segment.

### reset (*Boolean*)
> Default: *true*

Allows to reset the animation on finish.

### tile (*String*)
> Default: *'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'*

Defines the map skin. It is based on the standard map tiles system. You can find your favourite [here](http://leaflet-extras.github.io/leaflet-providers/preview).

### width (*String*)
> Default: *'100%'*

Width size. It will override the size specified in the *className* prop.

## Journey Component Properties

### cubicBezier (*String*)
> Default: *'0.8 0.12 0.2 0.9'*

Describes the ease animation between the origin and destination. You can calculate it [here](http://franzheidl.github.io/keysplines/).

### deep (*Number*)
> Default: *8*

Defines the curvature of the path between the origin and destination.

### delay (*Number* milliseconds)
> Default: *2000*

Allows to add a time before start the animation for the journey.

### duration (*Number* milliseconds)
> Default: *4000*

Defines the journey duration.

### ghostPathColor (*String*)
> Default: *'white'*

Defines the color of the ghost path.

### ghostPathDashArray (*String*)
> Default: *'4,10'*

Defines the style of the ghost path (more [info](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)).

### ghostPathWeight (*Number*)
> Default: *2*

Defines the weight of the ghost path.

### keepPathOnFinish (*Boolean*)
> Default: *true*

Allows to hide/show de path after finish the animation in the journey.

### pathColor (*String*)
> Default: *'red'*

Defines the color of the path.

### pathIcon (*Image* url|base64)
> Default: *null*

Defines the icon that follows the path (plane icon for instance).

### pathIconSize (*Number*)
> Default: *40*

Defines the size of the icon.

### pathWeight (*Number*)
> Default: *3*

Defines the weight of the path.

### roundSide (*String*: **Journey.roundSide.LEFT_ROUND** | **Journey.roundSide.RIGHT_ROUND**)
> Default: *null*

Allows to change the way of the curvature.

### showGhostPath (*Boolean*)
> Default: *false*

Allows to show a ghost path between the origin and destination.

## Origin and Destination Component Properties

### markerAnchor (*Array*)
> Default: *[]*,

The anchor position to center the marker on the right point.

### markerIcon (*Node|Element*)
> Default: *null*

A React element to set as marker.

### position (*Array*)
> Required

The coordinates of the place to set as origin or destination. [*lat*, *lng*].


## Roadmap

- [ ] Anotations
- [ ] Train journeys
- [ ] Boat journeys