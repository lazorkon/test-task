'use strict';

import angular from 'angular';

function FilterFormController($scope) {
  'ngInject';

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  ctrl.data = getInitialData();
  ctrl.search = search;
  ctrl.reset = reset;
  ctrl.change = change;

  function change(e) {
    if ($scope.form.$valid || !ctrl.data.query) {
      search(e);
    }
  }

  function search() {
    ctrl.onSearch({filter: angular.extend({}, ctrl.data)});
  }

  function reset() {
    ctrl.data = getInitialData();
    ctrl.onReset({filter: angular.extend({}, ctrl.data)});
  }

  function getInitialData() {
    return {
      query: ''
    };
  }
}

const FilterFormComponent = {
  bindings: {
    onSearch: '&',
    onReset: '&',
  },
  controller: FilterFormController,
  template: require('./filter-form.component.html')
};

export default FilterFormComponent;
