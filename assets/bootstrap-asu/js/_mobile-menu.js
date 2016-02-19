+function ($) {
  'use strict';

  // TODO refactor this constant
  var mobileWidth = 991

  var desktopElements = [
    '.navbar-ws .navbar-toggle'
  ].join( ',' )
  var mobileElements = [
    '.asu_mobile_nav_item',
    '#main-search',
    '#asu_mobile_menu_button',
    '#asu_mobile_search_button'
  ].join( ',' )


  /**
   * Create nagivation, search, and icons
   * if they do not already exist
   *
   * Don't use #main-search id for anything else!
   */
  function generateMarkup() {
    var $blackout = $('<div class="blackout"></div>').appendTo('body').hide();

    var showBlackout = function () {
      if ( ( window.matchMedia &&
             window.matchMedia('(max-width: ' + mobileWidth + 'px)').matches ) ||
          ( typeof window.matchMedia === 'undefined' &&
            $( window ).width() < mobileWidth ) ) {
        $blackout.show();
      }
    }

    var hideBlackout = function () {
      $blackout.hide();
    }

    $( window ).smartresize( function () {
      if ( ( window.matchMedia && window.matchMedia('(min-width: ' + ( mobileWidth + 1 ) + 'px)').matches ) ||
          ( typeof window.matchMedia === 'undefined' && $( window ).width() > mobileWidth ) ) {
        hideBlackout();
      }
    } )

    var mainSearch = document.getElementById( 'main-search' )
    if ( mainSearch === null ) {
      // ==========
      // Navigation
      // ==========
      var $menuHiddenButton = $( '.navbar-ws .navbar-toggle' )
      $menuHiddenButton.hide()

      // add asu menu items
      $( '#asu_universal_nav>ul>li' ).each( function ( i, e ) {
        var $clone = $( e ).clone().addClass( 'asu_mobile_nav_item' )

        // Transform nested ul li's into dropdowns
        if ( $clone.find( 'ul' ).length > 0 ) {
          $clone.find( '>a' )
            .addClass( 'dropdown-toggle' )
            .attr( 'data-toggle', 'dropdown' )
            .append( '&nbsp;<span class="caret"></span>' )

          $clone.find( 'ul' )
            .addClass( 'dropdown-menu' )
            .attr( 'role', 'menu' )
            .find( 'li' )
              .addClass( 'external-link' )
        } else {
          // Add extrenal link
          $clone.addClass( 'external-link' )
        }

        $clone.appendTo( '.navbar-ws .nav.navbar-nav' )
      } )


      // ======
      // Search
      // ======

      // Prepended to '#block-asu-brand-asu-brand-header .content'
      // Will get an '.opened' class added to it when opened
      var searchMarkUp = ''

      searchMarkUp += '<div id="main-search" class="main-search">'
      searchMarkUp += '  <form target="_top" action="https://search.asu.edu/search" method="get" name="gs">'
      searchMarkUp += '    <input class="asu_search_box" name="q" id="asu_search_box" placeholder="Search" autocomplete="off" type="text">'
      searchMarkUp += '    <input class="asu_search_button" type="submit" value="Search">'
      searchMarkUp += '    <input name="site" value="default_collection" type="hidden">'
      searchMarkUp += '    <input name="sort" value="date:D:L:d1" type="hidden">'
      searchMarkUp += '    <input name="output" value="xml_no_dtd" type="hidden">'
      searchMarkUp += '    <input name="ie" value="UTF-8" type="hidden">'
      searchMarkUp += '    <input name="oe" value="UTF-8" type="hidden">'
      searchMarkUp += '    <input name="client" value="asu_frontend" type="hidden">'
      searchMarkUp += '    <input name="proxystylesheet" value="asu_frontend" type="hidden">'
      searchMarkUp += '  </form>'
      searchMarkUp += '</div>'

      var $search = $( searchMarkUp ).prependTo( '#block-asu-brand-asu-brand-header .content' )

      // =====
      // Icons
      // =====

      // Appended to .asu_mobile_hdr_wrapper
      var mobileMenuMarkup = ''

      mobileMenuMarkup += '<div class="fa fa-navicon" id="asu_mobile_menu_button">'
      mobileMenuMarkup += '  <a href="#">Menu</a>'
      mobileMenuMarkup += '</div>'

      var searchMenuMarkup = '<div class="fa fa-search" id="asu_mobile_search_button"></div>'

      // TODO We should be appending to .asu_mobile_hdr_wrapper but
      // our markup does not have a .asu_mobile_hdr_wrapper nested in
      // the #asu_mobile_hdr like webspark does.
      // For now, we will append to #asu_mobile_hdr, but we should look into
      // this again in the future.
      var $mobileMenuButton = $( mobileMenuMarkup ).appendTo( '#asu_mobile_hdr' )
      var $searchButton = $( searchMenuMarkup ).appendTo( '#asu_mobile_hdr' )

      // ===========
      // Icon Events
      // ===========

      $searchButton.click( function ( e ) {
        e.preventDefault();

        if ( $( this ).is( '.clicked' ) ) {
          // Close the search
          $( this ).removeClass( 'clicked' )

          $search.removeClass( 'opened' )
        } else {
          // Open (and focus on) the search
          $( this ).addClass( 'clicked' )
          $search.addClass( 'opened' )
          $search.find('input[type=text]').focus()
        }
      } )

      $blackout.click(function () {
        // Close the menu
        $( '.navbar-ws .navbar-collapse' ).waitFor( ':not(.in)', function () {
          $mobileMenuButton.removeClass( 'fa-close' )
          $mobileMenuButton.addClass( 'fa-navicon' )
        } )

        $menuHiddenButton.click()
        hideBlackout();
      } );

      $mobileMenuButton.click( function ( e ) {
        e.preventDefault();
        var $self = $( this )
        if ( $self.is( '.fa-close' ) ) {
          // Close the menu
          $( '.navbar-ws .navbar-collapse' ).waitFor( ':not(.in)', function () {
            $self.removeClass( 'fa-close' )
            $self.addClass( 'fa-navicon' )
          } )

          $menuHiddenButton.click()
          hideBlackout();
        } else {
          // Open the menu
          $( '.navbar-ws .navbar-collapse' ).waitFor( '.in', function () {
            $self.addClass( 'fa-close' )
            $self.removeClass( 'fa-navicon' )
          } )

          $menuHiddenButton.click()
          showBlackout();
        }
      } )
    }
  }

  /**
   * Hide and show elements depending on viewport size.
   */
  function collapseHeader () {
    if ( ( window.matchMedia &&
             window.matchMedia('(min-width: ' + (mobileWidth + 1) + 'px)').matches ) ||
          ( typeof window.matchMedia === 'undefined' &&
            $( window ).width() > mobileWidth ) ) {
      $( desktopElements ).show()
      $( mobileElements ).hide()
    } else {
      $( desktopElements ).hide()
      $( mobileElements ).show()
    }
  }

  /**
   * Bootstrap the markup.
   */
  $(document).ready(function () {
    // Re-check viewport size on resize
    $(window).resize( collapseHeader )

    // Run collapse header right off the bat
    generateMarkup()
    collapseHeader()
  } );
} (jQuery);
