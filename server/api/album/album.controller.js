'use strict';

import * as helpers from '../../components/helpers';
import RemoteAlbum from './remoteAlbum.model';

const remoteAlbum = new RemoteAlbum();

// Gets a list of Albums
export function index(req, res) {
  var filter = req.query && req.query.filter || {};
  var options = req.query && req.query.options || {};
  var promise = remoteAlbum.list(filter);
  if (options.withPhotos) {
    promise = promise.then(RemoteAlbum.assignPhotosFn(5));
  }
  return promise
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}

// Gets a single Album from API
export function show(req, res) {
  return remoteAlbum.read(req.params.id)
    .then(helpers.handleEntityNotFound(res))
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}
