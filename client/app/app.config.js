'use strict';

import angular from 'angular';

function configureRoutes($urlRouterProvider, $locationProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}

function configureApp(toastrConfig) {
  'ngInject';
  angular.extend(toastrConfig, {
    closeButton: true,
    tapToDismiss: true,
    timeOut: 5000
  });
}

function runApp($rootScope, $state) {
  'ngInject';
  $rootScope.$state = $state;
}

export { configureRoutes, configureApp, runApp };
