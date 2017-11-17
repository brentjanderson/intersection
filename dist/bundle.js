/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects_stoplight__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_traffic_manager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_traffic_lane__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pubsub__ = __webpack_require__(5);





var canvas = new fabric.Canvas('intersection');

// Create lane objects
const LANE_WIDTH = 20;
const LANE_HEIGHT = 100;
const LANE_SIDES = ['north', 'south', 'east', 'west'];
const LANE_DIRECTIONS = [
  'right',
  'straight',
  'straight',
  'left',
  'oncoming',
  'oncoming'
];
const LANE_NUMBERS = [0, 1, 2, 3, 4, 5];
const LANE_DIRECTION_BY_SIDE_FOR_INDEX = (side, index) => {
  switch (side) {
    case 'north':
    case 'east':
      return LANE_DIRECTIONS[index];
    case 'west':
    case 'south':
      return LANE_DIRECTIONS[LANE_NUMBERS.length - index - 1];
  }
};

const lanes = LANE_SIDES.map(side => {
  return LANE_NUMBERS.map(lane_num => {
    return new __WEBPACK_IMPORTED_MODULE_2__objects_traffic_lane__["a" /* default */]({
      side: side,
      index: lane_num,
      direction: LANE_DIRECTION_BY_SIDE_FOR_INDEX(side, lane_num),
      width: LANE_WIDTH,
      height: LANE_HEIGHT
    });
  });
}).reduce((lanes, lane_set) => lanes.concat(lane_set), []);

console.log(lanes);

// Draw the traffic lanes in place
lanes.reduce((cvs, lane) => cvs.add(lane.canvasElement), canvas);

// Create stoplight objects
const sl_ns_left = new __WEBPACK_IMPORTED_MODULE_0__objects_stoplight__["a" /* default */](
  'ns',
  true,
  'orange',
  lanes.filter(lane => {
    return (
      (lane.side === 'north' || lane.side === 'south') &&
      lane.direction === 'left'
    );
  })
);
const sl_ns = new __WEBPACK_IMPORTED_MODULE_0__objects_stoplight__["a" /* default */](
  'ns',
  false,
  'green',
  lanes.filter(lane => {
    return (
      (lane.side === 'north' || lane.side === 'south') &&
      lane.direction !== 'left'
    );
  })
);
const sl_ew_left = new __WEBPACK_IMPORTED_MODULE_0__objects_stoplight__["a" /* default */](
  'ew',
  true,
  'red',
  lanes.filter(lane => {
    return (
      (lane.side === 'east' || lane.side === 'west') &&
      lane.direction === 'left'
    );
  })
);
const sl_ew = new __WEBPACK_IMPORTED_MODULE_0__objects_stoplight__["a" /* default */](
  'ew',
  false,
  'red',
  lanes.filter(lane => {
    return (
      (lane.side === 'east' || lane.side === 'west') &&
      lane.direction !== 'left'
    );
  })
);

// Create traffic manager
const traffic_manager = new __WEBPACK_IMPORTED_MODULE_1__objects_traffic_manager__["a" /* default */]();

let lastFrameTimestamp = null;
function renderLoop(stamp) {
  if (!lastFrameTimestamp) lastFrameTimestamp = stamp;
  const time_diff = stamp - lastFrameTimestamp;

  __WEBPACK_IMPORTED_MODULE_3__pubsub__["a" /* default */].emit('tick', time_diff);

  lastFrameTimestamp = stamp;

  canvas.requestRenderAll();
  window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);

document.getElementById('add-car').addEventListener('click', ev => {
  __WEBPACK_IMPORTED_MODULE_3__pubsub__["a" /* default */].emit('new-car');
});


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pubsub__ = __webpack_require__(5);


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
class Stoplight {
  constructor(direction, is_left, initial_status = 'red', lane_objects = []) {
    this.direction = direction; // 'ns' || 'ew'
    this.is_left = is_left;
    this.status = initial_status;
    this.transition_timer =
      initial_status === 'green' ? green_light_interval : undefined;
    this.left_blink_timer = left_blink_interval;
    this.light_visible = true;

    this._carHandler = __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].on(
      'new-car',
      car_opts => {
        //
      },
      this
    );

    this._tickHandler = __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].on(
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
                __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].emit(
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
            __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].emit(
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
    this._stoplightChangeHandler = __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].on(
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Stoplight;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eventemitter3__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_eventemitter3__);


const eventEmitter = new __WEBPACK_IMPORTED_MODULE_0_eventemitter3___default.a();

/* harmony default export */ __webpack_exports__["a"] = (eventEmitter);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pubsub__ = __webpack_require__(5);


class TrafficManager {
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

    this._tickHandler = __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].on('tick', time_since_last_tick => {
      this.time_since_last_car -= time_since_last_tick;
      if (this.time_since_last_car <= 0) {
        this.time_since_last_car +=
          this.car_arrival_frequency +
          (Math.random() * 2 - 1) * this.car_arrival_spread;

        __WEBPACK_IMPORTED_MODULE_0__pubsub__["a" /* default */].emit('new-car', {
          direction: Math.random() >= 0.5 ? 'ns' : 'ew',
          lane: Math.ceil(Math.random() * 4)
        });
      }
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TrafficManager;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const STROKE_WIDTH = 2;

class TrafficLane {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = TrafficLane;



/***/ })
/******/ ]);