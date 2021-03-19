import { $ } from "./jquery.js"
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