'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loadingBar from 'angular-loading-bar';
import toastr from 'angular-toastr';
import ngInfiniteScroll from 'ng-infinite-scroll';

import {
  configureRoutes, configureApp, runApp
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import common from './common';

import report from './report';
import userChart from './userChart';

import './app.scss';

angular.module('app', [
  uiRouter,
  loadingBar,
  toastr,
  ngInfiniteScroll,

  navbar,
  footer,
  common,
  constants,
  util,

  report,
  userChart
])
  .config(configureRoutes)
  .config(configureApp)
  .run(runApp);

angular.module(ngInfiniteScroll).value('THROTTLE_MILLISECONDS', 250);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['app'], {
      strictDi: true
    });
  });
