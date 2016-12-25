'use strict';

function UserChartController(userStatsService) {
  'ngInject';

  /*eslint consistent-this: ["error", "ctrl"]*/
  const ctrl = this;

  const albumIdx = 0;
  const photoIdx = 1;
  const totalIdx = 2;

  ctrl.originalList = null;
  ctrl.chartConfig = null;
  ctrl.filter = {
    user: {}
  };

  ctrl.$onInit = $onInit;
  ctrl.filterChange = filterChange;


  function $onInit() {
    ctrl.chartConfig = getBaseChartConfig();

    userStatsService.getCounts().then(data => {
      ctrl.originalList = data;
      ctrl.filter.user = ctrl.originalList.reduce((obj, user) => {
        obj[user.id] = true;
        return obj;
      }, {});
      buildChartConfig(ctrl.originalList);
    });
  }

  function filterChange() {
    buildChartConfig(ctrl.originalList.filter(usr => ctrl.filter.user[usr.id]));
  }

  function buildChartConfig(list) {
    list = list || ctrl.originalList;
    var series = [];
    var categories = [];
    series[albumIdx] = {
      name: 'Albums',
      color: '#7cb5ec',
      data: []
    };
    series[photoIdx] = {
      name: 'Photos',
      color: '#90ed7d',
      data: []
    };
    series[totalIdx] = {
      name: 'Albums+Photos',
      color: '#434348',
      data: []
    };
    list.forEach(function (user) {
      categories.push(user.name);
      series[albumIdx].data.push(user.albumCount);
      series[photoIdx].data.push(user.photoCount);
      series[totalIdx].data.push(user.totalCount);
    });

    ctrl.chartConfig.series = series;
    ctrl.chartConfig.xAxis.categories = categories;
    ctrl.chartConfig.size.height = categories.length * 40 + 135;  // 40px per user
  }

  function getBaseChartConfig() {
    var config = {
      options: {
        // main chart config, values will be overriden by values specified below.
        chart: {
          type: 'bar'
        }
      },

      // The below properties are watched separately for changes.
      title: {
        text: 'Count of Albums and Photos per User'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        },
      },
      credits: {
        enabled: false
      },
      series: [],
      loading: false,
      xAxis: {
        categories: [],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count',
          align: 'high'
        }
      },
      size: {
        height: 600,
      },
      // setup some logic for the chart
      // func: function (chart) {}
    };

    return config;
  }
}

const UserChartComponent = {
  bindings: {},
  controller: UserChartController,
  template: require('./userChart.component.html'),
};

export default UserChartComponent;
