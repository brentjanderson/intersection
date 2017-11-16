import autoResizeCanvas from './autoResizeCanvas';
import renderLanes from './renderLanes';

var canvas = new fabric.StaticCanvas('intersection');
// autoResizeCanvas(canvas);

renderLanes(canvas);

let lastFrameTimestamp = null;
function renderLoop(stamp) {
  if (!lastFrameTimestamp) lastFrameTimestamp = stamp;
  window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);
