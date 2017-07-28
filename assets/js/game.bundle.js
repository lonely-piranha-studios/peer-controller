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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * Entity Component System module
 *
 * @module ecs
 */

var _entity = __webpack_require__(20);

var _entity2 = _interopRequireDefault(_entity);

var _system = __webpack_require__(21);

var _system2 = _interopRequireDefault(_system);

var _performance = __webpack_require__(22);

var _performance2 = _interopRequireDefault(_performance);

var _uid = __webpack_require__(9);

var _uid2 = _interopRequireDefault(_uid);

var _utils = __webpack_require__(10);

/**
 * @class  ECS
 */

var ECS = (function () {
  /**
   * @constructor
   * @class  ECS
   */

  function ECS() {
    _classCallCheck(this, ECS);

    /**
     * Store all entities of the ECS.
     *
     * @property entities
     * @type {Array}
     */
    this.entities = [];

    /**
     * Store entities which need to be tested at beginning of next tick.
     *
     * @property entitiesSystemsDirty
     * @type {Array}
     */
    this.entitiesSystemsDirty = [];

    /**
     * Store all systems of the ECS.
     *
     * @property systems
     * @type {Array}
     */
    this.systems = [];

    /**
     * incremented each time a new system requires an id
     * @type {Number}
     */
    this.systemsIds = 0;

    /**
     * store all systems by id
     * @type {Object}
     */
    this.systemsByIds = {};

    /**
     * Count how many updates have been done.
     *
     * @property updateCounter
     * @type {Number}
     */
    this.updateCounter = 0;

    this.lastUpdate = _performance2['default'].now();
  }

  // expose user stuff

  /**
   * Retrieve an entity by id
   * @param  {Number} id id of the entity to retrieve
   * @return {Entity} The entity if found null otherwise
   */

  _createClass(ECS, [{
    key: 'getEntityById',
    value: function getEntityById(id) {
      for (var i = 0, entity = undefined; entity = this.entities[i]; i += 1) {
        if (entity.id === id) {
          return entity;
        }
      }

      return null;
    }

    /**
     * Add an entity to the ecs.
     *
     * @method addEntity
     * @param {Entity} entity The entity to add.
     */
  }, {
    key: 'addEntity',
    value: function addEntity(entity) {
      this.entities.push(entity);
      entity.addToECS(this);
    }

    /**
     * Remove an entity from the ecs by reference.
     *
     * @method removeEntity
     * @param  {Entity} entity reference of the entity to remove
     * @return {Entity}        the remove entity if any
     */
  }, {
    key: 'removeEntity',
    value: function removeEntity(entity) {
      var index = this.entities.indexOf(entity);
      var entityRemoved = null;

      // if the entity is not found do nothing
      if (index !== -1) {
        entityRemoved = this.entities[index];

        entity.dispose();
        this.removeEntityIfDirty(entityRemoved);

        (0, _utils.fastSplice)(this.entities, index, 1);
      }

      return entityRemoved;
    }

    /**
     * Remove an entity from the ecs by entity id.
     *
     * @method removeEntityById
     * @param  {Entity} entityId id of the entity to remove
     * @return {Entity}          removed entity if any
     */
  }, {
    key: 'removeEntityById',
    value: function removeEntityById(entityId) {
      for (var i = 0, entity = undefined; entity = this.entities[i]; i += 1) {
        if (entity.id === entityId) {
          entity.dispose();
          this.removeEntityIfDirty(entity);

          (0, _utils.fastSplice)(this.entities, i, 1);

          return entity;
        }
      }
    }

    /**
     * Remove an entity from dirty entities by reference.
     *
     * @private
     * @method removeEntityIfDirty
     * @param  {[type]} entity entity to remove
     */
  }, {
    key: 'removeEntityIfDirty',
    value: function removeEntityIfDirty(entity) {
      var index = this.entitiesSystemsDirty.indexOf(entity);

      if (index !== -1) {
        (0, _utils.fastSplice)(this.entities, index, 1);
      }
    }

    /**
     * Add a system to the ecs.
     *
     * @method addSystem
     * @param {System} system system to add
     */
  }, {
    key: 'addSystem',
    value: function addSystem(system) {
      if (system.id === -1) {
        system.id = this.systemsIds++;
      }

      this.systems.push(system);
      this.systemsByIds[system.id] = system;
      // iterate over all entities to eventually add system
      for (var i = 0, entity = undefined; entity = this.entities[i]; i += 1) {
        if (system.test(entity)) {
          system.addEntity(entity);
        }
      }
    }

    /**
     * Remove a system from the ecs.
     *
     * @method removeSystem
     * @param  {System} system system reference
     */
  }, {
    key: 'removeSystem',
    value: function removeSystem(system) {
      var index = this.systems.indexOf(system);

      if (index !== -1) {
        (0, _utils.fastSplice)(this.systems, index, 1);
        this.systemsByIds[system.id] = null;

        system.dispose();
      }
    }

    /**
     * "Clean" entities flagged as dirty by removing unecessary systems and
     * adding missing systems.
     *
     * @private
     * @method cleanDirtyEntities
     */
  }, {
    key: 'cleanDirtyEntities',
    value: function cleanDirtyEntities() {
      // jshint maxdepth: 4

      for (var i = 0, entity = undefined; entity = this.entitiesSystemsDirty[i]; i += 1) {
        for (var s = 0, system = undefined; system = this.systems[s]; s += 1) {
          // for each dirty entity for each system
          //let index = entity.systems.indexOf(system);
          var hasSystem = entity.systems[system.id];
          var entityTest = system.test(entity);

          if (!hasSystem && entityTest) {
            // if the entity is not added to the system yet and should be, add it
            system.addEntity(entity);
          } else if (hasSystem && !entityTest) {
            // if the entity is added to the system but should not be, remove it
            system.removeEntity(entity);
          }
          // else we do nothing the current state is OK
        }

        entity.systemsDirty = false;
      }
      // jshint maxdepth: 3

      this.entitiesSystemsDirty = [];
    }

    /**
     * Update the ecs.
     *
     * @method update
     */
  }, {
    key: 'update',
    value: function update() {
      var now = _performance2['default'].now();
      var elapsed = now - this.lastUpdate;

      for (var i = 0, system = undefined; system = this.systems[i]; i += 1) {
        if (this.updateCounter % system.frequency > 0) {
          break;
        }

        if (this.entitiesSystemsDirty.length) {
          // if the last system flagged some entities as dirty check that case
          this.cleanDirtyEntities();
        }

        system.updateAll(elapsed);
      }

      this.updateCounter += 1;
      this.lastUpdate = now;
    }
  }]);

  return ECS;
})();

