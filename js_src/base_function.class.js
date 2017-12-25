/**************
 * Base Class *
 **************/

var Index, HeaderGnb;

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

    var $visualItem = this.$mainVisualItem;
    var easingType = this.easingType;

    var $pageItem;

    var timeID, timeID2;
    var imageMovingTime = 1000;
    var imageIntervalTime = 7000;
    var barStretchTime = 10;

    // private
    var _initPaging = function(){

      var $paging = $('<ul class="paging-visual"></ul>');

      $('.main-visual-control-paging').prepend($paging);

      for(var i=0; i<$visualItem.length; i++){
        $paging.append('<li class="paging-item"><div class="paging-link">' + (i+1) + '</div></li>');
      }

      $pageItem = $('.paging-item');
      $pageItem.removeClass('on');
      $pageItem.eq(0).find('.paging-link').addClass('on');

    };

    var _initPosition = function(){

      $visualItem.hide().eq(0).show();

    };

    var _init = function(){

      _initPosition();

      _initPaging();

      _timeBar(true);

      setTimeout(function(){
        _textMotion();
      }, 1000);

    };

    var _textMotion = function(){

      $visualItem.eq(currentVisualIndex).find('.visual-text').eq(0).stop().animate({
        opacity:1,
        left:0
      }, 1000, 'easeOutCubic')
          .delay(4000)
          .queue(function(next){
            $(this).stop().animate({
              opacity:0,
              left:-20
            }, 500);
            next();
          });

      $visualItem.eq(currentVisualIndex).find('.visual-text').eq(1).stop().delay(300).animate({
        opacity:1,
        right:0
      }, 1000, 'easeOutCubic')
          .delay(4000)
          .queue(function(next){
            $(this).stop().animate({
              opacity:0,
              right:-20
            }, 500);
            next();
          });

      $visualItem.eq(currentVisualIndex).find('.visual-text').eq(2).stop().delay(600).animate({
        opacity:1,
        left:0
      }, 1000, 'easeOutCubic')
          .delay(4000)
          .queue(function(next){
            $(this).stop().animate({
              opacity:0,
              left:-20
            }, 500);
            next();
          });

    };

    var _timeBar = function(auto){

      clearInterval(timeID2);

      var barStretch = 0;
      var unitLength = 100 / ( imageIntervalTime / barStretchTime );

      $('.paging-link.on').css({height:(100 - barStretch) + '%'});

      if(auto){

        timeID2 = setInterval(function(){
          $('.paging-link.on').css({height:(100 - barStretch) + '%'});
          barStretch += unitLength;
        }, barStretchTime);

      }

    };

    var _setPlayButtonClass = function(status){
      $('.main-visual-control-paging .play-button').attr('class', 'play-button').addClass(status);
    };

    // public
    this.fade = function(){

      if( nextVisualIndex >= $visualItem.length ){

        nextVisualIndex = 0;

      } else if( nextVisualIndex <= -1 ){

        nextVisualIndex = $visualItem.length-1;

      }

      $visualItem.eq(currentVisualIndex).stop().fadeOut(imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).stop().fadeIn(imageMovingTime, easingType, function(){
        _textMotion();
      });

      $pageItem.find('.paging-link').removeClass('on');
      $pageItem.eq(nextVisualIndex).find('.paging-link').addClass('on');

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _fade = this.fade;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _fade();

        _timeBar(true);

        //HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), nextVisualIndex);

      }, imageIntervalTime);

      _setPlayButtonClass('pause');

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.fade();
      _timeBar(false);

      //HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), nextVisualIndex);

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.fade();
      _timeBar(false);

      //HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), nextVisualIndex);

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

      // stop time bar
      clearInterval(timeID2);

      _setPlayButtonClass('play');

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

});


