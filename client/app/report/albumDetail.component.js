'use strict';

// import angular from 'angular';

function AlbumDetailController(photoService, Util, filterFilter) {
  'ngInject';

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  const chunkSize = 3;
  const preloadPortion = 2;

  ctrl.originalList = [];
  ctrl.groups = [];
  ctrl.filter = {};
  ctrl.infiniteScrollDisabled = false;
  ctrl.listLimit = preloadPortion;

  ctrl.$onInit = $onInit;
  ctrl.loadMore = loadMore;
  ctrl.onFilterReset = onFilterReset;
  ctrl.onFilterSearch = onFilterSearch;

  ctrl.$onInit = $onInit;

  function $onInit() {
    photoService.getList(ctrl.albumId).then(data => {
      ctrl.originalList = data;
      filterList();
    });
  }

  function filterList() {
    ctrl.infiniteScrollDisabled = false;
    var list = ctrl.filter.query
      ? filterFilter(ctrl.originalList, {title: ctrl.filter.query})
      : ctrl.originalList.slice();
    ctrl.groups = Util.chunkify(list, chunkSize);
  }

  function loadMore() {
    if (ctrl.listLimit < ctrl.groups.length) {
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

const AlbumDetailComponent = {
  bindings: {
    albumId: '<'
  },
  controller: AlbumDetailController,
  template: require('./albumDetail.component.html'),
};

export default AlbumDetailComponent;
