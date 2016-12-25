'use strict';

import Wrapper from '../../components/jsonplaceholder';
import RemotePhoto from '../photo/remotePhoto.model';

class Model extends Wrapper {
  constructor() {
    super();
    this.resource = 'albums';
  }

  /**
   * Join albums with corresponding photos.
   * Returns promise with original albums on error
   * @param {Number?} limit
   * @return {Function}
   */
  static assignPhotosFn(limit) {
    /**
     * @param {Array} albums
     * @returns {Promise}
     */
    return function (albums) {
      return assignPhotos(albums, limit);
    };
  }
}

export default Model;


/**
 * @param {Array} albums
 * @param {Number?} limit
 * @returns {Promise}
 */
function assignPhotos(albums, limit) {
  if (!albums || !Array.isArray(albums)) {
    return Promise.resolve(albums);
  }
  return new RemotePhoto().list()
    .then(function (photos) {
      if (!photos || !Array.isArray(photos)) {
        return Promise.resolve(albums);
      }
      var album2idx = {};
      var photo;
      var i;
      var c;
      var idx;
      // classic loops for better performance
      for (i = 0, c = albums.length; i < c; ++i) {
        album2idx[albums[i].id] = i;
      }

      for (i = 0, c = photos.length; i < c; ++i) {
        photo = photos[i];
        if (album2idx.hasOwnProperty(photo.albumId)) {
          idx = album2idx[photo.albumId];
          if (!albums[idx].hasOwnProperty('photos')) {
            albums[idx].photos = [];
          }
          if (!limit || limit > albums[idx].photos.length) {
            albums[idx].photos.push(photo);
          }
        }
      }

      return Promise.resolve(albums);
    })
    .catch(function () {
      return Promise.resolve(albums);
    });
}
