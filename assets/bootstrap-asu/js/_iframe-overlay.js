+function ($) {
  'use strict';

  $(document).ready(function () {
    /*
     * iframes with content like google maps will take control of mouse scrolling
     * and cause unwanted interaction when scrolling through a page.
     * There is an invisible div over the visit our campus map to stop this behavior.
     * This script will disable the overlay div and allow map interaction after a click.
     */
    $('.iframe-overlay').on( 'click', function () {
      $(this).css( 'pointerEvents', 'none' )
    } )
  })

} (jQuery);
