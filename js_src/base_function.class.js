/**************
 * Base Class *
 **************/

var Index, HeaderGnb, PlayerInfo, PlayerVisual, MainNews, PhotoList;

$(function(){

  /**
   * Index Class( Parent Class )
   */

  Index = function(){

    this.$mainSection = $('.full-page-content .section');
    this.$mainVisualItem = $('.main-visual-item');
    this.$mainFullPageContent = $('.full-page-content');
    this.currentMainSectionIndex = 0;
    this.easingType = 'easeInOutExpo';

    this.setCurrentMainSectionIndex = function(currentIndex){

      this.currentMainSectionIndex = currentIndex;

    };

    this.getCurrentMainSectionIndex = function(){

      return this.currentMainSectionIndex;

    };

  };

  /**
   * HeaderGnb Class
   */

  HeaderGnb = new function(){

    Index.apply(this);

    var $visualItem = this.$mainVisualItem;
    var $mainSection = this.$mainSection;
    var $fullPageContent = this.$mainFullPageContent;


    var _initClass = function(){
      $('.header, .gnb').addClass( $fullPageContent.find('.section').eq(0).data('gnb-color') );
    };

    var _setClassVisual = function(index){
      //console.log('set visual index : ' + index);
      $('.header').attr('class', 'header ' + $visualItem.eq(index).data('gnb-color') );
      $('.gnb').attr('class', 'gnb ' + $visualItem.eq(index).data('gnb-color') );
    };

    var _setClassSection = function(index){
      $('.header').attr('class', 'header ' + $mainSection.eq(index).data('gnb-color') );
      $('.gnb').attr('class', 'gnb ' + $mainSection.eq(index).data('gnb-color') );
      //console.log('set section index : ' + index);
    };

    this.setClass = function(setClassSectionIndex, setClassVisualIndex){

      //console.log('section index : ' + setClassSectionIndex);
      //console.log('visual index : ' + setClassVisualIndex);

      this.setCurrentMainSectionIndex(setClassSectionIndex);

      if( setClassSectionIndex == 0 ){

        //console.log('set visual');
        _setClassVisual(setClassVisualIndex);

      } else {

        //console.log('set section');
        _setClassSection(setClassSectionIndex);

      }

    };

    _initClass();

  };

  /**
   * MainVisual Class
   */

  MainVisual = new function(){

    Index.apply(this);

    // private
    var currentVisualIndex = 0;
    var nextVisualIndex = 0;

    var $visualItem = $('.main-top-bg');
    var easingType = this.easingType;

    var $pageItem;

    var timeID, timeID2;
    var imageMovingTime = 4000;
    var imageIntervalTime = 8000;
    var barStretchTime = 10;

    // private
    var _initPosition = function(){

      $visualItem.hide().eq(0).show();

    };

    var _init = function(){

      _initPosition();

    };

    // public
    this.fade = function(){

      if( nextVisualIndex >= $visualItem.length ){

        nextVisualIndex = 0;

      } else if( nextVisualIndex <= -1 ){

        nextVisualIndex = $visualItem.length-1;

      }

      $visualItem.eq(currentVisualIndex).stop().fadeOut(imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).stop().fadeIn(imageMovingTime, easingType);

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _fade = this.fade;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _fade();

      }, imageIntervalTime);

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.fade();

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.fade();

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

      // stop time bar
      clearInterval(timeID2);

    };

    this.checkAnimate = function(){

      return this.$mainVisualItem.is(':animated');

    };

    this.getNextVisualIndex = function(){

      return nextVisualIndex;

    };

    // running in constructor when loading
    _init();
    this.rollAuto();

  };

  /**
   * MainNews Class
   */

  MainNews = function( $listParent ){

    // private
    var currentVisualIndex = 0;
    var nextVisualIndex = 0;

    var $visualItem = $listParent.find( $('.main-news-notice-item') );
    var easingType = this.easingType;

    var timeID;
    var imageMovingTime = 1000;
    var imageIntervalTime = 5000;

    // private
    var _initPosition = function(){

      $visualItem.css({top:'-100%'}).eq(0).css({top:0});
      $visualItem.eq( $visualItem.length-1 ).css({top:'100%'});

    };

    var _init = function(){

      _initPosition();

    };

    this.moveBottom = function(){

      if( nextVisualIndex >= $visualItem.length ){
        nextVisualIndex = 0;
      }

      $visualItem.eq(currentVisualIndex).stop().animate({top:'100%'}, imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).css({top:'-100%'}).stop().animate({top:0}, imageMovingTime, easingType);

      currentVisualIndex = nextVisualIndex;

    };

    this.moveTop = function(){

      if( nextVisualIndex <= -1 ){
        nextVisualIndex = $visualItem.length-1;
      }

      $visualItem.eq(currentVisualIndex).stop().animate({top:'-100%'}, imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).css({top:'100%'}).stop().animate({top:0}, imageMovingTime, easingType);

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _moveBottom = this.moveBottom;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _moveBottom();

      }, imageIntervalTime);

    };

    this.rollBottom = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.moveBottom();

    };

    this.rollTop = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.moveTop();

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

    };

    this.checkAnimate = function(){

      return this.$mainVisualItem.is(':animated');

    };

    this.getNextVisualIndex = function(){

      return nextVisualIndex;

    };

    // public


    // running in constructor when loading
    _init();
    this.rollAuto();

  };

  /**
   * PlayerVisual Class
   */

  PlayerVisual = new function(){

    // private
    var currentVisualIndex = 0;
    var nextVisualIndex = 0;

    var $visualItem = $('.main-member-list-item');
    var easingType = this.easingType;

    var timeID, timeID2;
    var imageMovingTime = 1000;
    var imageIntervalTime = 7000;

    // private
    var _initPosition = function(){

      $visualItem.hide().eq(0).show();

    };

    var _init = function(){

      _initPosition();

    };

    // public
    this.fade = function(){

      if( nextVisualIndex >= $visualItem.length ){

        nextVisualIndex = 0;

      } else if( nextVisualIndex <= -1 ){

        nextVisualIndex = $visualItem.length-1;

      }

      $visualItem.eq(currentVisualIndex).stop().fadeOut(imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).stop().fadeIn(imageMovingTime, easingType);

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _fade = this.fade;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _fade();

      }, imageIntervalTime);

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.fade();

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.fade();

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

      // stop time bar
      clearInterval(timeID2);

    };

    this.checkAnimate = function(){

      return $visualItem.is(':animated');

    };

    this.getNextVisualIndex = function(){

      return nextVisualIndex;

    };

    // running in constructor when loading
    _init();
    //this.rollAuto();

  };

  /**
   * PlayerInfo Class
   */

  PlayerInfo = new function(){

    var photoWidth;
    var listWidth;
    var $visualItem = $('.team-profile-player-list');
    var photoLength = $('.team-profile-player-photo').length;
    var outerPhotoLength = photoLength - 5;

    var _init = function(){

      photoWidth = $('.team-profile-player-photo').outerWidth() + 40;
      listWidth = photoWidth * photoLength;
      $('.team-profile-player-list').width(listWidth);

    };

    this.setURLCurrentMember = function(){

      var memberIndex = parseInt( window.location.hash.replace('#member', '') ) - 1;
      var moveIndex = 0;

      $('#search-player').val(window.location.hash).prop('selected', true);

      $('.team-profile-player-photo').removeClass('on');
      $('.team-profile-player-photo').eq(memberIndex).addClass('on');

      $('.individual-profile').removeClass('on');
      $('.individual-profile').eq(memberIndex).addClass('on');

      if( memberIndex <= 2 ){

        moveIndex = 0;

      } else if( memberIndex >= photoLength - 2 ) {

        moveIndex = photoLength - 5;

      } else {

        moveIndex = memberIndex - 2;

      }

      if( $('.team-profile-player-list').hasClass('coach-wrap') ){

        $('.team-profile-player-list').css({left:260});

      } else {

        $('.team-profile-player-list').stop().animate({
          left : -(moveIndex * photoWidth)
        });

      }



    };

    this.left = function(){

      var currentLeft =  parseInt( $visualItem.css('left') );

      if( parseInt( $visualItem.css('left') ) >= -(photoWidth * outerPhotoLength) && parseInt( $('.team-profile-player-list').css('left') ) < 0 ){

        $visualItem.stop().animate({

          left : currentLeft + photoWidth

        });

      }

    };

    this.right = function(){

      var currentLeft =  parseInt( $visualItem.css('left') );

      if( parseInt( $visualItem.css('left') ) > -(photoWidth * outerPhotoLength) && parseInt( $('.team-profile-player-list').css('left') ) <= 0 ){

        $visualItem.stop().animate({

          left : currentLeft - photoWidth

        });

      }

    };

    this.checkAnimate = function(){

      return $visualItem.is(':animated');

    };

    _init();

  };

  /**
   * PhotoList Class
   */

  PhotoList = new function(){

    var photoWidth;
    var listWidth;
    var $visualItem = $('.photo-list');
    var photoLength = $('.photo-list-item').length;
    var outerPhotoLength = photoLength - 4;

    var _init = function(){

      photoWidth = $('.photo-list-item').outerWidth() + 14;
      listWidth = photoWidth * photoLength;
      $('.photo-list').width(listWidth);

    };

    this.setURLCurrentMember = function(){

      var memberIndex = $('.photo-list-link').index( $('.photo-list-link.on') );

      $('.photo-list-link').removeClass('on');
      $('.photo-list-link').eq(memberIndex).addClass('on');

      if( memberIndex >= photoLength - 3 ) {

        memberIndex = photoLength - 4;

      }

      $visualItem.stop().animate({
        left : -(memberIndex * photoWidth)
      });

    };

    this.left = function(){

      var currentLeft =  parseInt( $visualItem.css('left') );

      if( parseInt( $visualItem.css('left') ) >= -(photoWidth * outerPhotoLength) && parseInt( $visualItem.css('left') ) < 0 ){

        $visualItem.stop().animate({

          left : currentLeft + photoWidth

        });

      }

    };

    this.right = function(){

      var currentLeft =  parseInt( $visualItem.css('left') );

      if( parseInt( $visualItem.css('left') ) > -(photoWidth * outerPhotoLength) && parseInt( $visualItem.css('left') ) <= 0 ){

        $visualItem.stop().animate({

          left : currentLeft - photoWidth

        });

      }

    };

    this.checkAnimate = function(){

      return $visualItem.is(':animated');

    };

    _init();

  };

});


