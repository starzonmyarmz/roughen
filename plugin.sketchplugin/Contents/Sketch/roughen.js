var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {

  var document = context.document;
  var selectedLayer = context.selection;
  var selectedCount = selectedLayer.count();

  if (selectedCount === 1) {

    // Selected Layer
    var originalLayer = selectedLayer.firstObject();

    if (originalLayer && originalLayer.isKindOfClass(MSShapeGroup)) {

      // Get size and detail from user input
      var size = document.askForUserInput_initialValue('Size (pixels)', '5');
      var detail = document.askForUserInput_initialValue('Detail (pixels)', '5');

      // Recreated Bezier Path
      var newPath = NSBezierPath.bezierPath();

      // Returns a random number (based on user input) near the exact point
      var randomPoint = function () {
        function randomPoint(num) {
          return num + Math.random() * detail - detail / 2;
        }

        return randomPoint;
      }();

      var originalPath = originalLayer.bezierPathWithTransforms();
      var steps = originalPath.length() / size;
      var startPoint = originalPath.pointOnPathAtLength(0);

      // Create the first point of the new path
      newPath.moveToPoint(NSMakePoint(startPoint.x, startPoint.y));

      // Loop through each step of the new path
      for (var i = 1; i <= steps; i++) {
        var point = originalPath.pointOnPathAtLength(size * i);

        // Create the new random point
        newPath.lineToPoint(NSMakePoint(randomPoint(point.x), randomPoint(point.y)));
      }

      // Close the new path
      newPath.closePath();

      // Create the new shape
      var newShape = MSShapeGroup.shapeWithBezierPath(newPath);

      // Make it black because I'm lazy
      var fill = newShape.style().addStylePartOfType(0);
      fill.color = MSColor.blackColor();

      // Add the new roughened shape to the document
      document.currentPage().addLayers([newShape]);

      // Remove the original shape
      document.currentPage().removeLayer(originalLayer);
    } else {
      document.showMessage('You can only roughen shapes and paths.');
    }
  } else {
    document.showMessage(String(selectedCount) + ' shapes selected. Please only select one.');
  }
};

var Style = __webpack_require__(1).Style;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
