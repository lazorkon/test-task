'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngInfiniteScroll from 'ng-infinite-scroll';

import routeCfg from './report.routes';

import FilterFormComponent from './filter-form.component';
import UserListComponent from './userList.component';
import AlbumListComponent from './albumList.component';
import AlbumDetailComponent from './albumDetail.component';
import CreatePhotoComponent from './createPhoto.component';

export default angular.module('app.report', [
  uiRouter,
  ngInfiniteScroll,
])
  .config(routeCfg)
  .component('filterForm', FilterFormComponent)
  .component('userList', UserListComponent)
  .component('albumList', AlbumListComponent)
  .component('albumDetail', AlbumDetailComponent)
  .component('createPhoto', CreatePhotoComponent)
  .name;