ECS.Entity = _entity2['default'];
ECS.System = _system2['default'];
ECS.uid = _uid2['default'];

exports['default'] = ECS;
module.exports = exports['default'];

/***/ }),
/* 2 */,
/* 3 */,
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module  uid
 */
/*
 * UIDGenerator for multi-instance Entity Component System
 * Generate numeric unique ids for ECS entities. The requirements are:
 *  * generate Numbers for fast comparaison, low storage and bandwidth usage
 *  * generators can be salted so you can use multiple generators with 
 *  uniqueness guaranty
 *  * each salted generator can generate reasonable amount of unique ids
 */

// maximum number of salted generators that can run concurently, once the
// number of allowed generators has been reached the salt of the next
// generator is silently reset to 0
var MAX_SALTS = 10000;

var MAX_ENTITY_PER_GENERATOR = Math.floor(Number.MAX_SAFE_INTEGER / MAX_SALTS) - 1;
var currentSalt = 0;

/**
 * Generate unique sequences of Numbers. Can be salted (up to 9999 salts)
 * to generate differents ids.
 *
 * To work properly, ECS needs to associate an unique id with each entity. But
 * to preserve efficiency, the unique id must be a Number (more exactly a safe 
 * integer).
 *
 * The basic implementation would be an incremented Number to generate a unique
 * sequence, but this fails when several ecs instances are running and creating
 * entities concurrently (e.g. in a multiplayer networked game). To work around
 * this problem, ecs provide UIDGenerator class which allow you to salt your 
 * generated ids sequence. Two generators with different salts will NEVER 
 * generate the same ids.
 *
 * Currently, there is a maxumum of 9999 salts and about 900719925473 uid per
 * salt. These limits are hard-coded, but I plan to expose these settings in
 * the future.
 * 
 * @class  UIDGenerator
 */

var UIDGenerator = (function () {
  /**
   * @constructor
   * @class  UIDGenerator
   * @param  {Number} [salt=0] The salt to use for this generator. Number 
   * between 0 and 9999 (inclusive).
   */

  function UIDGenerator() {
    var salt = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    _classCallCheck(this, UIDGenerator);

    /**
     * The salt of this generator.
     * @property {Number} salt
     */
    this.salt = salt;

    /**
     * The counter used to generate unique sequence.
     * @property {Number} uidCount
     */
    this.uidCounter = 0;
  }

  /**
   * @class UID
   */

  /**
   * Create a new unique id.
   * 
   * @return {Number} An unique id.
   */

  _createClass(UIDGenerator, [{
    key: "next",
    value: function next() {
      var nextUid = this.salt + this.uidCounter * MAX_SALTS;

      // if we exceed the number of maximum entities (which is
      // very high) reset the counter.
      if (++this.uidCounter >= MAX_ENTITY_PER_GENERATOR) {
        this.uidCounter = 0;
      }

      return nextUid;
    }
  }]);

  return UIDGenerator;
})();

