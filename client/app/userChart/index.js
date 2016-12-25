import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routeCfg from './userChart.routes';

import Highcharts from 'highcharts';
window.Highcharts = Highcharts;

import highchartsNg from 'highcharts-ng';
import userChartComponent from './userChart.component';

export default angular.module('app.userChart', [
  uiRouter,
  highchartsNg,
])
  .config(routeCfg)
  .component('userChart', userChartComponent)
  .name;
