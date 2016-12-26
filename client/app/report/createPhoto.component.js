'use strict';

/**
 * @constructor
 */
function CreatePhotoController($scope, userService, albumService, photoService) {
  'ngInject';

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  ctrl.busy = false;
  ctrl.values = {};
  ctrl.users = null;
  ctrl.albums = null;
  ctrl.$onInit = $onInit;
  ctrl.userChange = userChange;
  ctrl.submit = submit;

  function $onInit() {
    userService.getList().then(function (users) {
      ctrl.users = users;
      return users;
    });
  }

  function userChange() {
    ctrl.values.albumId = null;
    ctrl.albums = null;
    if (!ctrl.values.userId || !$scope.form.userId.$valid) {
      return;
    }
    (function (userId) {
      albumService.getList(userId).then(function (albums) {
        ctrl.albums = +ctrl.values.userId === +userId ? albums : null;
        return albums;
      });
    }(ctrl.values.userId));
  }

  function submit() {
    if (ctrl.busy || !$scope.form.$valid) {
      return;
    }
    ctrl.busy = true;
    photoService.create(ctrl.values).then(onSave)
      .finally(function () {
        ctrl.busy = false;
      });
  }

  function onSave() {
    ctrl.values = {};
    $scope.form.$setPristine();
  }
}

const CreatePhotoComponent = {
  controller: CreatePhotoController,
  template: require('./createPhoto.component.html')
};

export default CreatePhotoComponent;
