import Stoplight from './objects/stoplight';
import TrafficManager from './objects/traffic_manager';
import TrafficLane from './objects/traffic_lane';
import eventEmitter from './pubsub';

var canvas = new fabric.Canvas('intersection');

// Create lane objects
const LANE_WIDTH = 20;
const LANE_HEIGHT = 100;
const LANE_SIDES = ['north', 'south', 'east', 'west'];
const LANE_DIRECTIONS = [
  'right',
  'straight',
  'straight',
  'left',
  'oncoming',
  'oncoming'
];
const LANE_NUMBERS = [0, 1, 2, 3, 4, 5];
const LANE_DIRECTION_BY_SIDE_FOR_INDEX = (side, index) => {
  switch (side) {
    case 'north':
    case 'east':
      return LANE_DIRECTIONS[index];
    case 'west':
    case 'south':
      return LANE_DIRECTIONS[LANE_NUMBERS.length - index - 1];
  }
};

const lanes = LANE_SIDES.map(side => {
  return LANE_NUMBERS.map(lane_num => {
    return new TrafficLane({
      side: side,
      index: lane_num,
      direction: LANE_DIRECTION_BY_SIDE_FOR_INDEX(side, lane_num),
      width: LANE_WIDTH,
      height: LANE_HEIGHT
    });
  });
}).reduce((lanes, lane_set) => lanes.concat(lane_set), []);

console.log(lanes);

// Draw the traffic lanes in place
lanes.reduce((cvs, lane) => cvs.add(lane.canvasElement), canvas);

// Create stoplight objects
const sl_ns_left = new Stoplight(
  'ns',
  true,
  'orange',
  lanes.filter(lane => {
    return (
      (lane.side === 'north' || lane.side === 'south') &&
      lane.direction === 'left'
    );
  })
);
const sl_ns = new Stoplight(
  'ns',
  false,
  'green',
  lanes.filter(lane => {
    return (
      (lane.side === 'north' || lane.side === 'south') &&
      lane.direction !== 'left'
    );
  })
);
const sl_ew_left = new Stoplight(
  'ew',
  true,
  'red',
  lanes.filter(lane => {
    return (
      (lane.side === 'east' || lane.side === 'west') &&
      lane.direction === 'left'
    );
  })
);
const sl_ew = new Stoplight(
  'ew',
  false,
  'red',
  lanes.filter(lane => {
    return (
      (lane.side === 'east' || lane.side === 'west') &&
      lane.direction !== 'left'
    );
  })
);

// Create traffic manager
const traffic_manager = new TrafficManager();

let lastFrameTimestamp = null;
function renderLoop(stamp) {
  if (!lastFrameTimestamp) lastFrameTimestamp = stamp;
  const time_diff = stamp - lastFrameTimestamp;

  eventEmitter.emit('tick', time_diff);

  lastFrameTimestamp = stamp;

  canvas.requestRenderAll();
  window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);

document.getElementById('add-car').addEventListener('click', ev => {
  eventEmitter.emit('new-car');
});