var UID = {
  /**
   * A reference to UIDGenerator class.
   * 
   * @property {class} UIDGenerator
   */
  UIDGenerator: UIDGenerator,
  /**
   * The default generator to use if an entity is created without id or generator instance.
   * 
   * @property {UIDGenerator} DefaultUIDGenerator
   */
  DefaultUIDGenerator: new UIDGenerator(currentSalt++),
  /**
   * Return true if the entity id was salted by given salt
   * 
   * @param  {String} entityId Entity id to test
   * @param  {String} salt     Salt to test
   * @return {Boolean}         true if the id was generated by the salt, false
   * otherwise
   */
  isSaltedBy: function isSaltedBy(entityId, salt) {
    return entityId % MAX_SALTS === salt;
  },
  /**
   * Return the next unique salt.
   *
   * @method  nextSalt
   * @return {Number} A unique salt.
   */
  nextSalt: function nextSalt() {
    var salt = currentSalt;

    // if we exceed the number of maximum salts, silently reset
    // to 1 (since 0 will always be the default generator)
    if (++currentSalt > MAX_SALTS - 1) {
      currentSalt = 1;
    }

    return salt;
  },
  /**
   * Create a new generator with unique salt.
   *
   * @method  nextGenerator
   * @return {UIDGenerator} The created UIDGenerator.
   */
  nextGenerator: function nextGenerator() {
    return new UIDGenerator(UID.nextSalt());
  }
};

