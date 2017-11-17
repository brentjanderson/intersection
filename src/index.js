import renderLanes from './renderLanes';
import Stoplight from './objects/stoplight';
import eventEmitter from './pubsub';

var canvas = new fabric.StaticCanvas('intersection');

const lane_objects = renderLanes(canvas);

// Create stoplight objects
const sl_ns_left = new Stoplight('ns', true, 'orange', lane_objects.ns.left);
const sl_ns = new Stoplight('ns', false, 'green', lane_objects.ns.rest);
const sl_ew_left = new Stoplight('ew', true, 'red', lane_objects.ew.left);
const sl_ew = new Stoplight('ew', false, 'red', lane_objects.ew.rest);

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
