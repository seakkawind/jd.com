import { $ } from "./library/jquery.js";
import cookie from './library/cookie.js';
$('.next').on('click',function(){
    $('.phone-info').addClass('active');
    $('.account-info').removeClass('active');
    $('.arrow:first').addClass('success');
    $('.step>li:eq(2)').addClass('success');
});
// $('.btn-signup').on('click',function(){
//     console.log($('#username').val(),$('#password').val())
//     $.ajax({
//         type: "get",
//         url: "../../interface/signUp.php",
//         data: {username:$('#username').val(),password:$('#password').val()},
//         dataType: "dataType",
//         success: function (response) {
//             console.log(response)
//         }
//     });
//     // $('.phone-info').removeClass('active');
//     // $('.signup').addClass('active');
//     // $('.end').removeClass('active');
//     // $('#suc-username').text($('#username').val());

// });
$('#suc-username').text(cookie.get('username'));