'use strict';

import jsonpatch from 'fast-json-patch';
import routerFactory from './routerFactory';
import {HTTPError} from '../exception';

export {
  respondWithResult,
  patchUpdates,
  removeEntity,
  handleEntityNotFound,
  handleError,
  routerFactory,
};


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  return function (err) {
    if (err instanceof HTTPError) {
      statusCode = statusCode || +err.code;
    } else {
      statusCode = statusCode || 500;
    }
    res.status(statusCode).send(err);
    return null;
  };
}
