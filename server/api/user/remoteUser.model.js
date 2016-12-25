'use strict';

import Wrapper from '../../components/jsonplaceholder';

class Model extends Wrapper {
  constructor() {
    super();
    this.resource = 'users';
  }

  list(params) {
    return super.list(params).then(prepareList);
  }

  /**
   * @param {Array} users
   * @param {Array} albums
   * @param {Array} photos
   * @return {Array.<Object>}
   */
  static getStat(users, albums, photos) {
    return buildStat(users, albums, photos);
  }
}

export default Model;


function prepareList(list) {
  return list.map(function (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  });
}


function buildStat(users, albums, photos) {
  var result = [];
  var resultRow;
  var user2idx = {};
  var album2userIdx = {};
  var user;
  var album;
  var photo;
  var i;
  var c;
  result.length = users.length;

  // classic loops for better performance
  for (i = 0, c = users.length; i < c; ++i) {
    user = users[i];
    user2idx[user.id] = i;
    result[i] = {
      id: user.id,
      name: user.name,
      albumCount: 0,
      photoCount: 0,
      totalCount: 0,
    };
  }

  for (i = 0, c = albums.length; i < c; ++i) {
    album = albums[i];
    if (user2idx.hasOwnProperty(album.userId)) {
      album2userIdx[album.id] = user2idx[album.userId];
      resultRow = result[user2idx[album.userId]];
      ++resultRow.albumCount;
      ++resultRow.totalCount;
    }
  }

  for (i = 0, c = photos.length; i < c; ++i) {
    photo = photos[i];
    if (album2userIdx.hasOwnProperty(photo.albumId)) {
      resultRow = result[album2userIdx[photo.albumId]];
      ++resultRow.photoCount;
      ++resultRow.totalCount;
    }
  }
  return result;
}
