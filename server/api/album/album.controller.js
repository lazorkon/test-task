'use strict';

import * as helpers from '../../components/helpers';
import RemoteAlbum from './remoteAlbum.model';

const remoteAlbum = new RemoteAlbum();

// Gets a list of Albums
export function index(req, res) {
  return remoteAlbum.list(req.query)
    .then(RemoteAlbum.assignPhotosFn(5))
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
