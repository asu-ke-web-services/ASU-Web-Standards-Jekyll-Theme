$(function () {
  'use strict';

  module('check that setup navigation is defined');

  test('setupNavigation should exist', function () {
    ok($.setupNavigation, 'navigation should exist');
  })

  module('nav click and hover', {
    setup: function () {
      // Create a menu
      var html = [
        '<!-- Global Navigation -->',
        '<nav class="navbar navbar-ws" role="navigation">',
        '  <div class="container">',
        '    <div class="navbar-header">',
        '      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#ws-navbar-collapse-1">',
        '      <span class="sr-only">Toggle navigation</span>',
        '      <span class="icon-bar"></span>',
        '      <span class="icon-bar"></span>',
        '      <span class="icon-bar"></span>',
        '      </button>',
        '      <a class="navbar-brand" href="https://schoolofsustainability.asu.edu">School of Sustainability</a>',
        '    </div>',
        '    <div class="collapse navbar-collapse">',
        '      <ul id="menu-web-standards-main-menu" class="nav navbar-nav">',
        '        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-524 mega-menu dropdown" >',
        '          <a title="Degrees &amp; Programs" href="#" data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true" id="nav-item_degree-programs">Degrees &#038; Programs <span class="caret"></span></a>',
        '          <ul role="menu" class=" dropdown-menu">',
        '            <li class="li-row-container">',
        '              <div class="row">',
        '                <div class="column col-md-12 vertical-border-right">',
        '                  <ul>',
        '                    <li class="dropdown-title" >Undergraduate Degrees</li>',
        '                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1524" ><a title="Choosing a Sustainability Undergraduate Degree" href="https://schoolofsustainability.asu.edu/degrees/undergraduate/" id="nav-item_choosing-a-degree-2_under_529">Choosing a Sustainability Undergraduate Degree</a></li>',
        '                  </ul>',
        '                </div>',
        '              </div>',
        '            </li>',
        '          </ul>',
        '        </li>',
        '        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-524 mega-menu dropdown" >',
        '          <a title="Degrees &amp; Programs" href="#" data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true" id="nav-item_degree-programs2">Degrees &#038; Programs 2<span class="caret"></span></a>',
        '          <ul role="menu" class=" dropdown-menu">',
        '            <li class="li-row-container">',
        '              <div class="row">',
        '                <div class="column col-md-12 vertical-border-right">',
        '                  <ul>',
        '                    <li  id="menu-item-529" class="dropdown-title" >Undergraduate Degrees</li>',
        '                    <li  id="menu-item-1524" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1524" ><a title="Choosing a Sustainability Undergraduate Degree" href="https://schoolofsustainability.asu.edu/degrees/undergraduate/" id="nav-item_choosing-a-degree-2_under_529">Choosing a Sustainability Undergraduate Degree</a></li>',
        '                  </ul>',
        '                </div>',
        '              </div>',
        '            </li>',
        '          </ul>',
        '        </li>',
        '      </ul>',
        '    </div>',
        '  </div>',
        '  <!-- /.navbar-collapse -->',
        '</nav>',
        '<!-- End Navigation -->'
      ].join('');

      $('body').append(html);

      // Run the setup
      $.setupNavigation();
    },
    teardown: function () {
      // Remove menu
      $('.navbar.navbar-ws').remove();
    }
  });
  
  test('the menu should exist with two dropdowns', function () {
    var nav = $('.navbar.navbar-ws');
    ok(nav.length == 1);

    var dropdowns = nav.find('.mega-menu.dropdown');
    ok(dropdowns.length == 2);
  })

  // Test that clicking will add the open class
  // and clicking again removes the open class
  test('clicking should open and close the nav', function () {
    $('#nav-item_degree-programs').click();
    stop();

    // wait 400 ms for the menu to expand
    setTimeout(function () {
      var dropdown = $('#nav-item_degree-programs').parent();
      ok(dropdown.is('.open'), 'dropdown is open');

      // Now reclose the menu
      $('#nav-item_degree-programs').click();

      setTimeout(function () {
        ok(dropdown.is(':not(.open)'), 'dropdown is closed');

        start();
      }, 400);
    }, 400);
    
  })

  // Test that clicking on one top level item,
  // then clicking on another top level item, 
  // closes all other top level items.
  test('only one menu can be expanded at a time', function () {
    $('#nav-item_degree-programs').click();
    stop();

    // wait 400 ms for the menu to expand
    setTimeout(function () {
      $('#nav-item_degree-programs2').click();
      
      // wait 400 ms for the menu to expand
      setTimeout(function () {
        var dropdown  = $('#nav-item_degree-programs').parent();
        var dropdown2 = $('#nav-item_degree-programs2').parent();
        ok(dropdown.is(':not(.open)'), 'dropdown is closed');
        ok(dropdown2.is('.open'), 'dropdown is open');
        start();
      }, 400);
    }, 400);
  })
  
  // Test that hovering will NOT add the open class
  // on mobile devices.
  test('hovering should not open on mobile', function () {
    // TODO only run this test if mobile
    $('#nav-item_degree-programs').hover();
    stop();

    // wait 400 ms for the menu to expand
    setTimeout(function () {
      var dropdown = $('#nav-item_degree-programs').parent();
      ok(dropdown.is(':not(.open)'), 'dropdown is closed');
      start();
    }, 400);
  })

  
});
