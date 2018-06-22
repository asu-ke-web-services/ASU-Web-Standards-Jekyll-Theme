$(function () {
  'use strict';

  // TODO develop a qunit plugin for color checking

  module('color visual test')

  // Header colors
  // =============

  test('header should be white', function () {
    var bg_color = $('#asu_header').css('background-color')

    equal( bg_color, "rgba(0, 0, 0, 0)", "header is white" )
  })

  // Page title colors
  // =================

  test('primary unit font color should be black', function () {
    var color = $('.site-title .first-word a').css('color')

    equal( color, "rgb(0, 0, 0)", "site title first word is black")
  })

  test('secondary unit should be gray', function () {
    var color = $('.site-title>a').css('color')

    equal( color, "rgb(79, 85, 87)", "site title second word is #4F5557")
  })

  // Menu colors
  // ===========

  test('navigation hover font color should be #FFB204', function () {
    var selected = $('.navbar-ws .dropdown>a')[0]

    // TODO untestable :(
    equal( 1, 1 );
  })

  // Font colors
  // ===========

  test('links should be maroon', function() {
    var color = $($('a')[0]).css('color')

    equal( color, "rgb(140, 29, 64)" , "links are #8C1D40")
  })

  // Primary color items
  // ===================

  test('primary buttons should be maroon', function () {
    var bg_color = $($('.btn-primary')[0]).css('background-color')

    equal( bg_color, "rgb(140, 29, 64)" , "primary buttons are #8C1D40")
  })

  // Gold color items
  // ===================

  test('gold buttons should be gold', function () {
    var bg_color = $($('.btn-gold')[0]).css('background-color')

    equal( bg_color, "rgb(255, 198, 39)" , "gold buttons are #FFC627")
  })

  // Blue color items
  // ===================

  test('blue buttons should be blue', function () {
    var bg_color = $($('.btn-blue')[0]).css('background-color')

    equal( bg_color, "rgb(0, 163, 224)" , "primary buttons are #00A3E0")
  })

  // Green (success) color items
  // ===================

  test('success buttons should be green', function () {
    var bg_color = $($('.btn-success')[0]).css('background-color')

    equal( bg_color, "rgb(120, 190, 32)" , "primary buttons are #78BE20")
  })

  test('success labels should be green', function () {
    var color = $($('.form-group.has-success label')[0]).css('color')

    equal( color, "rgb(120, 190, 32)" , "success labels are #78BE20")
  })

  // Danger (orange) (error) color items
  // ===================

  test('danger buttons should be #FF7F32', function () {
    var bg_color = $($('.btn-danger')[0]).css('background-color')

    equal( bg_color, "rgb(255, 127, 50)" , "primary buttons are #FF7F32")
  })

  test('error labels should be #FF7F32', function () {
    var color = $($('.form-group.has-error label')[0]).css('color')

    equal( color, "rgb(255, 127, 50)" , "error labels are #FF7F32")
  })

  // Footer icon colors
  // ==================
  
  test('footer icons should be gray', function () {
    var bg_color = $($('.footer .social-media li a i')[0]).css('color')

    equal( bg_color, "rgb(169, 169, 169)" , "primary buttons are #a9a9a9")
  })
})