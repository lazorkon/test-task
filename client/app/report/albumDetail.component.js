'use strict';

// import angular from 'angular';

function AlbumDetailController(photoService, Util, filterFilter) {
  'ngInject';

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  const CHUNK_SIZE = 3;
  const ROW_LIMIT = 30;

  ctrl.originalList = [];
  ctrl.list = [];
  ctrl.filter = {};

  ctrl.$onInit = $onInit;
  ctrl.onFilterReset = onFilterReset;
  ctrl.onFilterSearch = onFilterSearch;

  ctrl.$onInit = $onInit;

  function $onInit() {
    photoService.getList().then(data => {
      ctrl.originalList = data;
      filterList();
    });
  }

  function filterList() {
    var list = filterFilter(ctrl.originalList.slice(0, CHUNK_SIZE * ROW_LIMIT), {title: ctrl.filter.query});
    ctrl.groups = Util.chunkify(list, CHUNK_SIZE);
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
  controller: AlbumDetailController,
  template: require('./albumDetail.component.html'),
};

export default AlbumDetailComponent;
