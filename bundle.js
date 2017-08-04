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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spike = __webpack_require__(2);

var _spike2 = _interopRequireDefault(_spike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.selection = {};
    this.sounds = {};
    this.play = document.getElementById('play');
    this.pause = document.getElementById('pause');
    this.tempo = document.getElementById('tempo');
    this.reset = document.getElementById('reset');
    this.playColumn = 0;
    this.init();
    this.spike = new _spike2.default();
  }

  _createClass(Board, [{
    key: 'init',
    value: function init() {
      var _this = this;

      for (var row = 0; row < 8; row += 1) {
        this.selection[row] = {};
        this.sounds[row] = {};
        for (var col = 0; col < 8; col += 1) {
          this.selection[row][col] = document.getElementById('tile-' + row + '-' + col);
          this.selection[row][col].onclick = function (e) {
            return _this.toggleSelect(e);
          };
          this.sounds[row][col] = this.whichSound(row, col);
        }
      }
      this.play.onclick = function (e) {
        return _this.togglePlay(e);
      };
      this.pause.onclick = function (e) {
        return _this.togglePlay(e);
      };
      this.reset.onclick = function () {
        return _this.handleReset();
      };
      this.tempo.onchange = function () {
        return _this.handleTempo();
      };
      this.mainInterval = setInterval(this.playTiles.bind(this), this.rate());
    }
  }, {
    key: 'whichSound',
    value: function whichSound(row, col) {
      switch (row) {
        case 0:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-0173158-0111436-callmeking-sifu-snare-130bpm_tf5dyb.mp3');
        case 1:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-1099214-0110961-eluterius-a-bag-full-of-spiders_adahfs.mp3');
        case 2:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-1093714-0110444-slicexbeats-reversing-cymbal-hits_pfwpmb.mp3');
        case 3:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-1871485-0109347-grwi2016-no-role-modelz-bass_udpun0.mp3');
        case 4:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-0173158-0111060-callmeking-creepin-snare-clap-132bpm_ynhge5.mp3');
        case 5:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-2201803-0111523-sxker-happy-marimba-chords_ftdzty.mp3');
        case 6:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803147/looperman-l-1655182-0108938-az96lol-mexikodro-rim_glncnm.mp3');
        case 7:
          return new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/v1501803148/looperman-l-1929922-0111261-alabafruit-bones-electronic-melodic-bones-percussion-120-bpm_rucmdn.mp3');
      }
    }
  }, {
    key: 'toggleSelect',
    value: function toggleSelect(e) {
      var row = void 0,
          col = void 0;

      var _e$srcElement$id$spli = e.srcElement.id.split('-').slice(-2);

      var _e$srcElement$id$spli2 = _slicedToArray(_e$srcElement$id$spli, 2);

      row = _e$srcElement$id$spli2[0];
      col = _e$srcElement$id$spli2[1];

      if (this.selection[row][col].getAttribute('data')) {
        this.selection[row][col].setAttribute('data', '');
        e.srcElement.classList.remove('tile-selected');
      } else {
        this.selection[row][col].setAttribute('data', '1');
        e.srcElement.classList.add('tile-selected');
      }
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay(e) {
      if (this.play.getAttribute('data')) {
        this.play.setAttribute('data', '');
        this.play.classList.add('hidden');
        this.pause.setAttribute('data', '1');
        this.pause.classList.remove('hidden');
      } else {
        this.pause.setAttribute('data', '');
        this.pause.classList.add('hidden');
        this.play.setAttribute('data', '1');
        this.play.classList.remove('hidden');
      }
    }
  }, {
    key: 'rate',
    value: function rate() {
      var rate = parseInt(this.tempo.getAttribute('max')) - parseInt(this.tempo.value);
      var min = parseInt(this.tempo.getAttribute('min'));
      return rate + min;
    }
  }, {
    key: 'handleReset',
    value: function handleReset() {
      for (var row = 0; row < 8; row += 1) {
        for (var col = 0; col < 8; col += 1) {
          this.selection[row][col].setAttribute('data', '');
          this.selection[row][col].classList.remove('tile-selected');
        }
      }
    }
  }, {
    key: 'handleTempo',
    value: function handleTempo() {
      clearInterval(this.mainInterval);
      this.mainInterval = setInterval(this.playTiles.bind(this), this.rate());
    }
  }, {
    key: 'playTiles',
    value: function playTiles() {
      if (this.pause.getAttribute('data')) {
        this.spike.animate();
        var prevColumn = this.playColumn === 0 ? 7 : this.playColumn - 1;
        for (var row = 0; row < 8; row += 1) {
          this.selection[row][prevColumn].classList.remove('tile-shadow');
          this.selection[row][this.playColumn].classList.add('tile-shadow');
          this.sounds[row][prevColumn].pause();
          this.sounds[row][prevColumn].currentTime = 0;
          if (this.selection[row][this.playColumn].getAttribute('data')) {
            this.sounds[row][this.playColumn].play();
          }
        }
        this.playColumn = this.playColumn === 7 ? 0 : this.playColumn + 1;
      }
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spike = function () {
  function Spike() {
    _classCallCheck(this, Spike);

    this.sprite = new Image();
    this.sprite.src = 'http://res.cloudinary.com/dy4gcvjff/image/upload/v1501818042/SpikeDance_dcoubx.png';
    this.loadImage = this.loadImage.bind(this);
    this.animate = this.animate.bind(this);
    this.canvas = document.getElementById('spikeAnimation');
    this.context = this.canvas.getContext('2d');
    this.shift = 0;
    this.width = 250;
    this.height = 270;
    this.totalFrames = 14;
    this.currentFrame = 0;
    this.init();
    this.frameRate = 0;
  }

  _createClass(Spike, [{
    key: 'init',
    value: function init() {
      this.sprite.addEventListener('load', this.loadImage, false);
    }
  }, {
    key: 'loadImage',
    value: function loadImage(e) {
      this.animate();
    }
  }, {
    key: 'setFrameRate',
    value: function setFrameRate(rate) {}
  }, {
    key: 'animate',
    value: function animate() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(this.sprite, this.shift, 0, this.width, this.height, 0, 0, this.width, this.height);
      this.shift += this.width;
      if (this.currentFrame === this.totalFrames) {
        this.shift = 0;
        this.currentFrame = 0;
      }
      this.currentFrame += 1;
    }
  }]);

  return Spike;
}();

exports.default = Spike;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map