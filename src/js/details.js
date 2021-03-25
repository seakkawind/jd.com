import { $ } from "./library/jquery.js";
import cookie from './library/cookie.js';
let shop = cookie.get('shop');
//放大镜
$('.pimg-box').on({
    'mouseenter': () => {
        $('.mask').addClass('active');
        $('.enlarge').addClass('active');
        $('.pimg-box').on('mousemove', (ev) => {
            let x = ev.offsetX - ($('.mask').width() / 2);
            let y = ev.offsetY - ($('.mask').height() / 2);
            if (x < 0) {
                x = 0;
            } else if (x > $('.pimg-box').width() - $('.mask').width()) {
                x = $('.pimg-box').width() - $('.mask').width();
            }
            if (y < 0) {
                y = 0;
            } else if (y > $('.pimg-box').height() - $('.mask').height()) {
                y = $('.pimg-box').height() - $('.mask').height();
            }
            $('.mask').css({ 'left': x+'px', 'top': y+'px' });
            $('.enlarge>img').css({'left':-x * 2 +'px','top':-y * 2+'px'});
        });
    },
    'mouseleave': () => {
        $('.mask').removeClass('active');
        $('.enlarge').removeClass('active');
    }
});
//店内分类
$('.fold').on('click',function(){
    $(this).toggleClass('icon-plus').addClass('icon-minus');
    if($(this).hasClass('icon-minus')){
        $(this).parent().parent().children(1).toggleClass('active');
    }
});
if(shop){
    $('#number').text(JSON.parse(shop).length);
}else{
    $('#number').text(0);
}
 if(cookie.get('username')){
     $('.in-up').html(`<a href="#">${cookie.get('username')}</a>`);
 }
 //模糊查询
 $('#search').on('input',function(){
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
            $('#search-btn').on('click',function(){
                let id = $('.search-helper').children('li:first')[0].title;
                location.href="../html/details.html?id="+id;
            });
            $('#search').on('keydown',function(ev){
                if(ev.keyCode == 13){
                    let id = $('.search-helper').children('li:first')[0].title;
                    location.href="../html/details.html?id="+id;
                }
            });
        }
    });
});
//数据动态渲染
let id = location.search.split('=')[1];
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: { id },
    dataType: "json",
    success: function (res) {
        let picture = JSON.parse(res.picture);
        $('.pimg-box>img')[0].src=picture[0].src;
        $('.enlarge>img')[0].src=picture[0].src;
        let tempimg=`<li class="spec-item">
        <img src="${picture[0].src}" alt="">
    </li>
    <li class="spec-item">
        <img src="${picture[1].src}" alt="">
    </li>
    <li class="spec-item">
        <img src="${picture[2].src}" alt="">
    </li>
    <li class="spec-item">
        <img src="${picture[3].src}" alt="">
    </li>
    <li class="spec-item">
        <img src="${picture[4].src}" alt="">
    </li>`;
        $('.spec-list').append(tempimg).find('.spec-item').on('mouseover',function(){
            $('.pimg-box>img')[0].src=$(this).children()[0].src;
            $('.enlarge>img')[0].src=$(this).children()[0].src;
            $(this).addClass('item-hover').siblings().removeClass('item-hover');
        });
        $('.spec-item:first').addClass('item-hover');
        $('.sku-name>p').html(res.title);
        $('.jd-price>.price>b').html(res.price+'.00');
        $('.desciption-box').html(`<img src=${res.details} alt="">`);

        let colortemp='',color='';
        JSON.parse(res.color).forEach(elm=>{
            colortemp+=`<li>${elm.color}</li>`;
        })
        $('#choose-color').html(colortemp).find('li').on('click',function(){
            $(this).addClass('clicked').siblings().removeClass('clicked');
            color=$(this).text();
        });

        let attrstemp='',attrs='';
        JSON.parse(res.attrs).forEach(elm=>{
            attrstemp+=`<li>${elm.attrs}</li>`;
        })
        $('#choose-attr1').html(attrstemp).find('li').on('click',function(){
            $(this).addClass('clicked').siblings().removeClass('clicked');
            attrs=$(this).text();
        });;

        let versiontemp='',version='';
        JSON.parse(res.version).forEach(elm=>{
            versiontemp+=`<li>${elm.attrs}</li>`;
        })
        $('#choose-attr2').html(versiontemp).find('li').on('click',function(){
            $(this).addClass('clicked').siblings().removeClass('clicked');
            version=$(this).text();
        });;
        //加入购物车，往cookie里添加数据
        $('.add-cart').on('click',function(){
            
            if(color === ''||attrs === ''||version ===''){
                alert('请选择好颜色和型号时再点击加入购物车');
            }else{
                addItem(res.id,color,attrs,version, $('#pieces').val());
                alert('商品已加入购物车');
                location.reload();
            }
        });
    }
});
function addItem(id, color,attrs,version,num) {
    let shop = cookie.get('shop');
    let product = {id,color,attrs,version,num};
    if (shop) {
        shop = JSON.parse(shop);
        // 判断当前的商品id在cookie数据中是否存在
        if (shop.some(el => el.id === id)) {
            shop.forEach(elm => {
                elm.id === id ? elm.num = num : null;
            });
        } else {
            shop.push(product);
        }
    } else { // 没有存cookie的情况
        shop = []; // 初始化成数组
        shop.push(product);
    }
    cookie.set('shop', JSON.stringify(shop), 1);
}
//增减数量
setInterval(function(){
    if(parseInt($('#pieces').val())===1){
        $('.btn-reduce').css({'cursor':'not-allowed','color':'#ccc'});
    }else{
        $('.btn-reduce').css({'cursor':'pointer','color':'black'});
    }
},100);
$('.btn-add').on('click',function(){
    $('#pieces').val(parseInt($('#pieces').val())+1);
});
$('.btn-reduce').on('click',function(){
    if(parseInt($('#pieces').val())===1){
        $(this).css({'cursor':'not-allowed','color':'#ccc'});
    }else{
        $(this).css({'cursor':'pointer','color':'black'});
    $('#pieces').val(parseInt($('#pieces').val())-1);
    }
});
