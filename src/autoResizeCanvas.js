/**
 * Register automatic resizing of our canvas
 * @param {canvas} canvas Canvas to register for resizing
 */
export default function autoResizeCanvas(canvas) {
  window.addEventListener('resize', canvasResized, false);
  function canvasResized() {
    canvas.setWidth(canvas.wrapperEl.innerWidth);
    canvas.setHeight(canvas.wrapperEl.innerHeight);
  }
  canvasResized();
}
