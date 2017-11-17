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
    left: LANE_HEIGHT + LANE_WIDTH * 6,
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
    top: LANE_HEIGHT + LANE_WIDTH * 6,
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
  const lanes = [0, 1, 2, 3, 4, 5]
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
    }, []);

  lanes.reduce((cvs, lane) => {
    return cvs.add(lane);
  }, canvas);

  return {
    ns: {
      left: [lanes[12], lanes[11]],
      rest: [lanes[0], lanes[4], lanes[8], lanes[15], lanes[19], lanes[23]]
    },
    ew: {
      left: [lanes[9], lanes[14]],
      rest: [lanes[2], lanes[6], lanes[10], lanes[13], lanes[17], lanes[21]]
    }
  };
}
