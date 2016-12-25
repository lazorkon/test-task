'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  constructor() {
    this.menu = [{
      title: 'Report',
      state: 'users'
    }, {
      title: 'Chart',
      state: 'userChart'
    }, {
      title: 'Create Photo',
      state: 'createPhoto'
    }];

    this.isCollapsed = true;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
