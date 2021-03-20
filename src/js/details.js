import { $ } from "./library/jquery.js"
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
//数据动态渲染
let id = location.search.split('=')[1];
console.log(id);
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: { id },
    dataType: "json",
    success: function (res) {
        console.log(res)
        let picture = JSON.parse(res.picture);
        $('.pimg-box>img')[0].src=picture[0].src;
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
        });
        $('.sku-name>p').html(res.title);
        $('.jd-price>.price>b').html(res.price+'.00');
        $('.desciption-box').html(`<img src=${res.details} alt="">`);
        let colortemp='';
        JSON.parse(res.color).forEach(elm=>{
            colortemp+=`<li>${elm.color}</li>`;
        })
        $('#choose-color').html(colortemp).find('li').on('click',function(){
            $(this).addClass('clicked').siblings().removeClass('clicked');
        });

        let attrstemp='';
        JSON.parse(res.attrs).forEach(elm=>{
            attrstemp+=`<li>${elm.attrs}</li>`;
        })
        $('#choose-attr1').html(attrstemp).find('li').on('click',function(){
            $(this).addClass('clicked').siblings().removeClass('clicked');
        });;

        let versiontemp='';
        JSON.parse(res.version).forEach(elm=>{
            versiontemp+=`<li>${elm.attrs}</li>`;
        })
        $('#choose-attr2').html(versiontemp).find('li').on('click',function(){
            $(this).addClass('clicked').siblings().removeClass('clicked');
        });;
    }
});
//增减数量

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