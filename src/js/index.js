import { $ } from "./jquery.js"
import Swiper from "/dist/js/swiper.js"
//轮播图
let mainSwiper = new Swiper('.main-banner', {
    loop: true,
    effect : 'fade',
    pagination: {
      el: '.main-banner .swiper-pagination',
      clickable :true
    },
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.main-banner>.swiper-button-next',
      prevEl: '.main-banner>.swiper-button-prev',
    },
});
$('.main-banner').hover(function(){
    mainSwiper.autoplay.stop();
    },function(){
    mainSwiper.autoplay.start();
});
for(let i=0;i<mainSwiper.pagination.bullets.length;i++){
    mainSwiper.pagination.bullets[i].onmouseover=function(){
      this.click();
    };
  } 
let minSwiper = new Swiper('.min-banner', {
    loop: true,
    effect : 'fade',
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.min-banner>.swiper-button-next',
      prevEl: '.min-banner>.swiper-button-prev',
    },
});
$('.min-banner').hover(function(){
    minSwiper.autoplay.stop();
    },function(){
    minSwiper.autoplay.start();
});
let maxb = new Swiper('.maxb', {
    loop: true,
    effect : 'slide',
    navigation: {
      nextEl: '.maxb>.swiper-button-next',
      prevEl: '.maxb>.swiper-button-prev',
    },
});
let minb = new Swiper('.minb', {
    loop: true,
    effect : 'slide',
    pagination: {
        el: '.minb>.swiper-pagination',
    },
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.minb>.swiper-button-next',
      prevEl: '.minb>.swiper-button-prev',
    },
});
var find = new Swiper ('.find-r', {
    // loop: true, // 循环模式选项
    slidesPerView : 6,  
    draggable: true,
    speed:2500,
    autoplay: {
        delay:0
    },
    scrollbar: {
      el: '.find-r .swiper-scrollbar',
    },
});
$('.find-r').hover(function(){
    find.autoplay.stop();
    },function(){
    find.autoplay.start();
});
let newb = new Swiper('.new-b', {
    loop: true,
    effect : 'coverflow',
    slidesPerView: 2,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows : false
      },
    pagination: {
      el: '.new-b .swiper-pagination',
      clickable :true
    },
    navigation: {
      nextEl: '.new-b>.swiper-button-next',
      prevEl: '.new-b>.swiper-button-prev',
    },
});
//选项卡
$('.tabs-list>li').on('mouseover',function(){
    $(this).addClass('hoverc').siblings().removeClass('hoverc');
    $('.specials>.tabs-box').eq($(this).index()).addClass('active').siblings().removeClass('active');
});
$('.p-tabs-l>li').on('mouseover',function(){
    $(this).addClass('hoverc').siblings().removeClass('hoverc');
    $('.p-tabs-b').eq($(this).index()).addClass('active').siblings().removeClass('active');
});
