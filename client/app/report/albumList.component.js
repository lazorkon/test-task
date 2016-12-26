'use strict';

/**
 * @constructor
 */
function AlbumListController(filterFilter, albumService) {
  'ngInject';

  const preloadPortion = 5;

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  ctrl.originalList = [];
  ctrl.list = [];
  ctrl.filter = {};
  ctrl.infiniteScrollDisabled = false;
  ctrl.listLimit = preloadPortion;

  ctrl.$onInit = $onInit;
  ctrl.loadMore = loadMore;
  ctrl.onFilterReset = onFilterReset;
  ctrl.onFilterSearch = onFilterSearch;


  function $onInit() {
    albumService.getList(ctrl.userId, {withPhotos: true}).then(data => {
      ctrl.originalList = data;
      filterList();
    });
  }

  function filterList() {
    ctrl.infiniteScrollDisabled = false;
    ctrl.list = ctrl.filter.query
      ? filterFilter(ctrl.originalList, {title: ctrl.filter.query})
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

const AlbumListComponent = {
  bindings: {
    userId: '<'
  },
  controller: AlbumListController,
  template: require('./albumList.component.html'),
};

export default AlbumListComponent;
