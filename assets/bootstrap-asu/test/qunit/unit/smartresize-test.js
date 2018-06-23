$(function () {
  'use strict';

  module('smartresize plugin')

  test('should be defined on jquery object', function () {
    ok($(document.body).smartresize, 'smartresize method is defined')
  })

  module('smartresize', {
    setup: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.wsSmartresize = $.fn.smartresize.noConflict()
    },
    teardown: function () {
      $.fn.smartresize = $.fn.wsSmartresize
      delete $.fn.wsSmartresize
    }
  })

  test('should provide no conflict', function () {
    strictEqual($.fn.smartresize, undefined, 'popover was set back to undefined (org value)')
  });

  test('should return jquery collection containing the element', function () {
    var $el = $('<div/>')
    var $smartresize = $el.wsSmartresize()
    ok($smartresize instanceof $, 'returns jquery collection')
    strictEqual($smartresize[0], $el[0], 'collection contains element')
  })

  // TODO test unbind

  var callback = function () {
    $(this).addClass('wow')
    var times_called = $(this).data('called')

    if ( typeof times_called !== "number" ) {
      times_called = 1
    } else {
      times_called++
    }

    $(this).data('called', times_called)
  }

  var $doge = $('<div/>')

  module('smartresize attached to window', {
    setup: function () {
      $doge.smartresize( callback )
    },
    teardown: function () {
      $doge.smartresize( 'unbind', callback )
    }
  })

  test('should run once when resize is called', function () {
    $doge.resize()

    stop()

    setTimeout( function () {
      var is_wow = $doge.is('.wow')

      ok(is_wow, 'good doge')
      equal($doge.data('called'), 1, 'called once')

      // reset
      $doge.removeClass('wow')
      $doge.data('called', 0)
      start()
    }, 600)
  })

  test('should run once when resize is called many times', function () {
    for ( var i = 0; i < 10; i++) {
      setTimeout(function () {
        $doge.resize()    
      }, i )
    }

    stop()

    setTimeout( function () {
      var is_wow = $doge.is('.wow')

      ok(is_wow, 'good doge')
      equal($doge.data('called'), 1, 'called once')

      // reset
      $doge.removeClass('wow')
      $doge.data('called', 0)
      start()
    }, 700)
  })

  // TODO test different thresholds
  // TODO test execAsap
})