'use strict';

// import angular from 'angular';

function UserListController(userService, filterFilter) {
  'ngInject';

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  ctrl.originalList = [];
  ctrl.list = [];
  ctrl.filter = {};

  ctrl.$onInit = $onInit;
  ctrl.onFilterReset = onFilterReset;
  ctrl.onFilterSearch = onFilterSearch;


  function $onInit() {
    userService.getList().then(data => {
      ctrl.originalList = data;
      filterList();
    });
  }

  function filterList() {
    ctrl.list = filterFilter(ctrl.originalList, {name: ctrl.filter.query});
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

export default UserListComponent;
