import { $ } from "./jquery.js"
$('.next').on('click',function(){
    $('.phone-info').addClass('active');
    $('.account-info').removeClass('active');
    $('.arrow:first').addClass('success');
    $('.step>li:eq(2)').addClass('success');
});
$('.btn-signup').on('click',function(event){
    $('.phone-info').removeClass('active');
    $('.signup').addClass('active');
    $('.end').removeClass('active');
    $('#suc-username').text($('#username').val());
    event.preventDefault();
});