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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vec2__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Vec2__["a"]; });



/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Component {

  constructor (type, name) {
    this.id = Component._count++
    this.type = type
    this.name = name || `${type}_${this.id}`
  }

  setStyle (ctx, style) {
    const finalStyles = (Array.isArray(style) ? style : [style]).reduce((acc, s) => {
      if (s) {
        Object.assign(acc, s)
      }
      return acc
    }, {})

    for (let rule in finalStyles) {
      ctx[rule] = finalStyles[rule]
    }
  }

  getState() {
    return this.value && this.value.changed() && {
      name: this.name,
      _ts: Date.now(),
      type: this.type,
      value: this.value.get(),
    }
  }

  checkPoint({ x, y }) {
    return (
      this.x <= x && x <= this.x + this.width &&
      this.y <= y && y <= this.y + this.height
    )
  }

  setBound({ x = 0, y = 0, width = 0, height = 0}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.calculateBounds()
  }

  draw () {}

  update () {}

  calculateBounds() {}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;


Component._count = 0


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Vec2 {
  constructor(x = 0, y = 0) {
    this.set(x, y)
  }
  set (x, y) {
    this.x = x
    this.y = y
    return this
  }
  get () {
    return this
  }
  len2 () {
    return this.x ** 2 + this.y ** 2
  }
  len () {
    return Math.sqrt(this.len2())
  }
  norm () {
    const l = this.len()
    return this.scale(1 / l)
  }
  scale (c) {
    this.x *= c
    this.y *= c
    return this
  }
  add (p) {
    //assert(p instanceof Point, 'arg must be a point')
    this.x += p.x
    this.y += p.y
    return this
  }
  sub (p) {
    //assert(p instanceof Point, 'arg must be a point')
    this.x -= p.x
    this.y -= p.y
    return this
  }
  dot (p) {
    //assert(p instanceof Point, 'arg must be a point')
    this.x *= p.x
    this.y *= p.y
    return this
  }
  clone () {
    return new Vec2(this.x, this.y)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vec2;




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CONNECT = '@player/connect'
/* harmony export (immutable) */ __webpack_exports__["a"] = CONNECT;

const INPUT = '@player/input'
/* harmony export (immutable) */ __webpack_exports__["b"] = INPUT;



const connect = id => ({
  type: CONNECT,
  payload: {
    id: id,
  },
})
/* harmony export (immutable) */ __webpack_exports__["c"] = connect;


const input = state => ({
  type: INPUT,
  payload: state,
})
/* harmony export (immutable) */ __webpack_exports__["d"] = input;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__Component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__JoyStick__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__JoyStick__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Button__["a"]; });





/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Value__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Value__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueXY__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__ValueXY__["a"]; });




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Value {

  constructor(value) {
    this.set(value)
  }

  set(value) {
    this._prev = this._value
    this._value = value
  }

  get() {
    return this._value
  }

  changed() {
    if (!(this._value === this._prev)) {
      this._prev = this._value
      return true
    }
    return false
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Value;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(5);



class ControllerGroup extends __WEBPACK_IMPORTED_MODULE_0__components__["b" /* Component */] {

  constructor (options = 0, components = []) {
    super()

    this.options = options
    this.components = []

    for (let component of components) {
      this.addComponent(component)
    }
  }

  addComponent (component) {
    this.components.push(component)
    this.calculateBounds()
  }

  calculateBounds () {
    const h = !!(this.options & ControllerGroup.SPLIT_HORIZONTAL)

    const dx = this.width * (!h ? 1 / (this.components.length||1) : 1)
    const dy = this.height * (h ? 1 / (this.components.length||1) : 1)

    let i = 0
    for (let component of this.components) {
      component.setBound({
        x: dx * i * !h + this.x,
        y: dy * i * h + this.y,
        width: dx,
        height: dy,
      })
      i++
    }
  }

  getState () {
    return this.components.reduce((acc, component) => {
      if (component.getState) {
        const val = component.getState()
        return !!val ? acc.concat(val) : acc
      }
      return acc
    }, [])
  }

  update (touches) {
    for (let component of this.components) {
      component.update(touches)
    }
  }

  draw (ctx) {
    for (let component of this.components) {
      component.draw(ctx)
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControllerGroup;


ControllerGroup.SPLIT_VERTICAL = 1 << 0
ControllerGroup.SPLIT_HORIZONTAL = 1 << 1



/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller__ = __webpack_require__(15);




const controller = new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */]({
  room: 'game',
  peer: new Peer(null, { host: location.hostname, port: location.port, path: '/peer' }),
}, __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].SPLIT_VERTICAL, [
  new __WEBPACK_IMPORTED_MODULE_0__components__["c" /* JoyStick */]('joystick'),
  new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].Group(__WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].SPLIT_HORIZONTAL, [
    new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].Group(__WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].SPLIT_HORIZONTAL),
    new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].Group(__WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */].SPLIT_VERTICAL, [
      new __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Button */]('a', 'A'),
      new __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Button */]('b', 'B'),
      new __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Button */]('c', 'C'),
    ]),
  ])
])

