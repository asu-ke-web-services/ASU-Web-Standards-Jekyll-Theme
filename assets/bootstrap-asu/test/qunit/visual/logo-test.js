$(function () {
  'use strict';

  module('logo test')

  test('logo should be a specific offset from the top and left', function () {
    var img = $('#asu_logo').find('a');

    equal( img.offset().top, 12 );
    equal( img.offset().left, 12 );
  })
})