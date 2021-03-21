import { $ } from "./library/jquery.js"
import Swiper from "../../dist/js/swiper.js"
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
let find = new Swiper ('.find-r', {
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
find.scrollbar.$dragEl.css({
    'height':'10px',
    'top':'-3px',
    'opacity':'0'
});
find.scrollbar.$el.css('opacity','0');
$('.find-r').hover(function(){
    find.autoplay.stop();
    find.scrollbar.$dragEl.css('opacity','1');
    find.scrollbar.$el.css('opacity','1');
    },function(){
    find.autoplay.start();
    find.scrollbar.$dragEl.css('opacity','0');
    find.scrollbar.$el.css('opacity','0');
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
//动态渲染
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function (res) {
        let temp='';
        res.forEach((elm,i)=>{
            let picture = JSON.parse(elm.picture);
            temp+=`<li class="more-item">
            <a href="./details.html?id=${elm.id}">
                <div class="more-img">
                    <img src="${picture[0].src}" alt="">
                </div>
                <p class="more-info">${elm.title.slice(0,43)+'...'}</p>
                <p class="more-price">￥<b class="more-price-txt">${elm.price}</b>.00</p>
                <div class="more-hover">
                <div class="more-btn">找相似</div>
                </div>
            </a>
        </li>`;
        });
        for(let i = 0 ; i < 4 ; i++){
            $('.more-list')[0].innerHTML+=temp;
        }
    }
});