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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderLanes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logic_stoplight__ = __webpack_require__(4);
// import autoResizeCanvas from './autoResizeCanvas';




const repository = new __WEBPACK_IMPORTED_MODULE_1__repository__["a" /* default */]();

var canvas = new fabric.StaticCanvas('intersection');
// autoResizeCanvas(canvas);

Object(__WEBPACK_IMPORTED_MODULE_0__renderLanes__["a" /* default */])(canvas);

// Initialize component system

// Setup North/South and East/West stoplights
const sl_ns_left_id = repository.putEntity({
  state: 'green',
  timeToRed: -1,
  position: 'ns',
  is_left: true
});
const sl_ns_id = repository.putEntity({
  state: 'green',
  timeToRed: -1,
  position: 'ns',
  is_left: false
});
const sl_ew_left_id = repository.putEntity({
  state: 'red',
  timeToRed: -1,
  position: 'ew',
  is_left: true
});
const sl_ew_id = repository.putEntity({
  state: 'red',
  timeToRed: -1,
  position: 'ew',
  is_left: false
});
const stoplight_ids = [sl_ns_left_id, sl_ns_id, sl_ew_left_id, sl_ew_id];

let lastFrameTimestamp = null;
function renderLoop(stamp) {
  if (!lastFrameTimestamp) lastFrameTimestamp = stamp;

  // Handle stoplight logic
  stoplight_ids.reduce(__WEBPACK_IMPORTED_MODULE_2__logic_stoplight__["a" /* default */].decrementTimer);
  window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renderLanes;
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
function renderLanes(canvas) {
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Repository {
  constructor() {
    this.entities = {};
    this.components = {};
    this.entityCounter = 0;
  }

  putEntity(entity) {
    if (!entity._id) entity._id = entityCounter++;
    this.entities[entity._id] = entity;
    return entity._id;
  }

  removeEntity(entity) {
    delete this.entities[entity._id];
  }

  getEntityById(_id) {
    return this.entities[_id];
  }

  attachComponentToEntity(component, entity) {
    let _entityId, _componentId;
    if (entity._id !== undefined && Number.isInteger(entity._id)) {
      _entityId = entity._id;
    } else {
      _entityId = entity;
    }

    if (this.components[_componentId] === undefined) {
      this.components[_componentId] = [];
    }

    this.components[_componentId].push(entity._id);
  }

  removeComponentFromEntity(component, entity) {
    throw 'Not yet implemented';
  }

  getEntitiesByComponentId(_id) {
    return this.components(_id);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Repository;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  shouldTransitionStoplight(stoplight) {}
});


/***/ })
/******/ ]);