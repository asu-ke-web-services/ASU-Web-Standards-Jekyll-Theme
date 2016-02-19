+function ($) {
  'use strict';

  $(document).ready(function () {
    var navbarHeight = $('.navbar-ws').outerHeight() + 20 /* padding */;

    var affixed = $('#sidebarNav').each(function () {
      var $this = $(this);

      $this.affix( {
        offset: {
          top : $this.offset().top - navbarHeight,
          bottom : function () {
            var fix = parseInt($this.css('margin-bottom'), 10)
            fix += parseInt($this.css('padding-top'), 10)
            fix += parseInt($this.css('padding-bottom'), 10)
            return $('.footer').outerHeight(true) + fix
          }
        }
      } )

      // Hacky fix for responsive width
      // Set the sidebar's width to be the width of the
      // parent.
      var responsiveFix = function () {
        var padding = $this.innerWidth() - $this.width()
        $this.width( $this.parent().width() - padding )
      }

      $(window).smartresize( responsiveFix )

      responsiveFix()
    })

    /*
     * Fix the pushed column affix bug in safari. Applies to the
     * sticky sidebar.
     *
     * @sourcehttps://github.com/twbs/bootstrap/issues/12126
     */
    if ( navigator.userAgent.indexOf('Safari') != -1 &&
         navigator.userAgent.indexOf('Chrome') == -1 ) {

      var explicitlySetAffixPosition = function () {
        if ( $(window).innerWidth() >= 992 ) {
          affixed.css('left', affixed.offset().left + 'px')
        }
      }

      /*
       * Before the element becomes affixed, add left CSS that is equal
       * to the distance of the element from the left of the screen
       */
      affixed.on('affix.bs.affix', function () {
        explicitlySetAffixPosition()
      })
    }

    /*
     * Remove left position when affix-top class is applied
     * Also, remove the top offset
     */
    affixed.on('affix-top.bs.affix', function () {
      affixed.css({
        left: 'auto',
        top : 0
      })
    })

    /*
     * Add a top offset so that the sidebar is not behing the navbar
     */
    affixed.on('affix.bs.affix', function () {
      affixed.css({
        top : navbarHeight + 'px'
      })
    })

    /**
     * On resize, un-affix the affixed widget to measure where it
     * should be located, then set the left CSS accordingly, re-affix
     * it
     */
    $(window).smartresize(function () {
      if ( affixed.hasClass('affix') ) {
        affixed.removeClass('affix')
        affixed.css('left','auto')
        explicitlySetAffixPosition()
        affixed.addClass('affix')
      }
    })

    /**
     * Now we have to remove the left positioning of get affix-bottom
     * to work properly
     */
    affixed.on('affix-bottom.bs.affix', function () {
      affixed.css('left','auto')
    })
  })

} (jQuery);
