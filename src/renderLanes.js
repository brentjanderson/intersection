const LANE_WIDTH = 20;
const LANE_HEIGHT = 100;

/**
 * Generate a lane for the top part of the intersection, by index
 * @param {Number} idx Index of the lane to render
 */
function generateTopLane(idx) {
  return new fabric.Rect({
    width: LANE_WIDTH,
    height: LANE_HEIGHT,
    left: LANE_HEIGHT + LANE_WIDTH * idx,
    top: 0,
    strokeWidth: 2,
    stroke: 'gray',
    fill: 'rgba(0,0,0,0)'
  });
}

/**
 * Generate a lane for the left part of the intersection, by index
 * @param {Number} idx Index of the lane to render
 */
function generateLeftLane(idx) {
  return new fabric.Rect({
    width: LANE_HEIGHT,
    height: LANE_WIDTH,
    left: 0,
    top: LANE_HEIGHT + LANE_WIDTH * idx,
    strokeWidth: 2,
    stroke: 'gray',
    fill: 'rgba(0,0,0,0)'
  });
}

/**
 * Generate a lane for the right part of the intersection, by index
 * @param {Number} idx Index of the lane to render
 */
function generateRightLane(idx) {
  return new fabric.Rect({
    width: LANE_HEIGHT,
    height: LANE_WIDTH,
    left: LANE_HEIGHT + LANE_WIDTH * 5,
    top: LANE_HEIGHT + LANE_WIDTH * idx,
    strokeWidth: 2,
    stroke: 'gray',
    fill: 'rgba(0,0,0,0)'
  });
}

/**
 * Generate a lane for the bottom part of the intersection, by index
 * @param {Number} idx Index of the lane to render
 */
function generateBottomLane(idx) {
  return new fabric.Rect({
    width: LANE_WIDTH,
    height: LANE_HEIGHT,
    left: LANE_HEIGHT + LANE_WIDTH * idx,
    top: LANE_HEIGHT + LANE_WIDTH * 5,
    strokeWidth: 2,
    stroke: 'gray',
    fill: 'rgba(0,0,0,0)'
  });
}

/**
 * Generate and draw all the lanes associated with this canvas
 * @param {Canvas} canvas
 */
export default function renderLanes(canvas) {
  [0, 1, 2, 3, 4]
    .map(el => {
      return [
        generateTopLane(el),
        generateLeftLane(el),
        generateRightLane(el),
        generateBottomLane(el)
      ];
    })
    .reduce((lanes, laneSet) => {
      return lanes.concat(laneSet);
    }, [])
    .reduce((cvs, lane) => {
      return cvs.add(lane);
    }, canvas);
}
