'use strict';

/**
 * @constructor
 */
function AlbumListController(filterFilter, albumService) {
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
    albumService.getList().then(data => {
      ctrl.originalList = data;
      filterList();
    });
  }

  function filterList() {
    ctrl.list = filterFilter(ctrl.originalList, {title: ctrl.filter.query});
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

const AlbumListComponent = {
  controller: AlbumListController,
  template: require('./albumList.component.html'),
};

export default AlbumListComponent;
