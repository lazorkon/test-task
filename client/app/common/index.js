'use strict';

import angular from 'angular';
import ApiError from './api-error.service';
import UserService from './user.service';
import AlbumService from './album.service';
import PhotoService from './photo.service';
import UserStatsService from './userStats.service';

export default angular.module('app.common', [])
  .service('apiError', ApiError)
  .service('userService', UserService)
  .service('albumService', AlbumService)
  .service('photoService', PhotoService)
  .service('userStatsService', UserStatsService)
  .name;
