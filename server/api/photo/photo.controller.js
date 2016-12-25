'use strict';

import * as helpers from '../../components/helpers';
import RemotePhoto from './remotePhoto.model';

const remotePhoto = new RemotePhoto();

// Gets a list of Photos
export function index(req, res) {
  return remotePhoto.list(req.query)
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}

// Gets a single Photo from API
export function show(req, res) {
  return remotePhoto.read(req.params.id)
    .then(helpers.handleEntityNotFound(res))
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}

// Creates a new Photo via API
export function create(req, res) {
  return remotePhoto.create(req.body)
    .then(helpers.respondWithResult(res, 201))
    .catch(helpers.handleError(res));
}
