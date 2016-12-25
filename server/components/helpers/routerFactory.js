'use strict';

var express = require('express');

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  upsert
 * PATCH   /api/items/:id          ->  patch
 * DELETE  /api/items/:id          ->  destroy
 */

const mapping = {
  index(router, controller) {
    router.get('/', controller.index);
  },
  show(router, controller) {
    router.get('/:id', controller.show);
  },
  create(router, controller) {
    router.post('/', controller.create);
  },
  upsert(router, controller) {
    router.put('/:id', controller.upsert);
  },
  patch(router, controller) {
    router.patch('/:id', controller.patch);
  },
  destroy(router, controller) {
    router.delete('/:id', controller.destroy);
  },
};

/**
 * @param {Object} controller
 * @param {Array?} methods
 * @returns {express.Router}
 */
export default function routerFactory(controller, methods) {
  var router = express.Router();
  (methods || Object.keys(methods)).forEach(function (name) {
    mapping[name](router, controller);
  });
  return router;
}
