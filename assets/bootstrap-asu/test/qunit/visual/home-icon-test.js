$(function () {
  'use strict';

  module('home icon test', {
    beforeEach : function () {
      var homeIconLi     = $('.navbar-ws ul.nav li:first').addClass( 'notransition' );
      var a              = homeIconLi.find('a').addClass( 'notransition' );
      var icon           = homeIconLi.find('span.fa').addClass( 'notransition' );
    }
  })

  // Icon Font Properties
  // ====================

  test('home icon normal state', function () {
    var homeIconLi     = $('.navbar-ws ul.nav li:first');
    var a              = homeIconLi.find('a');
    var icon           = homeIconLi.find('span.fa');

    var computedStyles = getComputedStyle(icon[0]);

    equal( computedStyles['font-family'], 'FontAwesome', 'The icon uses font awesome' )
    equal( computedStyles['font-size'], '15px', 'The icon should be 15px' )
    equal( computedStyles['color'], 'rgb(237, 237, 237)', 'The icon should be a specific color on mobile' )
    equal( computedStyles['font-style'], 'normal', 'The icon should be normal' )
    equal( computedStyles['font-weight'], 'normal', 'The icon should be normal' )
    equal( computedStyles['line-height'], '15px', 'The icon should be line height = 1' )
  })

  test('home icon active state', function () {
    var homeIconLi     = $('.navbar-ws ul.nav li:eq(1)');
    var icon           = homeIconLi.find('span.fa');
    var computedStyles = getComputedStyle(icon[0]);

    equal( computedStyles['font-family'], 'FontAwesome', 'The icon uses font awesome' )
    equal( computedStyles['font-size'], '15px', 'The icon should be 15px' )
    // Old test is for desktop
    equal( computedStyles['color'], 'rgb(255, 178, 4)', 'The icon should be yellow/gold' )
    //equal( computedStyles['color'], 'rgb(42, 42, 42)', 'The icon should be rgb(42, 42, 42)' )
    equal( computedStyles['font-style'], 'normal', 'The icon should be normal' )
    equal( computedStyles['font-weight'], 'normal', 'The icon should be normal' )
    equal( computedStyles['line-height'], '15px', 'The icon should be line height = 1' )
  })

  test('home icon hover state', function () {
    var homeIconLi     = $('.navbar-ws ul.nav li:eq(2)');
    var icon           = homeIconLi.find('span.fa');
    var computedStyles = getComputedStyle(icon[0]);

    equal( computedStyles['font-family'], 'FontAwesome', 'The icon uses font awesome' )
    equal( computedStyles['font-size'], '15px', 'The icon should be 15px' )
    // Old test is for desktop
    equal( computedStyles['color'], 'rgb(255, 179, 16)', 'The icon should be #ffb310' )
    //equal( computedStyles['color'], 'rgb(42, 42, 42)', 'The icon should be rgb(42, 42, 42)' )
    equal( computedStyles['font-style'], 'normal', 'The icon should be normal' )
    equal( computedStyles['font-weight'], 'normal', 'The icon should be normal' )
    equal( computedStyles['line-height'], '15px', 'The icon should be line height = 1' )
  })

  test('home icon should have specific padding', function () {
    var homeIconLi     = $('.navbar-ws ul.nav li:first');
    var a              = homeIconLi.find('a');
    var computedStyles = getComputedStyle(a[0]);

    /// The top and bottom padding is not as important as the left right padding.
    //equal( computedStyles['padding-top'], '21px', 'The icon should have 21px top' )
    equal( computedStyles['padding-left'], '15px', 'The icon should have 15px left' )
  })
})
