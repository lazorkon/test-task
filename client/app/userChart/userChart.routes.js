'use strict';

function routeCfg($stateProvider) {
  'ngInject';

  $stateProvider.state('userChart', {
    url: '/users-chart',
    component: 'userChart',
    data: {
      title: 'Users Chart'
    }
  });
}

export default routeCfg;
