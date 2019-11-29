var StarFieldCanvas =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/anim-loop-engine/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/anim-loop-engine/lib/index.js ***!
  \****************************************************/
/*! exports provided: AnimLoopEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimLoopEngine", function() { return AnimLoopEngine; });
/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
class AnimLoopEngine {
    constructor() {
        this.animate = false;
        this.frameReqId = 0;
        this.frameTasks = [];
        this.lastFrameTaskId = 0;
        this.loop = (ts = 0) => {
            const numTasks = this.frameTasks.length;
            for (let i = 0; i < numTasks; i++) {
                this.frameTasks[i].fn(ts);
            }
            this.frameReqId = requestAnimationFrame(this.loop);
        };
        this.addTasks = this.addTasks.bind(this);
    }
    addTask(task) {
        return this.addTasks([task])[0];
    }
    addTasks(tasks) {
        const createdIds = [];
        if (tasks.length == 0) {
            return createdIds;
        }
        tasks.forEach(task => {
            this.frameTasks.push({ id: this.lastFrameTaskId, fn: task });
            createdIds.push(this.lastFrameTaskId);
            this.lastFrameTaskId++;
        });
        return createdIds;
    }
    deleteTask(taskId) {
        this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
    }
    start(debugInterval) {
        if (!this.animate) {
            this.animate = true;
            this.loop();
        }
    }
    stop() {
        cancelAnimationFrame(this.frameReqId);
        this.animate = false;
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/map-number-to-range/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/map-number-to-range/lib/index.js ***!
  \*******************************************************/
/*! exports provided: mapNumberToRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapNumberToRange", function() { return mapNumberToRange; });
// Scale a number, mapping between two number ranges
const mapNumberToRange = (input, inputRangeMin, inputRangeMax, outputRangeMin, outputRangeMax) => {
    return ((input - inputRangeMin) * (outputRangeMax - outputRangeMin) /
        (inputRangeMax - inputRangeMin) +
        outputRangeMin);
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/Star.ts":
/*!*********************!*\
  !*** ./src/Star.ts ***!
  \*********************/
/*! exports provided: Star */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Star", function() { return Star; });
/* harmony import */ var map_number_to_range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! map-number-to-range */ "./node_modules/map-number-to-range/lib/index.js");
/* harmony import */ var _starColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./starColor */ "./src/starColor.ts");


