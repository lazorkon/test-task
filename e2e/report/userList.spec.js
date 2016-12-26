'use strict';

var config = browser.params;

describe('User List Page', function() {
  var page;

  beforeEach(function() {
    let promise = browser.get(config.baseUrl + '/');
    page = require('./userList.po');
    return promise;
  });

  it('should include filter form', function() {
    expect(page.header.getText()).to.eventually.equal('User List');
    expect(page.filterForm).to.eventually.be.ok();
    expect(page.list.childNodes.length).to.eventually.be.above(1);
  });
});
