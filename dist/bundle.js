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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autoResizeCanvas__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderLanes__ = __webpack_require__(2);



var canvas = new fabric.StaticCanvas('intersection');
// autoResizeCanvas(canvas);

Object(__WEBPACK_IMPORTED_MODULE_1__renderLanes__["a" /* default */])(canvas);

let lastFrameTimestamp = null;
function renderLoop(stamp) {
  if (!lastFrameTimestamp) lastFrameTimestamp = stamp;
  window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/**
 * Register automatic resizing of our canvas
 * @param {canvas} canvas Canvas to register for resizing
 */
function autoResizeCanvas(canvas) {
  window.addEventListener('resize', canvasResized, false);
  function canvasResized() {
    canvas.setWidth(canvas.wrapperEl.innerWidth);
    canvas.setHeight(canvas.wrapperEl.innerHeight);
  }
  canvasResized();
}


/***/ }),
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


/***/ })
/******/ ]);