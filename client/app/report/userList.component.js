'use strict';

// import angular from 'angular';

function UserListController(userService, filterFilter) {
  'ngInject';

  const preloadPortion = 5;

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  ctrl.originalList = [];
  ctrl.list = [];
  ctrl.filter = {};
  ctrl.infiniteScrollDisabled = false;
  ctrl.listLimit = 10;

  ctrl.$onInit = $onInit;
  ctrl.loadMore = loadMore;
  ctrl.onFilterReset = onFilterReset;
  ctrl.onFilterSearch = onFilterSearch;


  function $onInit() {
    userService.getList().then(data => {
      ctrl.originalList = data;
      filterList();
    });
  }

  function filterList() {
    ctrl.infiniteScrollDisabled = false;
    ctrl.list = ctrl.filter.query
      ? filterFilter(ctrl.originalList, {name: ctrl.filter.query})
      : ctrl.originalList.slice();
  }

  function loadMore() {
    if (ctrl.listLimit < ctrl.list.length) {
      ctrl.listLimit += preloadPortion;
    } else {
      ctrl.infiniteScrollDisabled = true;
    }
  }

  function onFilterReset() {
    ctrl.filter = {};
    filterList();
  }

  function onFilterSearch(filter) {
    ctrl.filter = filter;
    filterList();
  }
}

const UserListComponent = {
  controller: UserListController,
  template: require('./userList.component.html'),
};

export {
  UserListController,
  UserListComponent as default
};
