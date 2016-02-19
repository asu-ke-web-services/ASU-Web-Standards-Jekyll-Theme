+function ($) {
  'use strict';

  // TODO refactor this constant
  // Nav goes to mobile for medium size devices
  var mobileWidth = 991;

  /*
   * The hover functions will trigger even on mobile devices. When
   * touch event happens on a mobile device, the onhoverstart is called
   * and then the click event is called.  Since the hover adds the
   * open class to the element, we need to add a quick dying variable
   * to let the click event know whether the element was just opened or
   * not.
   *
   * Basically:
   * - if clicked and not open, open
   * - if clicked and open, close
   * - if hovered over, open (no matter the previous state)
   * - if hover left, close (no matter the previous state)
   */
  $.setupNavigation = function () {
    $('.navbar-ws ul.nav>li.dropdown').click(function (e) {
      e.stopPropagation()

      var self = $( this )
      self.find( 'a' ).blur()

      if ( self.hasClass( 'open' ) && ! self.data( 'sos-click' ) ) {
        self.removeClass( 'open' )
      } else {
        // No other li can be open
        $('.navbar-ws ul.nav>li.dropdown').each(function (i, e) {
          $(e).removeClass( 'open' )
        })

        self.addClass( 'open' )
      }
    }).hover( function () {
      // Don't worry about mobile devices
      if ( ( window.matchMedia &&
             window.matchMedia('(max-width: ' + mobileWidth + 'px)').matches ) ||
          ( typeof window.matchMedia === 'undefined' &&
            $( window ).width() < mobileWidth ) ) {
        return
      }

      var self = $( this )
      self.addClass( 'open' )
      self.data( 'sos-click', true )

      setTimeout( function () {
        self.data( 'sos-click', false )
      }, 5 )
    }, function (e) {
      // Don't worry about mobile devices
      if ( ( window.matchMedia &&
             window.matchMedia('(max-width: ' + mobileWidth + 'px)').matches ) ||
          ( typeof window.matchMedia === 'undefined' &&
            $( window ).width() < mobileWidth ) ) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      $( this ).removeClass( 'open' )
    })

    $('ul.dropdown-menu').click(function (e) {
      if ( ( $( e.target ).is( ':not(a)' ) && $( e.target ).is( ':not(li)' ) ) || $( e.target ).is( '.dropdown-title') ) {
        e.preventDefault();
        e.stopPropagation();
      }

      if ( $( e.target ).is( '.dropdown-title' ) ) {
        if ( ( window.matchMedia &&
               window.matchMedia('(max-width: ' + mobileWidth + 'px)').matches ) ||
            ( typeof window.matchMedia === 'undefined' &&
              $( window ).width() < mobileWidth ) ) {
          e.preventDefault()
          e.stopPropagation()

          $( e.target ).closest('.column').toggleClass('active');
        }
      }
    })
  }

  $(document).ready(function () {
    $.setupNavigation();
  })

}( jQuery );