var Star = /** @class */ (function () {
    function Star(opts) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.v = 0;
        this.radius = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.splashLimitX = [0, 0];
        this.splashLimitY = [0, 0];
        var ctx = opts.ctx, W = opts.W, H = opts.H, hW = opts.hW, hH = opts.hH, minV = opts.minV, maxV = opts.maxV, color = opts.color, glow = opts.glow, trails = opts.trails, addTasks = opts.addTasks;
        this.ctx = ctx;
        this.W = W;
        this.H = H;
        this.hW = hW;
        this.hH = hH;
        this.minV = minV;
        this.maxV = maxV;
        this.glow = glow;
        this.trails = trails;
        this.color = color ? color : _starColor__WEBPACK_IMPORTED_MODULE_1__["defaultColor"];
        this.splashLimitX = [-hW, hW];
        this.splashLimitY = [-hH, hH];
        this.addTasks = addTasks;
        this.reset(true);
    }
    // Get the star's initial Z depth
    Star.prototype.getInitialZ = function () {
        return (this.W > this.H ? this.H : this.W) * 2;
    };
    // Calculate the star's current position star at the current
    Star.prototype.draw = function (offsetX, offsetY) {
        this.z -= this.v;
        if (this.z <= 0) {
            // Start of attempting to add bursts on "collision" with the viewport 
            // if (
            //   this.lastX > this.splashLimitX[0] &&
            //   this.lastX < this.splashLimitX[1] &&
            //   this.lastY > this.splashLimitY[0] &&
            //   this.lastY < this.splashLimitY[1]
            // ) {
            //   console.log(this.lastX, this.splashLimitX, this.lastY, this.splashLimitY);
            //   const ex = new Explosion({ ctx: this.ctx, x: this.x, y: this.y });
            //   this.addTasks([ex.draw.bind(ex)]);
            // }
            this.reset();
        }
        // Update x and y - 0.8 is an arbitrary fraction of the
        var newX = this.W * (this.x / this.z) + offsetX;
        var newY = this.H * (this.y / this.z) + offsetY;
        // Get max Z and calc new radius/opacity based on star's position in Z range
        var maxZ = this.getInitialZ();
        // Calculate a new radius based on Z
        var newRadius = (1 - Object(map_number_to_range__WEBPACK_IMPORTED_MODULE_0__["mapNumberToRange"])(this.z, 0, maxZ, 0, 1)) * this.radius;
        // Calculate a new opacity based on Z
        var opacity = Math.round(10 - Object(map_number_to_range__WEBPACK_IMPORTED_MODULE_0__["mapNumberToRange"])(this.z, 0, maxZ, 0, 10)) / 10;
        var trailOpacity = opacity / 4;
        // Draw star trail
        if (this.trails && this.lastX !== this.x) {
            this.ctx.lineWidth = newRadius;
            this.ctx.strokeStyle = "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + trailOpacity + ")";
            this.ctx.beginPath();
            this.ctx.moveTo(newX, newY);
            this.ctx.lineTo(this.lastX, this.lastY);
            this.ctx.stroke();
        }
        // Save drawing settings to restore after applying the glow to stars only
        if (this.glow) {
            this.ctx.save();
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = '#FFF';
        }
        // Draw the star
        this.ctx.fillStyle = "rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + opacity + ")";
        this.ctx.beginPath();
        this.ctx.arc(newX, newY, newRadius, 0, Math.PI * 2);
        this.ctx.fill();
        // Undo glow settings
        if (this.glow) {
            this.ctx.restore();
        }
        // Update last x/y
        this.lastX = newX;
        this.lastY = newY;
    };
    // (Re)set the star, either initially (init) or when reaching the depth limit
    Star.prototype.reset = function (init) {
        if (init === void 0) { init = false; }
        // Define a new random position within the canvas, velocity, and radius
        this.x = Math.random() * this.W - this.hW;
        this.y = Math.random() * this.H - this.hH;
        this.v = Math.random() * (this.maxV - this.minV) + this.minV;
        this.radius = Number((Math.random() * 2 + 1).toPrecision(3));
        // Clear last x/y so we don't draw a trail from end to new reset location
        this.lastX = this.x;
        this.lastY = this.y;
        // If not init (ie. not first run), send to furthest Z, otherwise randomize
        this.z = !init ? this.getInitialZ() : Math.random() * this.getInitialZ();
    };
    return Star;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: StarField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarField", function() { return StarField; });
/* harmony import */ var anim_loop_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! anim-loop-engine */ "./node_modules/anim-loop-engine/lib/index.js");
/* harmony import */ var _Star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Star */ "./src/Star.ts");
/* harmony import */ var _starColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./starColor */ "./src/starColor.ts");



