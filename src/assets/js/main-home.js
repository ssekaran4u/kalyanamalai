$(document).ready(function ($) {
  'use strict';

 /* ---------------------------------------------
         page  Prealoader
         --------------------------------------------- */
        $(window).on('load', function () {
        $("#loading-center-page").fadeOut();
        $("#loading-page").delay(300).fadeOut("fast");
    });



    /* ---------------------------------------------
        Panel Menu
        --------------------------------------------- */

        var isLateralNavAnimating = false;
        $('.menu-nav-trigger').on('click', function(event){
          event.preventDefault();
          if( !isLateralNavAnimating ) {
            if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 

            $('body').toggleClass('navigation-is-open');
            $('.menu-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              isLateralNavAnimating = false;
            });
          }
        });


   /* ---------------------------------------------
     Smooth scroll
     --------------------------------------------- */

     $('a.section-scroll[href*="#"]:not([href="#"])').on('click', function (event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
        location.hostname == this.hostname) {

        var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();

                $('body').removeClass('navigation-is-open');

                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 750);
                return false;
              }
            }
          });

     /* ---------------------------------------------
         Sticky header
         --------------------------------------------- */
         $(window).on('scroll', function () {
          var scroll_top=$(window).scrollTop();

          if (scroll_top > 40){
            $('.navbar').addClass('sticky');

          }
          else{
            $('.navbar').removeClass('sticky');  
          }

        });





    /* ---------------------------------------------
     Back top page scroll up
     --------------------------------------------- */

     if(Animocon){
       $.scrollUp({
        scrollText: '<div class="btn-button"><i class="las la-angle-double-up"></i></div>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
      });
     }


    /* ---------------------------------------------
     WoW plugin
     --------------------------------------------- */

     new WOW().init({
      mobile: true,
    });








 /*----------------------------------------
     mo.js
     --------------------------------------*/

  // taken from mo.js demos
  function isIOSSafari() {
    var userAgent;
    userAgent = window.navigator.userAgent;
    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
  };

  // taken from mo.js demos
  function isTouch() {
    var isIETouch;
    isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
  };
  
  // taken from mo.js demos
  var isIOS = isIOSSafari(),
  clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.checked = true;

    this.timeline = new mojs.Timeline();
    
    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
      this.timeline.add(this.options.tweens[i]);
    }

    var self = this;
    this.el.on('click', function() {
     self.options.onCheck();
     self.timeline.replay();

     self.checked = !self.checked;
   });
  }


  Animocon.prototype.options = {
    tweens : [
      // new mojs.Burst({})
    ],
    onCheck : function() { return false; },
    onUnCheck : function() { return false; }
  };

  function init() {

  

  }
  /** animation 2 **/
  // var anim2 =$('.btn-button'),
  // anim_im2=$('.hand-btn');
  // var scale_anim= mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
  // new Animocon(anim2, {
  //   tweens : [
  //       // burst animation
  //       new mojs.Burst({
  //         parent:       anim2,
  //         radius:       {40:110},
  //         count:        20,
  //         children: {
  //           shape:      'line',
  //           fill :      'white',
  //           radius:     { 12: 0 },
  //           scale:      1,
  //           stroke:     '#c4383b',
  //           strokeWidth: 2,
  //           duration:   1500,
  //           easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
  //         },
  //       }),
  //       // ring animation
  //       new mojs.Shape({
  //         parent:       anim2,
  //         radius:       {10: 60},
  //         fill:         'transparent',
  //         stroke:       '#c4383b',
  //         strokeWidth:  {30:0},
  //         duration:     800,
  //         easing:       mojs.easing.bezier(0.1, 1, 0.3, 1)
  //       }),
  //       // icon scale animation
  //       new mojs.Tween({
  //         duration : 800,
  //         easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
  //         onUpdate: function(progress) {
  //           var scaleProgress =scale_anim(progress);
  //           anim_im2.css({
  //             'opacity': 1,
  //             '-webkit-transform' : 'scale3d(' + progress + ',' + progress + ',1)',
  //             '-moz-transform'    : 'scale3d(' +progress + ',' + progress + ',1)',
  //             '-ms-transform'     : 'scale3d(' + progress + ',' + progress + ',1)',
  //             '-o-transform'      : 'scale3d(' + progress + ',' + progress + ',1)',
  //             'transform'         : 'scale3d(' + progress + ',' + progress + ',1)'
  //           });


  //         }
  //       })
  //       ],

  //     });


  init();


  /*----------------------------------------------------*/
    /*  scroll buton section 1
    /*----------------------------------------------------*/

    if(Animocon){
      $('.btn-secttion').click(function(){

        $('html, body').animate({
          scrollTop: $("#about-p").offset().top
        }, 2000);
      });

    }

  });