Flatsome.behavior('devvn-row-slider', {
    attach: function (context) {
        jQuery('.devvn-row-slider', context).each(function () {
            var $el = jQuery(this)
            if ($el.hasClass('devvn-row-slider-js-attached')) return
            $el.addClass('devvn-row-slider-js-attached')
            $el.lazyFlickity({
                "cellAlign": "center",
                "wrapAround": true,
                "autoPlay": true,
                "pauseAutoPlayOnHover": true,
                "prevNextButtons": false,
                "percentPosition": true,
                "imagesLoaded": true,
                "pageDots": false,
                "rightToLeft": false,
                "contain": true
            })
            $el.on('flatsome-flickity-ready', function () {
                var flickity = $el.data('flickity')
                if (flickity && flickity.player) {
                    $el.off('mouseenter.flickity mouseleave.flickity')
                    $el.on('mouseleave', function () {
                        if (flickity.player && flickity.player.state !== 'playing') {
                            flickity.player.play()
                        }
                    })
                }
            })
        })
    }
})

Flatsome.attach('devvn-row-slider');

if($('.devvn_slider_prod').length){
    $('.devvn_slider_prod').each(function(){
        $(this).lazyFlickity({
      "cellAlign": "left",
      "wrapAround": false,
      "autoPlay": false,
      "prevNextButtons": true,
      "percentPosition": true,
      "imagesLoaded": true,
      "pageDots": true,
      "rightToLeft": false,
      "contain": true
        })
    });
}

/*php

add_action('wp_footer', function(){
    ?>
    <script>
        (function ($){
        	$(document).ready(function() {
        		$('.row-slider-image-box').each(function(){
        			$(this).find('style[scope="scope"]').remove();
        			$(this).lazyFlickity({
            			"cellAlign": "left",
                          "wrapAround": false,
                          "autoPlay": false,
                          "prevNextButtons": true,
                          "percentPosition": true,
                          "imagesLoaded": true,
                          "pageDots": true,
                          "rightToLeft": false,
                          "contain": true,
                          lazyLoad: 1,
        			});
        		});
        	});
        })(jQuery);
        </script>
    <?php
});
*/
