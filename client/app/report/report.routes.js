'use strict';

function routeCfg($stateProvider) {
  'ngInject';

  $stateProvider.state('users', {
    url: '/',
    component: 'userList',
    data: {
      title: 'Users'
    }
  });

  $stateProvider.state('albums', {
    url: '/user-albums/{userId}',
    component: 'albumList',
    data: {
      title: 'User Albums'
    }
  });

  $stateProvider.state('photos', {
    url: '/album-photos/{albumId}',
    component: 'albumDetail',
    data: {
      title: 'Album Photos'
    }
  });

  $stateProvider.state('createPhoto', {
    url: '/create-photo',
    component: 'createPhoto',
    data: {
      title: 'Create Photo'
    }
  });
}

export default routeCfg;
