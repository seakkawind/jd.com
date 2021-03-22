import { $ } from "./library/jquery.js"
$('.code-left').hover(function(){
    $(this).animate({left:0},300,'linear',function(){
        $('.code-right').css('display','block');
    });
},function(){
    $(this).animate({left:70});
    $('.code-right').css('display','none');
});
$('.btn-left').on('click',function(){
    $('.signin').addClass('active');
    $('.signin-code').removeClass('active');
    $(this).css('color','#e4393c');
    $('.btn-right').css('color','#999');
});
$('.btn-right').on('click',function(){
    $('.signin-code').addClass('active');
    $('.signin').removeClass('active');
    $(this).css('color','#e4393c');
    $('.btn-left').css('color','#999');
});

// $('.submit').on('submit',function(){
//     $.get("../../interface/signIn.php", {usrename:'',password:''},
//         function (data, textStatus, jqXHR) {
            
//         },
//         "dataType"
//     );
// });