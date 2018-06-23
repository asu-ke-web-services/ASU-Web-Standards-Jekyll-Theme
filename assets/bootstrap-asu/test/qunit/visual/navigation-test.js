$(function () {
  'use strict';

  module('navigation test')

  // Navigation is visible
  // =====================

  test('navigation should be visible if desktop', function () {
    if (window.matchMedia('(min-width: 992px)').matches) {
      var is_visible = $('.navbar.navbar-ws .navbar-collapse').is(':visible')
      equal( is_visible, true, 'navigation is visible' )
    }

    equal( true, true, 'an assertion needs to run no matter what' )
  })

  test('navigation should NOT be visible if mobile', function () {
    if (window.matchMedia('(max-width: 992px)').matches) {
      var is_visible = $('.navbar.navbar-ws .navbar-collapse').is(':visible')
      equal( is_visible, false, 'navigation is NOT visible' )
    }

    equal( true, true, 'an assertion needs to run no matter what' )
  })
 })
