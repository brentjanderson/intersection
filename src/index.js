// import autoResizeCanvas from './autoResizeCanvas';
import renderLanes from './renderLanes';
import ECSRepository from './repository';
import stoplight_logic from './logic/stoplight';

const repository = new ECSRepository();

var canvas = new fabric.StaticCanvas('intersection');
// autoResizeCanvas(canvas);

renderLanes(canvas);

// Initialize component system

// Setup North/South and East/West stoplights
const sl_ns_left_id = repository.putEntity({
  state: 'green',
  timeToRed: -1,
  position: 'ns',
  is_left: true
});
const sl_ns_id = repository.putEntity({
  state: 'green',
  timeToRed: -1,
  position: 'ns',
  is_left: false
});
const sl_ew_left_id = repository.putEntity({
  state: 'red',
  timeToRed: -1,
  position: 'ew',
  is_left: true
});
const sl_ew_id = repository.putEntity({
  state: 'red',
  timeToRed: -1,
  position: 'ew',
  is_left: false
});
const stoplight_ids = [sl_ns_left_id, sl_ns_id, sl_ew_left_id, sl_ew_id];

let lastFrameTimestamp = null;
function renderLoop(stamp) {
  if (!lastFrameTimestamp) lastFrameTimestamp = stamp;

  // Handle stoplight logic
  stoplight_ids.reduce(stoplight_logic.decrementTimer);
  window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);
