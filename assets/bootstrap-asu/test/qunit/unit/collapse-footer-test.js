$(function () {
  'use strict';

  module('collapsed footer', {
    setup : function () {
      $('#qunit-fixture').append([
      '<div class="footer">',
      '  <div class="big-foot">',
      '    <div class="container">',
      '      <div class="row">',
      '        <div class="col-md-2 col-sm-3 space-bot-md">',
      '          <h2 data-toggle="collapse" data-target="#academics-menu">Academics <span class="caret"></span></h2>',
      '          <ul class="big-foot-nav collapse" id="academics-menu">',
      '            <li><a class="" href="#">Departments</a></li>',
      '            <li><a class="" href="#">Executive Education</a></li>',
      '            <li><a class="" href="#">MBA Degrees</a></li>',
      '            <li><a class="" href="#">Master\'s Degrees</a></li>',
      '            <li><a class="" href="#">Ph.D. Programs</a></li>',
      '          </ul>',
      '        </div>',
      '      </div><!-- /.row -->',
      '    </div><!-- /.container -->',
      '  </div><!-- /.big-foot -->',
      '</div><!-- /.footer -->'
      ].join(''));
    },
    teardown: function () {
      $('#qunit-fixture').empty();
    }
  });

  // phantomjs is always started with mobile width
  test('footer dropdowns should be collapsed for mobile', function () {
    var navs = $( '.big-foot-nav.collapse:not(.in)' ).length

    equal( navs > 0, true, 'footer dropdowns are collapsed' )

    navs = $( '.big-foot-nav.collapse.in' ).length

    equal( navs == 0, true, 'footer dropdowns are not NOT collapsed')
  })

  test('footer dropdowns show on click and hide on click', function () {
    var $nav = $( $( '.big-foot-nav.collapse' )[0] )
    $nav.parent().find('h2').click()

    stop()

    setTimeout( function () {
      var $remaining = $nav.not( '.in' )
      equal( $remaining.length == 0, true, 'footer dropdown is not collapsed' )

      $nav.parent().find('h2').click()

      setTimeout( function () {
        var is = $nav.is( '.in' )
        equal( is, false, 'footer dropdown is collapsed' )

        start()
      }, 500 )
    }, 500 )
  })

})