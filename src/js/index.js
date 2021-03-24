import { $ } from "./library/jquery.js";
import Swiper from "../../dist/js/swiper.js";
import cookie from './library/cookie.js';
import  './library/jquery.lazyload.js';
let shop = cookie.get('shop');

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
if(shop){
    $('#number').text(JSON.parse(shop).length);
}else{
    $('#number').text(0);
}
 if(cookie.get('username')){
     $('.in-up').html(`<a href="#">${cookie.get('username')}</a>`);
     $('.hi h3').text(`Hi~,${cookie.get('username')}`);
     $('.hi>p').html(`<a href="../html/signIn.html">退出</a>|<a href="../html/signIn.html">切换</a>`);
 }

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
                    <img class="lazy" data-original="${picture[0].src}" alt="">
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
        $("img.lazy").lazyload({
            effect: "fadeIn", // 载入使用何种效果
            threshold: 300, // 提前开始加载
          }); 
    }
});
//模糊查询
$('#seacrh').on('input',function(){
    let content = this.value;
    $.ajax({
        type: "post",
        url: "../../interface/search.php",
        data: {content},
        dataType: "json",
        success: function (res) {
            if(res.length >0){
                $('.search-helper').css('display','block');
            }else  if(res.length === 0){
                $('.search-helper').css('display','none');
            }
            let temp = '';
            res.forEach(elm => {
                temp += `<li title="${elm.id}" ><a href="../html/details.html?id=${elm.id}">${elm.title}</a></li>`
            });
            $('.search-helper').html(temp);
            if(content === ''){
                $('.search-helper').html('');
                $('.search-helper').css('display','none');
            }
            $('#search').on('click',function(){
                let id = $('.search-helper').children('li:first')[0].title;
                location.href="../html/details.html?id="+id;
            });
            $('#seacrh').on('keydown',function(ev){
                if(ev.keyCode == 13){
                    let id = $('.search-helper').children('li:first')[0].title;
                    location.href="../html/details.html?id="+id;
                }
            });
        }
    });
})
//滚动条
$('.elevator_item').on('click', function() {
    let elm = $(`.${$(this).attr('title')}`);
    let top = parseInt(elm.offset().top)-75 ;
    $('html').animate({
        scrollTop: top
    }, 600);
});
$(window).on('scroll', function() {
    let top = $(document).scrollTop();
    let spike = parseInt($('.spike').offset().top)-75;
    let contm = parseInt($('.contm').offset().top)-75;
    let channel = parseInt($('.channel').offset().top)-75;
    let recommend = parseInt($('.recommend').offset().top)-75;
    if(top >= 700){
        $('.right-top').addClass('search-fix');
        $('.elevator_list').addClass('elevator_fix');
        
    }else{
        $('.right-top').removeClass('search-fix');
        $('.elevator_list').removeClass('elevator_fix');
    }
    if(top < spike){
        $('.elevator_item').removeClass('active');
    }else if(top >= spike & top <contm){
        $('.elevator_item').removeClass('active').eq(0).addClass('active');
    } else if(top >= contm & top <channel){
        $('.elevator_item').removeClass('active').eq(1).addClass('active');
    } else if(top >= channel & top <recommend){
        $('.elevator_item').removeClass('active').eq(2).addClass('active');
    } else if(top >= recommend){
        $('.elevator_item').removeClass('active').eq(3).addClass('active');
    }  
});
//倒计时
function countDown() {
    let nowDate = new Date();
    let endDate = new Date(`${nowDate.getFullYear()}/${nowDate.getMonth()+1}/${nowDate.getDate()+1} 00:00:00`);
    let diffTime = parseInt((endDate.getTime() - nowDate.getTime()) / 1000);
    let hour, minute, second;
    second = diffTime % 60;
    minute = parseInt(diffTime / 60) % 60;
    hour = parseInt(diffTime / 60 / 60);
    let h = $('.hours');
    let m = $('.minutes');
    let s = $('.seconds');
    if (second < 10) {
        s.text("0" + second);
    } else {
        s.text(second);
    }
    if (minute < 10) {
        m.text("0" + minute);
    } else {
        m.text(minute);
    }
    if (hour < 10) {
        h.text("0" + hour);
    } else {
        h.text(hour);
    }

    setTimeout(countDown, 1000);
}
countDown();
