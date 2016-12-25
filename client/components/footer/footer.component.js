import angular from 'angular';

export class FooterComponent {
  constructor() {
    this.year = new Date().getFullYear();
  }
}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