exports["default"] = UID;
module.exports = exports["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastBind = fastBind;
exports.fastSplice = fastSplice;

function fastBind(thisArg, methodFunc) {
  return function () {
    methodFunc.apply(thisArg, arguments);
  };
}

function fastSplice(array, startIndex, removeCount) {
  var len = array.length;
  var removeLen = 0;

  if (startIndex >= len || removeCount === 0) {
    return;
  }

  removeCount = startIndex + removeCount > len ? len - startIndex : removeCount;
  removeLen = len - removeCount;

  for (var i = startIndex; i < len; i += 1) {
    array[i] = array[i + removeCount];
  }

  array.length = removeLen;
}

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__example__ = __webpack_require__(19);




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yagl_ecs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gfx_Canvas__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_GamePad__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__systems__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(4);










class Game {

  constructor () {
    this.canvas = new __WEBPACK_IMPORTED_MODULE_1__gfx_Canvas__["a" /* default */](window.innerWidth, window.innerHeight)

    this.ecs = new __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default.a()

    const mapSystem = new __WEBPACK_IMPORTED_MODULE_3__systems__["a" /* default */].MapSystem(this.canvas.getContext())
    mapSystem.setMap(__webpack_require__(37))

    this.ecs.addSystem(new __WEBPACK_IMPORTED_MODULE_3__systems__["a" /* default */].GamePadSystem())
    this.ecs.addSystem(mapSystem)
    this.ecs.addSystem(new __WEBPACK_IMPORTED_MODULE_3__systems__["a" /* default */].PhysicSystem())
    this.ecs.addSystem(new __WEBPACK_IMPORTED_MODULE_3__systems__["a" /* default */].RenderingSystem(this.canvas.getContext()))

    this.openRoom('game')
  }

  openRoom (room) {
    if (this._peer && !this._peer.destroyed) {
      this._peer.destroy()
    }

    const peer = this._peer = new Peer(room, {
      host: location.hostname,
      port: location.port,
      path: '/peer'
    })

    peer.on('connection', (conn) => {
      const entity = new __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default.a.Entity(null, [
        __WEBPACK_IMPORTED_MODULE_4__components__["a" /* default */].Controller,
        __WEBPACK_IMPORTED_MODULE_4__components__["a" /* default */].Position,
        __WEBPACK_IMPORTED_MODULE_4__components__["a" /* default */].Display,
        __WEBPACK_IMPORTED_MODULE_4__components__["a" /* default */].Physic,
      ])
      entity.updateComponent('display', {
        width: 16,
        height: 32,
      })
      entity.updateComponent('pos', {
        x: 100,
        y: 100,
      })
      entity.components.controller = new __WEBPACK_IMPORTED_MODULE_2__input_GamePad__["a" /* default */](conn)

      conn.on('close', () => {
        this.ecs.removeEntity(entity)
      })

      conn.on('data', (action) => {
        switch (action.type) {

          case __WEBPACK_IMPORTED_MODULE_5__actions__["a" /* CONNECT */]:
            console.log(`%c${__WEBPACK_IMPORTED_MODULE_5__actions__["a" /* CONNECT */]}`, 'color:orange', action.payload)
            this.ecs.addEntity(entity)
            break;

          case __WEBPACK_IMPORTED_MODULE_5__actions__["b" /* INPUT */]:
            entity.components.controller.update(action.payload)
            break;
        }
      })
    })

  }

  run () {
    if (this.running) return
    this.running = true

    const loop = now => {
      if (this.running) requestAnimationFrame(loop)
      this.tick()
    }
    loop()
  }

  stop () {
    this.running = false
  }

  tick () {
    this.canvas.clear()
    this.ecs.update()
  }

}

const game = new Game()
game.run()

document.body.appendChild(game.canvas.view)



/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * @module  ecs
 */

var _uid = __webpack_require__(9);

//import { fastSplice } from './utils';

/**
 * An entity.
 *
 * @class  Entity
 */

var Entity = (function () {
  /**
   * @class Entity
   * @constructor
   *
   * @param  {Number|UIDGenerator} [idOrUidGenerator=null] The entity id if
   * a Number is passed. If an UIDGenerator is passed, the entity will use
   * it to generate a new id. If nothing is passed, the entity will use
   * the default UIDGenerator.
   *
   * @param {Array[Component]} [components=[]] An array of initial components.
   */

  function Entity(idOrUidGenerator) {
    var components = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Entity);

    /**
     * Unique identifier of the entity.
     *
     * @property {Number} id
     */
    this.id = null;

    /**
     * a reference to the parent ecs
     * @type {ECS}
     */
    this.ecs = null;

    // initialize id depending on what is the first argument
    if (typeof idOrUidGenerator === 'number') {
      // if a number was passed then simply set it as id
      this.id = idOrUidGenerator;
    } else if (idOrUidGenerator instanceof _uid.UIDGenerator) {
      // if an instance of UIDGenerator was passed then use it to generate
      // the id. This allow the user to use multiple UID generators and
      // therefore to create entities with unique ids accross a cluster
      // or an async environment. See uid.js for more details
      this.id = idOrUidGenerator.next();
    } else {
      // if nothing was passed simply use the default generator
      this.id = _uid.DefaultUIDGenerator.next();
    }

    /**
     * Systems applied to the entity.
     *
     * @property {Array[System]} systems
     */
    this.systems = {};

    /**
     * Indiquate a change in components (a component was removed or added)
     * which require to re-compute entity eligibility to all systems.
     *
     * @property {Boolean} systemsDirty
     */
    this.systemsDirty = false;

    /**
     * Components of the entity stored as key-value pairs.
     *
     * @property {Object} components
     */
    this.components = {};

    // components initialisation
    for (var i = 0, component = undefined; component = components[i]; i += 1) {
      // if a getDefaults method is provided, use it. First because let the
      // runtime allocate the component is way more faster than using a copy
      // function. Secondly because the user may want to provide some kind
      // of logic in components initialisation ALTHOUGH these kind of
      // initialisation should be done in enter() handler
      if (component.getDefaults) {
        this.components[component.name] = component.getDefaults();
      } else {
        this.components[component.name] = Object.assign({}, components[i].defaults);
      }
    }

    /**
     * A reference to parent ECS class.
     * @property {ECS} ecs
     */
    this.ecs = null;
  }

  /**
   * Set the parent ecs reference.
   *
   * @private
   * @param {ECS} ecs An ECS class instance.
   */

  _createClass(Entity, [{
    key: 'addToECS',
    value: function addToECS(ecs) {
      this.ecs = ecs;
      this.setSystemsDirty();
    }

    /**
     * Set the systems dirty flag so the ECS knows this entity
     * needs to recompute eligibility at the beginning of next
     * tick.
     */
  }, {
    key: 'setSystemsDirty',
    value: function setSystemsDirty() {
      if (!this.systemsDirty && this.ecs) {
        this.systemsDirty = true;

        // notify to parent ECS that this entity needs to be tested next tick
        this.ecs.entitiesSystemsDirty.push(this);
      }
    }

    /**
     * Add a system to the entity.
     *
     * @private
     * @param {System} system The system to add.
     */
  }, {
    key: 'addSystem',
    value: function addSystem(system) {
      this.systems[system.id] = true;
      //this.systems.push(system);
    }

    /**
     * Remove a system from the entity.
     *
     * @private
     * @param  {System} system The system reference to remove.
     */
  }, {
    key: 'removeSystem',
    value: function removeSystem(system) {
      this.systems[system.id] = false;
      /*let index = this.systems.indexOf(system);
        if (index !== -1) {
        fastSplice(this.systems, index, 1);
      }*/
    }

    /**
     * Add a component to the entity. WARNING this method does not copy
     * components data but assign directly the reference for maximum
     * performances. Be sure not to pass the same component reference to
     * many entities.
     *
     * @param {String} name Attribute name of the component to add.
     * @param {Object} data Component data.
     */
  }, {
    key: 'addComponent',
    value: function addComponent(name, data) {
      this.components[name] = data || {};
      this.setSystemsDirty();
    }

    /**
     * Remove a component from the entity. To preserve performances, we
     * simple set the component property to `undefined`. Therefore the
     * property is still enumerable after a call to removeComponent()
     *
     * @param  {String} name Name of the component to remove.
     */
  }, {
    key: 'removeComponent',
    value: function removeComponent(name) {
      if (!this.components[name]) {
        return;
      }

      this.components[name] = undefined;
      this.setSystemsDirty();
    }

    /**
     * Update a component field by field, NOT recursively. If the component
     * does not exists, this method create it silently.
     *
     * @method updateComponent
     * @param  {String} name Name of the component
     * @param  {Object} data Dict of attributes to update
     * @example
     *   entity.addComponent('kite', {vel: 0, pos: {x: 1}});
     *   // entity.component.pos is '{vel: 0, pos: {x: 1}}'
     *   entity.updateComponent('kite', {angle: 90, pos: {y: 1}});
     *   // entity.component.pos is '{vel: 0, angle: 90, pos: {y: 1}}'
     */
  }, {
    key: 'updateComponent',
    value: function updateComponent(name, data) {
      var component = this.components[name];

      if (!component) {
        this.addComponent(name, data);
      } else {
        var keys = Object.keys(data);

        for (var i = 0, key = undefined; key = keys[i]; i += 1) {
          component[key] = data[key];
        }
      }
    }

    /**
     * Update a set of components.
     *
     * @param  {Object} componentsData Dict of components to update.
     */
  }, {
    key: 'updateComponents',
    value: function updateComponents(componentsData) {
      var components = Object.keys(componentsData);

      for (var i = 0, component = undefined; component = components[i]; i += 1) {
        this.updateComponent(component, componentsData[component]);
      }
    }

    /**
     * Dispose the entity.
     *
     * @private
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      var system = null;
      var systemIds = Object.keys(this.systems);

      for (var i = 0, id; id = systemIds[i]; i += 1) {
        system = this.ecs.systemsByIds[id];

        if (system) {
          system.removeEntity(this);
        }
      }
    }
  }]);

  return Entity;
})();

exports['default'] = Entity;
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * @module  ecs
 */

var _utils = __webpack_require__(10);

// forced to disable this check for abstract methods
// jshint unused:false
/**
 * @class  System
 *
 * @description  A system update all eligible entities at a given frequency.
 * This class is not meant to be used directly and should be sub-classed to
 * define specific logic.
 */

var System = (function () {
  /**
   * @class  System
   * @constructor
   * @param [frequency=1] {Number} Frequency of execution.
   */

  function System() {
    var frequency = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    _classCallCheck(this, System);

    /**
     * Frequency of update execution, a frequency of `1` run the system every
     * update, `2` will run the system every 2 updates, ect.
     * @property {Number} frequency
     */
    this.frequency = frequency;

    // assigned by ecs when added
    this.id = -1;

    /**
     * Entities of the system.
     *
     * @property {Array[Entity]} entities
     */
    this.entities = [];
  }

  // jshint unused:true

  /**
   * Add an entity to the system entities.
   *
   * @param {Entity} entity The entity to add to the system.
   */

  _createClass(System, [{
    key: 'addEntity',
    value: function addEntity(entity) {
      entity.addSystem(this);
      this.entities.push(entity);

      this.enter(entity);
    }

    /**
     * Remove an entity from the system entities. exit() handler is executed
     * only if the entity actually exists in the system entities.
     *
     * @param  {Entity} entity Reference of the entity to remove.
     */
  }, {
    key: 'removeEntity',
    value: function removeEntity(entity) {
      var index = this.entities.indexOf(entity);

      if (index !== -1) {
        entity.removeSystem(this);
        (0, _utils.fastSplice)(this.entities, index, 1);

        this.exit(entity);
      }
    }

    /**
     * Apply update to each entity of this system.
     *
     * @method  updateAll
     */
  }, {
    key: 'updateAll',
    value: function updateAll(elapsed) {
      this.preUpdate();

      for (var i = 0, entity = undefined; entity = this.entities[i]; i += 1) {
        this.update(entity, elapsed);
      }

      this.postUpdate();
    }

    /**
     * dispose the system by exiting all the entities
     *
     * @method  dispose
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      for (var i = 0, entity = undefined; entity = this.entities[i]; i += 1) {
        entity.removeSystem(this);
        this.exit(entity);
      }
    }

    // methods to be extended by subclasses
    /**
     * Abstract method to subclass. Called once per update, before entities
     * iteration.
     *
     * @method  preUpdate
     */
  }, {
    key: 'preUpdate',
    value: function preUpdate() {}

    /**
     * Abstract method to subclass. Called once per update, after entities
     * iteration.
     *
     * @method  postUpdate
     */
  }, {
    key: 'postUpdate',
    value: function postUpdate() {}

    /**
     * Abstract method to subclass. Should return true if the entity is eligible
     * to the system, false otherwise.
     *
     * @method  test
     * @param  {Entity} entity The entity to test.
     */
  }, {
    key: 'test',
    value: function test(entity) {
      return false;
    }

    /**
     * Abstract method to subclass. Called when an entity is added to the system.
     *
     * @method  enter
     * @param  {Entity} entity The added entity.
     */
  }, {
    key: 'enter',
    value: function enter(entity) {}

    /**
     * Abstract method to subclass. Called when an entity is removed from the system.
     *
     * @method  exit
     * @param  {Entity} entity The removed entity.
     */
  }, {
    key: 'exit',
    value: function exit(entity) {}

    /**
     * Abstract method to subclass. Called for each entity to update. This is
     * the only method that should actual mutate entity state.
     *
     * @method  update
     * @param  {Entity} entity The entity to update.
     */
  }, {
    key: 'update',
    value: function update(entity) {}
  }]);

  return System;
})();

exports['default'] = System;
module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", {
  value: true
});

/*global global */

var perf = null,
    start = Date.now();

// use global browser performance module
// for node create a polyfill
if (!global) {
  perf = window.performance;
} else {
  perf = {
    now: function now() {
      return Date.now() - start;
    }
  };
}

exports["default"] = perf;
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Canvas {

  constructor (width, height) {
    this.view = document.createElement('canvas')
    this.ctx = this.view.getContext('2d')

    this.width = this.view.width = width
    this.height = this.view.height = height
  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  getContext () {
    return this.ctx
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_circular_buffer__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_circular_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_circular_buffer__);



class GamePad {

  constructor (conn) {
    // Can max hold 100 input actions
    this._actionBuffer = new __WEBPACK_IMPORTED_MODULE_0_circular_buffer___default.a(100)
    this._state = {}
    this._conn = conn
  }

  send (action) {
    conn.send(action)
  }

  getState () {
    const state = this._state

    // Clear previous state
    for (let key in state) {
      if (state[key].type === 'button') {
        if (state[key].released) {
          state[key].down = false
        }
        state[key].pressed = false
        state[key].released = false
      }
    }

    // Aggregate all actions since last call
    while (this._actionBuffer.size()) {
      const nextAction = this._actionBuffer.deq()
      if (!nextAction) continue

      const { type, value, name } = nextAction
      const fname = String(name).toLowerCase()
      const action = state[fname] = state[fname] || {}

      switch (action.type = type) {
        // case Controller.JOYSTICK
        case 'joystick':
          action.value = value
          break;
        // case Controller.BUTTON
        case 'button':
          action.down = !!action.down || value
          action.pressed = !!action.pressed || value
          action.released = !!action.released || !value
          break;
      }
    }
    return this
  }

  axis (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].value) || {
      x: 0,
      y: 0,
    }
  }

  down (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].down) || false
  }

  pressed (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].pressed) || false
  }

  released (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].released) || false
  }

  update (actions) {
    if (Array.isArray(actions)) {
      for (let action of actions) {
        this._actionBuffer.enq(action)
      }
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GamePad;



/***/ }),
/* 26 */
/***/ (function(module, exports) {

function CircularBuffer(capacity){
	if(!(this instanceof CircularBuffer))return new CircularBuffer(capacity);
	if(typeof capacity=="object"&&
		Array.isArray(capacity["_buffer"])&&
		typeof capacity._capacity=="number"&&
		typeof capacity._first=="number"&&
		typeof capacity._size=="number"){
		for(var prop in capacity){
			if(capacity.hasOwnProperty(prop))this[prop]=capacity[prop];
		}
	} else {
		if(typeof capacity!="number"||capacity%1!=0||capacity<1)
			throw new TypeError("Invalid capacity");
		this._buffer=new Array(capacity);
		this._capacity=capacity;
		this._first=0;
		this._size=0;
	}
}

CircularBuffer.prototype={
	size:function(){return this._size;},
	capacity:function(){return this._capacity;},
	enq:function(value){
		if(this._first>0)this._first--; else this._first=this._capacity-1;
		this._buffer[this._first]=value;
		if(this._size<this._capacity)this._size++;
	},
	push:function(value){
		if(this._size==this._capacity){
			this._buffer[this._first]=value;
			this._first=(this._first+1)%this._capacity;
		} else {
			this._buffer[(this._first+this._size)%this._capacity]=value;
			this._size++;
		}
	},
	deq:function(){
		if(this._size==0)throw new RangeError("dequeue on empty buffer");
		var value=this._buffer[(this._first+this._size-1)%this._capacity];
		this._size--;
		return value;
	},
	pop:function(){return this.deq();},
	shift:function(){
		if(this._size==0)throw new RangeError("shift on empty buffer");
		var value=this._buffer[this._first];
		if(this._first==this._capacity-1)this._first=0; else this._first++;
		this._size--;
		return value;
	},
	get:function(start,end){
		if(this._size==0&&start==0&&(end==undefined||end==0))return [];
		if(typeof start!="number"||start%1!=0||start<0)throw new TypeError("Invalid start");
		if(start>=this._size)throw new RangeError("Index past end of buffer: "+start);

		if(end==undefined)return this._buffer[(this._first+start)%this._capacity];

		if(typeof end!="number"||end%1!=0||end<0)throw new TypeError("Invalid end");
		if(end>=this._size)throw new RangeError("Index past end of buffer: "+end);

		if(this._first+start>=this._capacity){
			//make sure first+start and first+end are in a normal range
			start-=this._capacity; //becomes a negative number
			end-=this._capacity;
		}
		if(this._first+end<this._capacity)
			return this._buffer.slice(this._first+start,this._first+end+1);
		else
			return this._buffer.slice(this._first+start,this._capacity).concat(this._buffer.slice(0,this._first+end+1-this._capacity));
	},
	toarray:function(){
		if(this._size==0)return [];
		return this.get(0,this._size-1);
	}
};

module.exports=CircularBuffer;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RenderingSystem__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GamePadSystem__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PhysicSystem__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MapSystem__ = __webpack_require__(31);






/* harmony default export */ __webpack_exports__["a"] = ({
  RenderingSystem: __WEBPACK_IMPORTED_MODULE_0__RenderingSystem__["a" /* default */],
  GamePadSystem: __WEBPACK_IMPORTED_MODULE_1__GamePadSystem__["a" /* default */],
  PhysicSystem: __WEBPACK_IMPORTED_MODULE_2__PhysicSystem__["a" /* default */],
  MapSystem: __WEBPACK_IMPORTED_MODULE_3__MapSystem__["a" /* default */],
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yagl_ecs__);



class RenderingSystem extends __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__["System"] {

  constructor (ctx) {
    super()
    this.ctx = ctx
  }

  test (entity) {
    return ['pos', 'display'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { pos, display } = entity.components
    const { width: w, height: h, color: clr } = display
    const w2 = w/2
    const h2 = h/2

    this.ctx.save()
    this.ctx.fillStyle = clr
    this.ctx.fillRect(pos.x - w2, pos.y - h2, w, h)
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(pos.x - 1, pos.y - 1, 3, 3)
    this.ctx.restore()
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderingSystem;




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yagl_ecs__);



class GamePadSystem extends __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__["System"] {

  test (entity) {
    return ['physic', 'controller'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { physic, controller } = entity.components
    const input = controller.getState()
    const speed = 3

    if (input.pressed('a') && physic.collision.bottom) {
      //physic.vel.y = -12
    }
    if (input.released('a')) {
      /*
      if (physic.vel.y < -6) {
        physic.vel.y = -6
      }
      */
    }
    if (input.released('b')) {
      console.log(entity.id, 'b is released!')
    }
    if (input.pressed('c')) {
      console.log(entity.id, 'c is pressed!')
    }
    if (input.down('c')) {
      console.log(entity.id, 'c is down!')
    }

    physic.vel.x = input.axis('joystick').x * 3
    physic.vel.y = input.axis('joystick').y * 3
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GamePadSystem;




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yagl_ecs__);



class PhysicSystem extends __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__["System"] {

  test (entity) {
    return ['pos', 'physic'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { pos, physic } = entity.components
    const { vel, cor } = physic

    if (!physic.onGround && false) {
      physic.vel.y = Math.min(12, physic.vel.y + 0.5)
    }

    pos.x += vel.x + cor.x
    pos.y += vel.y + cor.y

    cor.x = 0
    cor.y = 0
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicSystem;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yagl_ecs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yagl_ecs__);



class MapSystem extends __WEBPACK_IMPORTED_MODULE_0_yagl_ecs__["System"] {

  constructor (ctx) {
    super()
    this.ctx = ctx
  }

  test (entity) {
    return ['pos', 'physic', 'display'].every(comp => !!entity.components[comp])
  }

  checkCollision (entity) {
    const { pos, physic, display } = entity.components
    const { vel, cor } = physic
    const { width: ew, height: eh } = display

    const tw = this.tileWidth
    const th = this.tileHeight

    // Predicate
    const pred = {
      x: pos.x + vel.x,
      y: pos.y + vel.y,
    }
    // Calculate necessary map area
    const area = {
      tx: Math.floor((Math.min(pos.x, pred.x) - ew / 2) / tw),
      ty: Math.floor((Math.min(pos.y, pred.y) - eh / 2) / th),
      bx: Math.floor((Math.max(pos.x, pred.x) + ew / 2) / tw),
      by: Math.floor((Math.max(pos.y, pred.y) + eh / 2) / th),
    }

    this.ctx.save()
    this.ctx.globalAlpha = 0.9
    this.ctx.fillStyle = 'yellow'
    this.ctx.fillRect(
      area.tx * tw,
      area.ty * th,
      (area.bx - area.tx + 1) * tw,
      (area.by - area.ty + 1) * th,
    )
    this.ctx.restore()
    physic.onGround = false

    for (let x = area.tx; x <= area.bx; x++) {
      for (let y = area.ty; y <= area.by; y++) {
        const tx = x * tw + tw/2
        const ty = y * th + th/2

        this.ctx.fillRect(tx-1, ty-1, 3, 3)
        if (this.collisionMap.solid(x, y)) {
          // center of tile

          // distance on the axes
          const dx = Math.abs(pos.x - tx) - (tw + ew)/2
          const dy = Math.abs(pos.y - ty) - (th + eh)/2
          const dist = Math.abs(dx) > Math.abs(dy) ? dx : dy

          const norm = {
            x: (dx >  dy) * (dx < 0 ? -1 : 1),
            y: (dx <= dy) * (dy < 0 ? -1 : 1),
          }
          // Internal edge
          if (this.collisionMap.solid(x + norm.x, y + norm.y)) {
            continue
          }
          const seperation = Math.max(dist, 0)
          const penetration = Math.min(dist, 0)
          const nv = (norm.x * vel.x + norm.y * vel.y) + seperation
          if (nv < 0) {
            //cor.x -= norm.x * penetration
            //cor.y -= norm.y * penetration

            vel.x -= nv * norm.x
            vel.y -= nv * norm.y

            physic.onGround = norm.y < 0
          }

        }
      }
    }

  }

  setMap (map) {
    const rows = String(map).trim().split('\n')

    this.tileWidth = 16
    this.tileHeight = 16
    this.width = rows[0].length
    this.height = rows.length

    this.data = rows.reduce((acc, row) => acc.concat(row.split('')), [])
    this.collisionMap = {
      width: this.width,
      height: this.height,
      data: this.data.map(tile => {
        return ['#'].includes(tile) ? 1 : 0
      }),
      solid(x, y) {
        return this.data[x + y*this.width]
      },
    }
  }

  update (entity) {
    this.checkCollision(entity)
  }

  preUpdate () {
    this.draw(this.ctx)
  }

  draw (ctx) {
    const { tileWidth: tw, tileHeight: th, width, height } = this

    ctx.save()
    let x = 0, y = 0

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = this.data[x + y * width]
        const tx = x * tw
        const ty = y * th

        switch (tile) {
          case '#':
            ctx.fillStyle = '#000'
            ctx.fillRect(tx, ty, tw, th)
            break
          case 'v':
            ctx.fillStyle = 'red'
            ctx.fillRect(tx, ty + 4, tw, th - 4)
            break
          case 'o':
            ctx.fillStyle = 'orange'
            ctx.beginPath()
            ctx.arc(tx + tw / 2, ty + th / 2, tw * 0.3, 0, 2 * Math.PI)
            ctx.fill()
            break;
        }
      }
    }

    ctx.restore()
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapSystem;




/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Display__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Controller__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Position__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Physic__ = __webpack_require__(36);






/* harmony default export */ __webpack_exports__["a"] = ({
  Display: __WEBPACK_IMPORTED_MODULE_0__Display__["a" /* default */],
  Physic: __WEBPACK_IMPORTED_MODULE_3__Physic__["a" /* default */],
  Controller: __WEBPACK_IMPORTED_MODULE_1__Controller__["a" /* default */],
  Position: __WEBPACK_IMPORTED_MODULE_2__Position__["a" /* default */],
});


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = ''
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return `#${color}`
}

const Display = {
  name: 'display',

  getDefaults: () => ({
    color: getRandomColor(),
    width: 40,
    height: 40,
  })
}

/* harmony default export */ __webpack_exports__["a"] = (Display);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const Controller = {
  name: 'controller',
  defaults: false,
}

/* harmony default export */ __webpack_exports__["a"] = (Controller);



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const Position = {
  name: 'pos',
  defaults: {
    x: 0,
    y: 0
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Position);



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const Physic = {
  name: 'physic',
  defaults: {
    vel: { x: 0, y: 0 },
    cor: { x: 0, y: 0 },
    onGround: false,
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Physic);



/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "\n\n\n\n################################\n#                              #\n#                              #\n#                              #\n#                              #\n#                              #\n#                              #\n#               o o   o        #\n#           #############      #\n#                              #\n#                              #\n#            o o o             #\n#    ###############           #\n#                              #\n#                              #\n#                              #\n#                              #\n#              #vvvvvvvvvvv#   #\n################################\n\n\n\n"

/***/ })
/******/ ]);