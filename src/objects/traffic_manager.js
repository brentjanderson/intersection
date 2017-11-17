import eventEmitter from '../pubsub';

export default class TrafficManager {
  constructor(opts) {
    if (opts === undefined) {
      opts = {};
    }
    // Average frequency per car
    this.car_arrival_frequency = opts.car_arrival_frequency || 10000;
    // Amount to plus/minus from average frequency
    this.car_arrival_spread = opts.car_arrival_spread || 2000;
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
          direction: Math.random() >= 0.5 ? 'ns' : 'ew',
          lane: Math.ceil(Math.random() * 4)
        });
      }
    });
  }
}
