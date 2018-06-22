$(function () {
  'use strict';

  module('wait for plugin')

  test('should be defined on jquery object', function () {
    ok($(document.body).waitFor, 'wait for method is defined')
  })

  module('waitFor', {
    setup: function () {
      // Run all tests in noConflict mode --it's the only way to ensure
      // that the plugin works in noConflict mode
      $.fn.wsWaitFor = $.fn.waitFor.noConflict()
    },
    teardown: function () {
      $.fn.waitFor = $.fn.wsWaitFor
      delete $.fn.wsWaitFor
    }
  })

  test('should provide no conflict', function () {
    strictEqual($.fn.waitFor, undefined, 'waitfor was set back to undefined (org value)')
  })

  test('should return jquery collection containing the element', function () {
    var $el = $('<div/>')
    var $waitFor = $el.wsWaitFor()
    ok($waitFor instanceof $, 'returns jquery collection')
    strictEqual($waitFor[0], $el[0], 'collection contains element')
  })

  test('should run immediately', function () {
    var hasRun = false
    var $el = $('<div/>')
    $el.wsWaitFor(':not(.swimming-dog)', function () {
      hasRun = true
    })
    ok(hasRun === true, 'waitfor has run')
  })

  test('should run after 300ms', function () {
    var hasRun = false
    var $el = $('<div/>')
    $el.wsWaitFor('.swimming-dog', function () {
      hasRun = true
    })
    $el.addClass('swimming-dog');

    stop()
    setTimeout(function () {
      ok(hasRun === true, 'waitfor has run')
      start()
    }, 300);
  })
})
