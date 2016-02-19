/*
 * Throttle the window resize event for performance and smoothness.
 */
+function ($) {
  'use strict';

  // SMARTRESIZE PUBLIC CLASS DEFINITION
  // ===================================

  var Smartresize = function (element, options) {
    this.element = element
    this.options = options
    this._bounce = []
  }

  Smartresize.VERSION = '0.0.2'

  Smartresize.prototype = {}

  Smartresize.prototype.constructor = Smartresize

  /**
   * Debounce function
   * @author John Hann
   * @source http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
   */
  Smartresize.prototype.debounce = function ( func, threshold, execAsap ) {
    var timeout
    var outer = function () {
      var obj = this
      var args = arguments

      function delayed () {
        if ( ! execAsap ) {
          func.apply ( obj, args )
        }

        timeout = null
      }

      if ( timeout )
        clearTimeout( timeout )
      else if ( execAsap )
        func.apply( obj, args )

      timeout = setTimeout( delayed, threshold || 500 )
    }

    this._bounce.push({
      bounce : outer,
      callback : func
    })

    return outer
  }

  /**
   * Unbinds specific handlers or if handler is null or undefined, will
   * unbind ALL handlers
   *
   * @param  {function} handler the callback
   * @return {$}         returns the element for chainability
   */
  Smartresize.prototype.unbind = function (handler) {
    for (var i = 0; i < this._bounce.length; i++ ) {
      if (handler == null || handler == this._bounce[i].callback) {
        $(this.element).unbind( 'resize', this._bounce[i].bounce )
      }
    }
    return $(this.element)
  }

  // SMARTRESIZE POPOVER PLUGIN DEFINITION
  // ==================================

  function Plugin(option, handler) {
    var $this    = $(this)
    var data     = $this.data('bs.smartresize')
    var options  = typeof option == 'object' && option
    var selector = options && options.selector

    if (! data && option == 'destroy')
        return
    if (selector) {
      if (! data)
        $this.data('bs.smartresize', (data = {}))
      if (! data[selector])
        data[selector] = new Smartresize(this, options)
    } else {
      if (! data)
        $this.data('bs.smartresize', (data = new Smartresize(this, options)))
    }

    if (typeof option == 'string')
      data[option](handler)
    else {
      return option ? this.bind( 'resize', data.debounce( option ) ) : this.trigger( 'smartresize' )
    }
  }

  var old = $.fn.smartresize

  $.fn.smartresize             = Plugin
  $.fn.smartresize.Constructor = Smartresize

  // SMARTRESIZE POPOVER NO CONFLICT
  // ============================

  $.fn.smartresize.noConflict = function () {
    $.fn.smartresize = old
    return this
  }

} (jQuery)
