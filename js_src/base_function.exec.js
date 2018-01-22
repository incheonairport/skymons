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

  // 메인 페이지 로딩
  var playerNews, matchNews;
  (function(){

    playerNews = new MainNews( $('.player-news') );
    matchNews = new MainNews( $('.match-news') );

  })();

  // 선수단 페이지 로딩
  (function(){

    if( $('div').hasClass('team-profile-player') ){

      if( window.location.hash == '' ){
        window.location.hash = '#member1';
      }

      PlayerInfo.setURLCurrentMember();

    }

  })();

  // 포토리스트 페이지 로딩
  (function(){

    PhotoList.setURLCurrentMember();

  })();


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

    // Layer Popup 닫기
    $('.layer-close').on('click', function(){

      LayerPopup.closePopup( $(this).parent('.layer') );

    });

  })();

  // 메인 페이지 이벤트
  (function(){

    $('.main-news-title').on('click', function(){

      var tabIndex = $('.main-news-title').index( $(this) );

      $('.main-news-title').removeClass('on');
      $(this).addClass('on');

      $('.main-news-text').removeClass('on');
      $('.main-news-text').eq(tabIndex).addClass('on');

    });

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

    $('.main-member-btn.prev').on('click', function(){

      if( !PlayerVisual.checkAnimate() ){

        PlayerVisual.rollRight();

      }

    });

    $('.main-member-btn.next').on('click', function(){

      if( !PlayerVisual.checkAnimate() ){

        PlayerVisual.rollLeft();

      }

    });

    $('.main-news-notice-btn.prev').on('click', function(){

      if( $(this).parents('.main-news-text').hasClass('player-news') ){
        if( !playerNews.checkAnimate() ) {
          playerNews.rollTop();
        }
      } else {
        if(!matchNews.checkAnimate()) {
          matchNews.rollTop();
        }
      }

      $(this).siblings('.play-button').removeClass('pause').addClass('play');

    });

    $('.main-news-notice-btn.next').on('click', function(){

      if( $(this).parents('.main-news-text').hasClass('player-news') ){

        if( !playerNews.checkAnimate() ){
          playerNews.rollBottom();
        }

      } else {
        if(!matchNews.checkAnimate()){
          matchNews.rollBottom();
        }
      }

      $(this).siblings('.play-button').removeClass('pause').addClass('play');

    });

    $('.main-news-notice-btn.play-button').on('click', function(){

      if( $(this).hasClass('pause') ){

        if( $(this).parents('.main-news-text').hasClass('player-news') ){
          playerNews.rollStop();
        } else {
          matchNews.rollStop();
        }

        $(this).removeClass('pause').addClass('play');

      } else {

        if( $(this).parents('.main-news-text').hasClass('player-news') ){
          playerNews.rollAuto();
        } else {
          matchNews.rollAuto();
        }

        $(this).removeClass('play').addClass('pause');

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

  // 선수단 리스트 페이지 이벤트
  (function(){

    $('.arrow.prev').on('click', function(){
      if( !PlayerInfo.checkAnimate() ){
        PlayerInfo.left();
      }
    });

    $('.arrow.next').on('click', function(){
      if( !PlayerInfo.checkAnimate() ){
        PlayerInfo.right();
      }
    });

    $('.team-profile-player-photo').on('click', function(){

      window.location.hash = $(this).data().value;

      if(!PlayerInfo.checkAnimate()){
        PlayerInfo.setURLCurrentMember() ;
      }

    });

    $('.search-box-btn').on('click', function(){

      window.location.hash = $('#search-player option:selected').val();

      if(!PlayerInfo.checkAnimate()){
        PlayerInfo.setURLCurrentMember() ;
      }

    });

  })();

  // 포토 리스트 페이지 이벤트
  (function(){

    $('.photo-thumb-btn.prev').on('click', function(){

      if( !PhotoList.checkAnimate() ){
        PhotoList.left();
      }

    });

    $('.photo-thumb-btn.next').on('click', function(){

      if( !PhotoList.checkAnimate() ){
        PhotoList.right();
      }

    });

  })();

  // select box 이벤트
  (function(){

    $('.search-box-btn').on('click', function(){
      if( $('div').hasClass('search-box-year-contents') ){
        var index = $('#search-year.search-box-input-select option:selected').index();
        var val = $('#search-year.search-box-input-select option:selected').text();

        $('.search-box-year-contents').removeClass('on');
        $('.search-box-year-contents').eq(index).addClass('on');
      }

      $('.sub-contents-heading2.change-heading .year').text( val );
      $('.sub-contents-heading2.change-heading .number').text( $('.search-box-year-contents').eq(index).find('.table.hr tr').length-1 );
    });

  })();

});


