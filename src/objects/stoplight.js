import eventEmitter from '../pubsub';

const speed_constant = 1;

const left_blink_interval = 500 / speed_constant; // 500 ms between blinks
const green_light_interval = 10000 / speed_constant; // 10s to run a green light
const left_light_interval = 10000 / speed_constant; // 10s to run a protected left turn
const yellow_light_interval = 5000 / speed_constant; // 5s to run a yellow light
const red_light_interval = 3000 / speed_constant; // 3s to linger on red lights

/**
 * Models a stoplight in the system. Primarily stores stoplight state, including
 * Which direction it is oriented, whether it is for a left-turn lane, the
 * current state of the light (essentially color), timing until the next transition,
 * timing for a blink state, and whether the light is visible.
 *
 * Most of the simulation happens with events. Each animation frame advances the
 * simulation, typically by decrementing the aforementioned timers. When a transition
 * is to occur, the light modifies itself and broadcasts that the transition has happened.
 * Other lights watch for these changes, and modify their internal state so that the
 * animation loop can start operating on these lights.
 *
 * @class Stoplight
 */
export default class Stoplight {
  constructor(direction, is_left, initial_status = 'red', lane_objects = []) {
    this.direction = direction; // 'ns' || 'ew'
    this.is_left = is_left;
    this.status = initial_status;
    this.transition_timer =
      initial_status === 'green' ? green_light_interval : undefined;
    this.left_blink_timer = left_blink_interval;
    this.light_visible = true;

    this._carHandler = eventEmitter.on(
      'new-car',
      car_opts => {
        //
      },
      this
    );

    this._tickHandler = eventEmitter.on(
      'tick',
      time_since_last_tick => {
        // Handle left-hand turn signals
        if (this.is_left) {
          // When we are blinking orange...
          if (this.status === 'orange') {
            // If we are below the blink timer
            if (this.left_blink_timer <= 0) {
              // Reset the blink timer
              this.left_blink_timer =
                left_blink_interval + this.left_blink_timer;
              // Toggle visibility
              this.light_visible = !this.light_visible;
            } else {
              // Decrement the timer
              this.left_blink_timer =
                this.left_blink_timer - time_since_last_tick;
            }
          } else if (this.status === 'green') {
            // If our timer has expired
            if (this.transition_timer <= 0) {
              // Go to yellow
              this.status = 'yellow';
              const that = this;
              // After a delay, switch to blinking orange and signal the other lights
              setTimeout(function() {
                that.status = 'orange';
                that.left_blink_timer = left_blink_interval;
                that.light_visible = true;
                eventEmitter.emit(
                  'stoplight-changed',
                  that.direction,
                  that.is_left,
                  that.status
                );
              }, yellow_light_interval);
            } else {
              // Otherwise, advance the timer
              this.transition_timer =
                this.transition_timer - time_since_last_tick;
            }
          }
        } else if (this.status === 'green' || this.status === 'yellow') {
          // When the timer has completed...
          if (this.transition_timer <= 0) {
            let newStatus, newTimer;
            if (this.status === 'yellow') {
              newStatus = 'red';
              newTimer = undefined;
            } else {
              newStatus = 'yellow';
              newTimer = yellow_light_interval;
            }

            this.transition_timer = newTimer;
            this.status = newStatus;
            eventEmitter.emit(
              'stoplight-changed',
              this.direction,
              this.is_left,
              this.status
            );
          } else {
            // Advance the timer
            this.transition_timer =
              this.transition_timer - time_since_last_tick;
          }
        } else if (this.status === 'red') {
          // Do nothing when red
        }

        // Update lane objects for animation
        lane_objects.forEach(lane => {
          if (this.light_visible) lane.canvasElement.set({ fill: this.status });
          else lane.canvasElement.set({ fill: 'rgba(0,0,0,0)' });
        });
      },
      this
    );

    // Respond to changes in the other stoplights
    this._stoplightChangeHandler = eventEmitter.on(
      'stoplight-changed',
      (direction, is_left, state) => {
        if (direction === this.direction) {
          switch (state) {
            case 'green':
              break;
            case 'yellow':
              this.status = 'yellow';
              this.light_visible = true;
              setTimeout(function() {
                this.status = 'red';
                this.transition_timer = undefined;
              }, yellow_light_interval);
              break;
            case 'red':
              this.status = 'red';
              this.transition_timer = undefined;
              this.light_visible = true;
              break;
            case 'orange': // The turn signals just changed
              if (this.is_left === false) {
                this.status = 'green';
                this.transition_timer = green_light_interval;
              }
              break;
          }
        } else {
          // Opposing direction switched
          switch (state) {
            case 'green':
              break;
            case 'yellow':
              break;
            case 'red':
              if (this.is_left === true) {
                const that = this;
                setTimeout(function() {
                  that.status = 'green';
                  that.transition_timer = green_light_interval;
                  that.light_visible = true;
                }, red_light_interval);
              }
            case 'orange':
              break;
          }
        }
      },
      this
    );
  }
}
