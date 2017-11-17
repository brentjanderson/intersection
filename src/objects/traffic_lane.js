const STROKE_WIDTH = 2;

export default class TrafficLane {
  constructor(opts) {
    this.side = opts.side;
    this.index = opts.index;
    this.direction = opts.direction;
    this.width = opts.width;
    this.height = opts.height;

    this.canvasElement = new fabric.Rect({
      width: this.lane_width(),
      height: this.lane_height(),
      left: this.lane_left(),
      top: this.lane_top(),
      strokeWidth: STROKE_WIDTH,
      stroke: 'gray',
      fill: 'rgba(0,0,0,0)'
      //   angle: this.lane_angle(opts.side)
    });
  }
  lane_width() {
    switch (this.side) {
      case 'south':
      case 'north':
        return this.width;
      case 'west':
      case 'east':
        return this.height;
      default:
        throw 'Unknown lane direction';
    }
  }
  lane_height() {
    switch (this.side) {
      case 'south':
      case 'north':
        return this.height;
      case 'west':
      case 'east':
        return this.width;
      default:
        throw 'Unknown lane direction';
    }
  }

  lane_left() {
    switch (this.side) {
      case 'north':
        return this.height + this.width * this.index;
      case 'south':
        return this.height + this.width * this.index;
      case 'west':
        return 0;
      case 'east':
        return this.height + this.width * 6;
      default:
        throw 'Unknown lane direction';
    }
  }

  lane_top() {
    switch (this.side) {
      case 'north':
        return 0;
      case 'south':
        return this.height + this.width * 6;
      case 'west':
        return this.height + this.width * this.index;
      case 'east':
        return this.height + this.width * this.index;
      default:
        throw 'Unknown lane direction';
    }
  }
}
