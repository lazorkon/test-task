'use strict';

var UserListPage = function() {
  this.header = this.heroEl.element(by.css('h1'));
  this.filterForm = element(by.css('user-list filter-form'));
  this.list = this.heroEl.element(by.css('user-list .list-group'));
};

module.exports = new UserListPage();
