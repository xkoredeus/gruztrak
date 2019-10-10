$(function() {
  //card slider
  var sync1 = $('.banner__bg');
  var sync2 = $('.banner__slider');

  var thumbnailItemClass = '.owl-item';

  var slides = sync1.owlCarousel({
    startPosition: 0,
    items:1,
    loop:false,
    margin:10,
    nav: false,
    dots: false,
    smartSpeed: 700,
    autoplay:false,
    autoplayTimeout:6000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',

    autoplayHoverPause:false,
    mouseDrag: false,
  }).on('changed.owl.carousel', syncPosition);

  function syncPosition(el) {
    $owl_slider = $(this).data('owl.carousel');
    var loop = $owl_slider.options.loop;

    if(loop){
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      if(current < 0) {
          current = count;
      }
      if(current > count) {
          current = 0;
      }
    }else{
      var current = el.item.index;
    }

    var owl_thumbnail = sync2.data('owl.carousel');
    var itemClass = "." + owl_thumbnail.options.itemClass;


    var thumbnailCurrentItem = sync2
    .find(itemClass)
    .removeClass("synced")
    .eq(current);

    thumbnailCurrentItem.addClass('synced');

    if (!thumbnailCurrentItem.hasClass('active')) {
      var duration = 300;
      sync2.trigger('to.owl.carousel',[current, duration, true]);
    }   
  }
  var thumbs = sync2.owlCarousel({
    startPosition: 0,
    items:1,
    loop:false,
    margin: 0,
    autoplay:false,
    nav: false,
    dots: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayHoverPause: true,
    mouseDrag: false,
    onInitialized: function (e) {
      var thumbnailCurrentItem =  $(e.target).find(thumbnailItemClass).eq(this._current);
      thumbnailCurrentItem.addClass('synced');
    },
  })
  .on('click', thumbnailItemClass, function(e) {
      e.preventDefault();
      var duration = 300;
      var itemIndex =  $(e.target).parents(thumbnailItemClass).index();
      sync1.trigger('to.owl.carousel',[itemIndex, duration, true]);
  }).on("changed.owl.carousel", function (el) {
    var number = el.item.index;
    $owl_slider = sync1.data('owl.carousel');
    $owl_slider.to(number, 100, true);
  });
  // tabs 
  if ( $(window).width() > 600 ) {
    $(document).ready(function () {
      $(".tabs__content-item:not(:first-child)").hide();
      $(".tabs__container div.tabs__content-item.active-tab").show();
      $('ul.tabs__list > li').click(function () {
        if (!($(this).hasClass('active'))) {
          var thisLi = $(this);
          var numLi = thisLi.index();
          thisLi.addClass('active').siblings().removeClass('active');
          thisLi.parent().next().children('div').hide().eq(numLi).fadeIn('slow');
        }
      });
    });
  };
  if ( $(window).width() < 600 ) {
    $('.tabs-acc__btn').on('click', function(){
      $(this).toggleClass('active').siblings('.tabs-acc__cnt').slideToggle();
    })
  };

  $('.crane__slider').owlCarousel({
    navText: ["<svg width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'><path d='M6 1L1 6L6 11' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>", "<svg width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'><path d='M1 11L6 6L0.999999 1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"],
    loop: false,
    smartSpeed: 700,
    autoplay: false,
    // autoplayHoverPause: true,
    margin: 20,
    responsive : {
      0   : {
          items: 1,
          nav: false,
          dots: true,
      },
      600 : {
          items: 2,
          nav: true,
          dots: false,
      },
      800 : {
          items: 3,
          nav: true,
          dots: false,
      },
      1200 : {
          items: 4,
          nav: true,
          dots: false,
      }
    }
  });
  //map
  $(document).ready(function () {
    var myMap;

    ymaps.ready(init);
    function init(){
      myMap = new ymaps.Map("map", {
          center: [59.83663456, 30.37202250],
          globalPixelCenter: [54,35],
          zoom: 10,
          scrollZoom: false,
          controls: ["typeSelector"],
      });
      // myMap.behaviors.disable('drag');
      myMap.behaviors.disable('scrollZoom'); 
      var placemarks = [
          {
              coords: [59.86663456, 30.47202250],
              icon: 'img/baloon.svg',
              icon_size: [50, 50],
              icon_offset: [-25, -25], // -50% ширины, -100% высоты от точки привязки (левый верхний угол)
          },
          {
              coords: [59.82384206, 30.52547200],
              icon: 'img/baloon.svg',
              icon_size: [50, 50],
              icon_offset: [-25, -25], // -50% ширины, -100% высоты от точки привязки (левый верхний угол)
          },
          {
              coords: [60.54950006, 30.21664900],
              icon: 'img/baloon.svg',
              icon_size: [50, 50],
              icon_offset: [-25, -25], // -50% ширины, -100% высоты от точки привязки (левый верхний угол)
          },
      ];

      placemarks.forEach(function(item){
          var obj = new ymaps.Placemark(
              item.coords,
              {},
              {
                  iconLayout: 'default#image',
                  iconImageHref: item.icon,
                  iconImageSize: item.icon_size,
                  iconImageOffset: item.icon_offset,
              }
          );
          myMap.geoObjects.add(obj);
      });
    };
  });
  //sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 4){
    $('.header').addClass('sticky');
    }
    else{
    $('.header').removeClass('sticky');
    }
  });
  //current section
  jQuery(window).scroll(function(){
  var $sections = $('section');
    $sections.each(function(i,el){
    var top  = $(el).offset().top-100;
    var bottom = top +$(el).height();
    var scroll = $(window).scrollTop();
    var id = $(el).attr('id');
      if( scroll > top && scroll < bottom){
        $('a.active').removeClass('active');
        $('a[href="#'+id+'"]').addClass('active');
      }
    })
  });
  $('.anchor-link').on('click', function (e) {
      e.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 800);
  });
  $(".header__nav").on("click","a", function (event) {
      event.preventDefault();
      $('.header__hamburger').removeClass('active');
      $('body').removeClass('menu-open');
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 800);
  });

  $('[data-fancybox]').fancybox({
    animationDuration : 600,
    animationEffect   : 'slide-in-in',
    touch : false
  });
  $('.pop_crane__close').on('click', function () {
    $.fancybox.close();
  });
  //pop slider
  var sync3 = $('.pop_crane__slider_top');
  var sync4 = $('.pop_crane__slider_bot');

  var thumbnailItemClass = '.owl-item';

  var slides = sync3.owlCarousel({
    startPosition: 0,
    items:1,
    loop:false,
    margin:10,
    nav: true,
    navText: ["<svg width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'><path d='M6 1L1 6L6 11' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>", "<svg width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'><path d='M1 11L6 6L0.999999 1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"],
    dots: false,
    smartSpeed: 700,
    autoplay:false,
    autoplayTimeout:6000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',

    autoplayHoverPause:false,
    mouseDrag: false,
  }).on('changed.owl.carousel', syncPosition);

  function syncPosition(el) {
    $owl_slider = $(this).data('owl.carousel');
    var loop = $owl_slider.options.loop;

    if(loop){
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      if(current < 0) {
          current = count;
      }
      if(current > count) {
          current = 0;
      }
    }else{
      var current = el.item.index;
    }

    var owl_thumbnail = sync4.data('owl.carousel');
    var itemClass = "." + owl_thumbnail.options.itemClass;


    var thumbnailCurrentItem = sync4
    .find(itemClass)
    .removeClass("synced")
    .eq(current);

    thumbnailCurrentItem.addClass('synced');

    if (!thumbnailCurrentItem.hasClass('active')) {
      var duration = 300;
      sync4.trigger('to.owl.carousel',[current, duration, true]);
    }   
  }
  var thumbs = sync4.owlCarousel({
    startPosition: 0,
    items:4,
    loop:false,
    margin: 20,
    autoplay:false,
    nav: false,
    dots: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayHoverPause: true,
    mouseDrag: false,
    onInitialized: function (e) {
      var thumbnailCurrentItem =  $(e.target).find(thumbnailItemClass).eq(this._current);
      thumbnailCurrentItem.addClass('synced');
    },
  })
  .on('click', thumbnailItemClass, function(e) {
      e.preventDefault();
      var duration = 300;
      var itemIndex =  $(e.target).parents(thumbnailItemClass).index();
      sync3.trigger('to.owl.carousel',[itemIndex, duration, true]);
  }).on("changed.owl.carousel", function (el) {
    var number = el.item.index;
    $owl_slider = sync3.data('owl.carousel');
    $owl_slider.to(number, 100, true);
  });
  if ( $(window).width() < 1200 ) {
    $('.about__list-in').removeClass('row').addClass('owl-carousel');
    $('.about__item').removeClass('col-xl-3 col-sm-6 mb-3 mb-sm-0');
    $('.about__list-in').owlCarousel({
      nav: false,
      autoplay: true,
      loop: true,
      smartSpeed: 700,
      margin: 20,
      dots: true,
      responsive : {
        0   : {
            items: 1
        },
        380 : {
            items: 1
        },
        600 : {
            items: 2
        },
        1200 : {
            items: 3
        }
      }
    });
    $('.serv__list-in').removeClass('row').addClass('owl-carousel');
    $('.serv__item').removeClass('col-xl-3 col-sm-6 mb-3 mb-sm-0');
    $('.serv__list-in').owlCarousel({
      nav: false,
      autoplay: true,
      loop: true,
      smartSpeed: 700,
      margin: 20,
      dots: true,
      responsive : {
        0   : {
            items: 1
        },
        380 : {
            items: 1
        },
        600 : {
            items: 2
        },
        1200 : {
            items: 3
        }
      }
    });
    $('.lis__list-in').removeClass('row').addClass('owl-carousel');
    $('.lis__item').removeClass('col-xl-3 col-sm-6 mb-3 mb-sm-0');
    $('.lis__list-in').owlCarousel({
      nav: false,
      autoplay: true,
      loop: true,
      smartSpeed: 700,
      margin: 20,
      dots: true,
      responsive : {
        0   : {
            items: 1
        },
        380 : {
            items: 1
        },
        600 : {
            items: 2
        },
        1200 : {
            items: 3
        }
      }
    });
    $('.part__list').removeClass('d-flex justify-content-between flex-wrap').addClass('owl-carousel');
    $('.part__list').owlCarousel({
      nav: false,
      autoplay: true,
      loop: true,
      smartSpeed: 700,
      margin: 20,
      dots: true,
      responsive : {
        0   : {
            items: 1
        },
        380 : {
            items: 1
        },
        600 : {
            items: 2
        },
        1200 : {
            items: 3
        }
      }
    });
    $('.header__hamburger').on('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('menu-open');
    });
  }
});