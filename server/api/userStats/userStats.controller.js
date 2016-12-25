'use strict';

import * as helpers from '../../components/helpers';
import Promise from 'bluebird';
import RemoteUser from '../user/remoteUser.model';
import RemoteAlbum from '../album/remoteAlbum.model';
import RemotePhoto from '../photo/remotePhoto.model';

export function index(req, res) {
  return Promise.all([
    new RemoteUser().list(req.query),
    new RemoteAlbum().list(),
    new RemotePhoto().list(),
  ]).spread(RemoteUser.getStat)
    .then(helpers.respondWithResult(res))
    .catch(helpers.handleError(res));
}
