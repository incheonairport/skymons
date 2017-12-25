/******************
 * Base Execution *
 ******************/

  // loading
(function(){

  setTimeout(function(){
    $('.loading-inner').removeClass('opacity');
  }, 1000);

  $(window).on('load', function(){
    setTimeout(function(){
      $('.loading').addClass('opacity').delay(1000).queue(function(){
        $(this).addClass('none');
      });
    }, 3000);
  })

})();

$(function(){

  /**
   * loading
   */

  var scrollHeight;

  $('.gnb').append('<div class="scroll-amount"></div>');




  /**
   * event
   */

  // Header 이벤트
  (function(){

    $('.gnb-depth1-link').on('mouseenter', function(){
      $('.gnb').addClass('on');
    });

    $('.gnb').on('mouseleave', function(){
      $('.gnb').removeClass('on');
    });

    $('.header-search-btn').on('click', function(){

      $('.total-search').addClass('show');
      $('.header, .gnb').addClass('bg');

    });

    $('.total-search-close').on('click', function(){

      $('.total-search').removeClass('show');

      $(window).scroll();

    });

  })();

  // 공통 이벤트
  (function(){

    $(window).on('resize', function(){

      scrollHeight = $('body').height() - $(window).height();

    }).resize();

    $(window).on('scroll', function(){

      if( !$('.total-search').hasClass('show') ){

        var scrollAmount = ( $(this).scrollTop() / scrollHeight ) * 100;

        $('.scroll-amount').css({width : scrollAmount + '%'});

        if( $(this).scrollTop() >= 200 ){

          $('.header, .gnb').addClass('down');
          $('.total-search').addClass('down');

        } else if( $(this).scrollTop() < 200 ){

          $('.header, .gnb').removeClass('down');
          $('.total-search').removeClass('down');

        }

      }

    }).scroll();

    // Layer Popup 닫기
    $('.layer-close').on('click', function(){

      LayerPopup.closePopup( $(this).parent('.layer') );

    });

  })();

  // 메인 페이지 이벤트
  (function(){

    $('.main-visual-control-arrow .arrow.prev').on('click', function(){

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollRight();

      }

    });

    $('.main-visual-control-arrow .arrow.next').on('click', function(){

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollLeft();

      }

    });

    $('.main-visual-control-paging .play-button').on('click', function(){

      if( $(this).hasClass('pause') ){

        MainVisual.rollStop();

      } else {

        MainVisual.rollAuto();

      }

    });

  })();

  // LNB 이벤트
  (function(){

    var $lnb = $('.left-menu-depth1-item-link');

    // init
    $lnb.each(function(i){

      if( $(this).next('.left-menu-depth2').length != 0 ){

        $(this).addClass('has-child');

      }

      if( !$(this).hasClass('open') ){
        $(this).data('open', false);
      } else {
        $(this).data('open', true);
      }

    });


    $lnb.on('click', function(e){

      if( $(this).hasClass('has-child') ){

        e.preventDefault();

        $lnb.each(function(){

          if( $(this).hasClass('has-child') ){

            $(this).addClass('close').removeClass('on open').data('open', false);

          }

        });

        if( $(this).data('open') ){
          //$(this).removeClass('on open').addClass('close').data('open', false);
        } else {
          $(this).removeClass('close').addClass('on open').data('open', true);
        }

      }

    });

  })();

});


