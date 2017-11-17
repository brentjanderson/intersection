import eventEmitter from '../pubsub';

export default class TrafficLane {
  constructor(opts) {
    this.side = opts.side;
    this.index = opts.index;
    this.direction = opts.direction;
    this.width = opts.width;
    this.height = opts.height;

    this._rect = new fabric.Rect({
      width: this.lane_width(),
      height: this.lane_height(),
      strokeWidth: 2,
      stroke: 'gray',
      originX: 'center',
      originY: 'center',
      fill: 'rgba(0,0,0,0)'
      //   angle: this.lane_angle(opts.side)
    });

    this.carCounter = 0;

    this._label = new fabric.Text(String(this.carCounter), {
      angle: this.text_angle(),
      fontSize: 16,
      originX: 'center',
      originY: 'center'
    });

    this.canvasElement = new fabric.Group([this._rect, this._label], {
      left: this.lane_left(),
      top: this.lane_top()
    });

    this._newCarHandler = eventEmitter.on('new-car', car_opts => {
      if (
        car_opts.side === this.side &&
        car_opts.lane === this.index &&
        this.direction === 'oncoming'
      ) {
        this.carCounter++;
        this._label.set('text', String(this.carCounter));
      }
    });
  }

  text_angle() {
    switch (this.side) {
      case 'south':
      case 'north':
        return 0;
      case 'west':
        return 90;
      case 'east':
        return 270;
      default:
        throw 'Unknown lane direction';
    }
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
