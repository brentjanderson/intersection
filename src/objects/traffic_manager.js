import eventEmitter from '../pubsub';

const random_direction = () => {};

export default class TrafficManager {
  constructor(opts) {
    if (opts === undefined) {
      opts = {};
    }
    // Average frequency per car
    this.car_arrival_frequency = opts.car_arrival_frequency || 5000;
    // Amount to plus/minus from average frequency
    this.car_arrival_spread = opts.car_arrival_spread || 1000;
    // Default directions
    this.intersection_sides = opts.intersection_sides || [
      'north',
      'south',
      'east',
      'west'
    ];
    // Default number of lanes
    this.intersection_lanes = 6;
    // Timer for first car arrival
    this.time_since_last_car =
      this.car_arrival_frequency +
      (Math.random() * 2 - 1) * this.car_arrival_spread;

    this._tickHandler = eventEmitter.on('tick', time_since_last_tick => {
      this.time_since_last_car -= time_since_last_tick;
      if (this.time_since_last_car <= 0) {
        this.time_since_last_car +=
          this.car_arrival_frequency +
          (Math.random() * 2 - 1) * this.car_arrival_spread;
        eventEmitter.emit('new-car', {
          side: this.random_side(),
          lane: this.random_lane()
        });
      }
    });
  }

  random_side() {
    return this.intersection_sides[
      Math.floor(Math.random() * this.intersection_sides.length + 1)
    ];
  }

  random_lane() {
    return Math.floor(Math.random() * this.intersection_lanes + 1);
  }
}
