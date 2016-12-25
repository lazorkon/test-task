'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('dashboardApp.util', [])
  .factory('Util', UtilService)
  .name;
