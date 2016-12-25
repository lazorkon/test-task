'use strict';

import * as helpers from '../../components/helpers';
import RemoteUser from './remoteUser.model';

const remoteUser = new RemoteUser();

// Gets a list of Users
export function index(req, res) {
  return remoteUser.list()
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}

// Gets a single User from API
export function show(req, res) {
  return remoteUser.read(req.params.id)
    .then(helpers.handleEntityNotFound(res))
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}
