$(function () {
  $('body').append('<div id="qunit-fixture"></div>');

  module('verify fixture');

  test('should be defined on jquery object', function () {
    var el = $(document.body).find('#qunit-fixture')
    ok(el.length === 1, 'qunit fixture exists')
  })
});