controller.run()

document.body.appendChild(controller.getView())



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__values__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_math__ = __webpack_require__(0);





class JoyStick extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

  constructor (name, radius = 80) {
    super('joystick', name)

    this.radius = radius
    this.down = false
    this.value = new __WEBPACK_IMPORTED_MODULE_1__values__["b" /* ValueXY */](0, 0)

    this.center = new __WEBPACK_IMPORTED_MODULE_2__utils_math__["a" /* Vec2 */]()
    this.stick = new __WEBPACK_IMPORTED_MODULE_2__utils_math__["a" /* Vec2 */]()

    this.style = {
      bg: {
        lineWidth: 3,
        fillStyle: '#4CA0A2',
        strokeStyle: '#00787A',
      },
      normal: {
        lineWidth: 3,
        fillStyle: '#65A79B',
        strokeStyle: '#FFF',
      },
      down: {
        fillStyle: '#4C8E82',
      },
    }
  }

  update (touches) {
    for (let touch of touches) {
      if (!this.down && !touch.bound && touch.pressed && this.checkPoint(touch)) {
        touch.bound = this.id
        this.down = true
      }
      if (touch.bound === this.id) {
        this.stick.set(touch.x, touch.y)
        if (touch.released) {
          this.down = false
          this.stick.set(this.center.x, this.center.y)
          this.value.set(0, 0)
        }
      }
    }
    const d = this.stick.clone().sub(this.center)

    if (d.len2() > 0) {
      const maxStick = this.radius * 0.75
      const stick = Math.min(maxStick, d.len())
      const theta = Math.atan2(d.x, d.y)

      // Normalize value in steps of ten (in order to send fewer updates)
      const vx = Math.sin(Math.round(theta * 10)/10)
      const vy = Math.cos(Math.round(theta * 10)/10)
      const vz = Math.round(10 * stick / maxStick)/10

      this.value.set(vx * vz, vy * vz)

      this.stick.set(Math.sin(theta), Math.cos(theta)).scale(stick).add(this.center)
    }
  }

  calculateBounds() {
    this.center.set(
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
    this.stick = this.center.clone()
  }

  draw (ctx) {
    ctx.save()

    ctx.beginPath()
    this.setStyle(ctx, this.style.bg)
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    this.setStyle(ctx, [
      this.style.normal,
      this.down && this.style.down,
    ])
    ctx.arc(this.stick.x, this.stick.y, this.radius / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = JoyStick;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Value__ = __webpack_require__(7);



class ValueXY {

  constructor (x, y) {
    this._value = {
      x: new __WEBPACK_IMPORTED_MODULE_0__Value__["a" /* default */](x),
      y: new __WEBPACK_IMPORTED_MODULE_0__Value__["a" /* default */](y),
    }
  }

  set (x, y) {
    this._value.x.set(x)
    this._value.y.set(y)
  }

  get () {
    return {
      x: this._value.x.get(),
      y: this._value.y.get(),
    }
  }

  changed() {
    return this._value.x.changed() || this._value.y.changed()
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValueXY;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__values__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_math__ = __webpack_require__(0);





class Button extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

  constructor (name, label, radius = 40) {
    super('button', name)

    this.label = label
    this.value = new __WEBPACK_IMPORTED_MODULE_1__values__["a" /* Value */](false)
    this.radius = radius

    this.center = new __WEBPACK_IMPORTED_MODULE_2__utils_math__["a" /* Vec2 */]()

    this.style = {
      bg: {
        lineWidth: 3,
        fillStyle: '#4CA0A2',
        strokeStyle: '#00787A',
      },
      normal: {
        lineWidth: 3,
        fillStyle: '#65A79B',
        strokeStyle: '#FFF',
      },
      down: {
        fillStyle: '#4C8E82',
      },
    }
  }

  calculateBounds () {
    this.center.set(
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
  }

  update (touches) {
    for (let touch of touches) {
      if (!touch.bound && touch.pressed && this.checkPoint(touch)) {
        const len = this.center.clone().scale(-1).add(touch).len()

        if (len <= 1.2 * this.radius) {
          touch.bound = this.id
          this.value.set(true)
        }
      }
      if (touch.bound === this.id && touch.released) {
        this.value.set(false)
      }
    }
  }

  draw (ctx) {
    ctx.save()

    this.setStyle(ctx, this.style.bg)

    ctx.beginPath()
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    this.setStyle(ctx, [
      this.style.normal,
      this.value.get() && this.style.down
    ])
    ctx.arc(this.center.x, this.center.y, this.radius * 0.8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    if (this.label) {
      // TODO: Draw button label
    }

    ctx.restore()
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Controller__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ControllerGroup__ = __webpack_require__(8);




__WEBPACK_IMPORTED_MODULE_0__Controller__["a" /* default */].Group = __WEBPACK_IMPORTED_MODULE_1__ControllerGroup__["a" /* default */]

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Controller__["a" /* default */]);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ControllerGroup__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fscreen__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fscreen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fscreen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(4);





class Controller extends __WEBPACK_IMPORTED_MODULE_0__ControllerGroup__["a" /* default */] {

  constructor (config, flags, components) {
    super(flags, components)

    if ((config || {}).peer) {
      this.connect(config)
    }

    this.running = false

    this.view = document.createElement('canvas')
    this.ctx = this.view.getContext('2d')

    this.view.addEventListener('touchstart', this.onTouch.bind(this, 'start'), false)
    this.view.addEventListener('touchmove', this.onTouch.bind(this, 'move'), false)
    this.view.addEventListener('touchend', this.onTouch.bind(this, 'end'), false)
    this.view.addEventListener('click', ({ pageX: x, pageY: y}) => {
      if (this.width - 50 <= x && y <= 50) {
        __WEBPACK_IMPORTED_MODULE_1_fscreen___default.a.requestFullscreen(this.getView())
      }
    })

    window.addEventListener('resize', this.onSizeChange.bind(this))
    __WEBPACK_IMPORTED_MODULE_1_fscreen___default.a.addEventListener('fullscreenchange', this.onSizeChange.bind(this))
    this.onSizeChange()

    this.touches = []
  }

  connect ({ peer, room }) {
    peer.on('open', (id) => {
      const conn = peer.connect(room)
      conn.on('open', () => {
        conn.send(__WEBPACK_IMPORTED_MODULE_2__actions__["c" /* connect */](id))
        this.connection = conn
      })
    })
  }

  onSizeChange () {
    this.setBound({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    this.view.width = this.width
    this.view.height = this.height
  }

  handle (state, { identifier: ident, pageX: x, pageY: y}) {
    const touch = this.touches[ident] = this.touches[ident] || {}

    touch.down = touch.down || state !== 'end'
    touch.pressed = touch.pressed || state === 'start'
    touch.released = touch.released || state === 'end'

    touch.ident = ident
    touch.x = x
    touch.y = y
  }

  clearTouchState () {
    for (let touch of this.touches) {
      if (touch.released) {
        touch.down = false
        touch.bound = false
      }
      touch.pressed = false
      touch.released = false
    }
  }

  onTouch (state, e) {
    for (let touch of e.changedTouches) {
      this.handle(state, touch)
    }
  }

  getView () {
    return this.view
  }

  run () {
    if (this.running) return
    this.running = true

    const loop = now => {
      if (this.running) requestAnimationFrame(loop)
      this.tick()
    }
    requestAnimationFrame(loop)
  }

  stop () {
    this.running = false
  }

  tick () {
    this.update(this.touches)
    this.clearTouchState()

    const state = this.getState()
    if (state.length && this.connection) {
      this.connection.send(__WEBPACK_IMPORTED_MODULE_2__actions__["d" /* input */](state))
    }

    this.ctx.clearRect(0, 0, this.view.width, this.view.height)
    this.draw(this.ctx)
    this.ctx.fillRect(this.width - 50, 0, 50, 50)
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;




/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5
};

var webkit = ['webkitFullscreenEnabled', 'webkitFullscreenElement', 'webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitfullscreenchange', 'webkitfullscreenerror'];

var moz = ['mozFullScreenEnabled', 'mozFullScreenElement', 'mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozfullscreenerror'];

var ms = ['msFullscreenEnabled', 'msFullscreenElement', 'msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'MSFullscreenError'];

// so it doesn't throw if no window or document
var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};

var vendor = 'fullscreenEnabled' in document && Object.keys(key) || webkit[0] in document && webkit || moz[0] in document && moz || ms[0] in document && ms || [];

exports.default = {
  requestFullscreen: function requestFullscreen(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function requestFullscreenFunction(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document[vendor[key.exitFullscreen]].bind(document);
  },
  addEventListener: function addEventListener(type, handler, options) {
    return document.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function removeEventListener(type, handler) {
    return document.removeEventListener(vendor[key[type]], handler);
  },
  get fullscreenEnabled() {
    return Boolean(document[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {},
  get fullscreenElement() {
    return document[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {},
  get onfullscreenchange() {
    return document[('on' + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document[('on' + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document[('on' + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document[('on' + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};

/***/ })
/******/ ]);