// StarField factory
var StarField = /** @class */ (function () {
    function StarField(canvasId, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        this.defaultMaxV = 5;
        this.defaultMinV = 2;
        this.defaultNumStars = 400;
        this.initialized = false;
        this.canvasW = 0;
        this.canvasH = 0;
        this.canvasHalfW = 0;
        this.canvasHalfH = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetTX = 0;
        this.offsetTY = 0;
        this.stars = [];
        this.resizeTimeout = 0;
        if (!canvasId) {
            throw 'First argument "id" is required';
            return;
        }
        this.color = opts.color || _starColor__WEBPACK_IMPORTED_MODULE_2__["defaultColor"];
        this.glow = opts.glow || false;
        this.minV = opts.minV || this.defaultMinV;
        this.maxV = opts.maxV || this.defaultMaxV;
        this.numStars = this.defaultNumStars;
        this.trails = opts.trails || false;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        var rect = this.canvas.getBoundingClientRect();
        this.canvasRectLeft = rect.left;
        this.canvasRectTop = rect.top;
        this.handleMouseMove = this.handleMouseMove.bind(this);
        // Set up animation engine
        this.engine = new anim_loop_engine__WEBPACK_IMPORTED_MODULE_0__["AnimLoopEngine"]();
        this.engine.addTask(this.draw.bind(this));
        // Set up window events
        // Window blur/focus
        window.addEventListener('blur', function () {
            _this.stop();
        });
        window.addEventListener('focus', function () {
            _this.start();
        });
        // Window event - on resize to reinitialize canvas, all stars and animation
        window.addEventListener('resize', function () {
            clearTimeout(_this.resizeTimeout);
            _this.stop();
            _this.resizeTimeout = setTimeout(function () {
                _this.reset();
                _this.start();
            }, 500);
        });
        // Did config set a number of stars?
        this.numStars = opts.numStars
            ? Math.abs(opts.numStars)
            : this.defaultNumStars;
        // Setup the canvas
        this.setupCanvas();
        // Gen new stars
        this.generateStars();
        this.initialized = true;
        // Did config enable mouse following?
        if (opts.followMouse) {
            this.setFollowMouse(true);
        }
    }
    // Generate n new stars
    StarField.prototype.generateStars = function () {
        for (var i = 0; i < this.numStars; i++) {
            this.stars.push(new _Star__WEBPACK_IMPORTED_MODULE_1__["Star"]({
                ctx: this.ctx,
                W: this.canvasW,
                H: this.canvasH,
                hW: this.canvasHalfW,
                hH: this.canvasHalfH,
                minV: this.minV,
                maxV: this.maxV,
                color: this.color,
                glow: this.glow,
                trails: this.trails,
                addTasks: this.engine.addTasks
            }));
        }
    };
    // Apply canvas container size to canvas and translate origin to center
    StarField.prototype.setupCanvas = function () {
        var canvasStyle = window.getComputedStyle(this.canvas);
        this.canvas.setAttribute('height', canvasStyle.height);
        this.canvas.setAttribute('width', canvasStyle.width);
        // canvasH/W/canvasHalfH/W used here and set to use elsewhere
        this.canvasH = this.canvas.height;
        this.canvasW = this.canvas.width;
        this.canvasHalfH = this.canvasH / 2;
        this.canvasHalfW = this.canvasW / 2;
        this.ctx.translate(this.canvasHalfW, this.canvasHalfH);
    };
    // Draw the stars in this frame
    StarField.prototype.draw = function () {
        // Calc any mouse offsets
        if (this.offsetX !== this.offsetTX) {
            this.offsetX += Math.floor((this.offsetTX - this.offsetX) / 50);
            this.offsetY += Math.floor((this.offsetTY - this.offsetY) / 50);
        }
        // Clear the canvas ready for this frame
        this.ctx.clearRect(-this.canvasHalfW, -this.canvasHalfH, this.canvasW, this.canvasH);
        for (var i in this.stars) {
            this.stars[i].draw(this.offsetX, this.offsetY);
        }
    };
    // Follow mouse (used in event listener definition)
    StarField.prototype.handleMouseMove = function (e) {
        if (this.initialized) {
            this.offsetTX = e.clientX - this.canvasRectLeft - this.canvasHalfW;
            this.offsetTY = e.clientY - this.canvasRectTop - this.canvasHalfH;
        }
    };
    StarField.prototype.resetMouseOffset = function () {
        this.offsetTX = 0;
        this.offsetTY = 0;
    };
    // Start/stop the StarField
    StarField.prototype.start = function () {
        this.engine.start();
        // this.stars.forEach(s => s.draw(0, 0))
    };
    StarField.prototype.stop = function () {
        this.engine.stop();
    };
    StarField.prototype.reset = function () {
        // Clear stars
        this.stars = [];
        // Reset canvas
        this.setupCanvas();
        // Gen new stars
        this.generateStars();
    };
    // "Hot"-updateable config values
    StarField.prototype.setMaxV = function (val) {
        this.maxV = val ? Math.abs(val) : this.defaultMaxV;
        this.reset();
    };
    StarField.prototype.setMinV = function (val) {
        this.minV = val ? Math.abs(val) : this.defaultMinV;
        this.reset();
    };
    StarField.prototype.setNumStars = function (val) {
        this.numStars = val ? Math.abs(val) : this.defaultNumStars;
        this.reset();
    };
    StarField.prototype.setFollowMouse = function (val) {
        if (val) {
            this.canvas.addEventListener('mousemove', this.handleMouseMove);
        }
        else {
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
            this.resetMouseOffset();
        }
    };
    return StarField;
}());



/***/ }),

/***/ "./src/starColor.ts":
/*!**************************!*\
  !*** ./src/starColor.ts ***!
  \**************************/
/*! exports provided: defaultColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColor", function() { return defaultColor; });
var defaultColor = {
    r: 255,
    b: 255,
    g: 255
};


/***/ })

/******/ });
//# sourceMappingURL=StarFieldCanvas.js.map