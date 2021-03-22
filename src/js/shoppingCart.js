import { $ } from "./library/jquery.js";
import cookie from './library/cookie.js';
let shop = cookie.get('shop');
if(cookie.get('username')){
    $('.in-up').html(`<a href="#">${cookie.get('username')}</a>`);
}
if(shop){
    shop = JSON.parse(shop);
    let idlist = shop.map(elm => elm.id).join();
    $('.cart-empty').addClass('empty');
    $('.cart-box').removeClass('empty');
    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {idlist},
        dataType: "json",
        success:function (res) {
            let temp = '';
            res.forEach(elm => {
                let picture = JSON.parse(elm.picture);
                // 让ajax中获得的数据结果的id与cookie中的id 一一对应
                // 从购物车cookie数据中筛选当前遍历的数据
                let current = shop.filter(val => val.id == elm.id);
                temp += `<li class="cart-item ">
                <div class="i-checkbox">
                    <input type="checkbox" name="check-item" class="check-item" id="check-item-${elm.id}">
                </div>
                <div class="i-goods">
                    <div class="g-img">
                        <img src="${picture[0].src}" alt="">
                    </div>
                    <div class="g-msg">
                        ${elm.title}
                    </div>
                </div>
                <div class="i-attrs">
                    <div class="g-color">${current[0].color}</div>
                    <div class="g-attrs">${current[0].attrs + current[0].version}</div>
                </div>
                <div class="i-price">
                    <span>￥${elm.price}.00</span>
                </div>
                <div class="p-quantity">
                    <div class="g-number">
                        <button class="b-sub" id="sub-${elm.id}">-</button>
                        <input type="text" name="num" class="num" id="num-${elm.id}" min="1" max="200" value="${current[0].num}">
                        <button class="b-add" id="add-${elm.id}">+</button>
                    </div>
                    <p>有货</p>
                </div>
                <div class="p-sum">
                    <b class="g-sum" id="sum-${elm.id}">¥${elm.price * current[0].num}.00</b>
                </div>
                <div class="p-action">
                    <a href="" class="delete" data-id="${elm.id}">删除</a>
                </div>
            </li>`;
            });
           
            let subtotal ={};//小计对象
            //求和函数
            function total(obj){
                let total=0;
                for(let key in obj){
                    total+=obj[key];
                }
                $('.total-price').text('￥'+total+'.00'); 
            }
            //统计选中商品数量
            function number(){
                let num = Array.from($('.check-item')).filter(elm => elm.checked===true).length;
                $('.amount-sum').text(num);
            }
            
            $('.cart-list').append(temp).find('.delete').on('click', function() {
                let res = shop.filter(el => el.id != $(this).attr('data-id'));
                cookie.set('shop', JSON.stringify(res), 1); // 将id不为被点击元素id的剩余元素从新写入cookie
                location.reload();
            });
            $('.number').text(Array.from($('.check-item')).length);
            Array.from($('.g-sum')).forEach(elm =>{
                subtotal[elm.id]=0;
            });
            //删除选中的商品
            $('.checked-remove').on('click',function(){
                let res = Array.from($('.check-item')).filter(elm => elm.checked===true)
                .map(elm => elm.id.slice(-1));
                res.forEach(elm => {
                   let result= shop.filter(el => el.id != elm);
                   shop = result;
                   cookie.set('shop', JSON.stringify(result), 1);
                });
                location.reload();
            });
            //小计价格 跟随 数量变化
            $('.b-add').on('click', function(){
                let id = this.id.slice(-1);
                let num = $('#'+this.id).siblings('input');
                let sum = $('#'+this.id).parents('.p-quantity').siblings('.p-sum').find('.g-sum');
                let price = $('#'+this.id).parents('.p-quantity').siblings('.i-price').find('span').text().slice(1,-3);
                num.val(parseInt(num.val())+1);
                sum.text('￥'+num.val()*price+'.00');
                
                if($('#check-item-'+id)[0].checked){
                    subtotal['sum-'+id]=num.val()*price;
                    total(subtotal);
                }else{
                    subtotal['sum-'+id]=0;
                }
            });
            $('.b-sub').on('click', function(){
                let id = this.id.slice(-1);
                let num = $('#'+this.id).siblings('input');
                let sum = $('#'+this.id).parents('.p-quantity').siblings('.p-sum').find('.g-sum');
                let price = $('#'+this.id).parents('.p-quantity').siblings('.i-price').find('span').text().slice(1,-3);
                if(parseInt(num.val())===1){
                    $('#'+this.id).css({'cursor':'not-allowed','color':'#ccc'});
                }else{
                    $('#'+this.id).css({'cursor':'pointer','color':'black'});
                    num.val(parseInt(num.val())-1);
                }
                sum.text('￥'+num.val()*price+'.00');
                if($('#check-item-'+id)[0].checked){
                    subtotal['sum-'+id]=num.val()*price;
                    total(subtotal);
                }else{
                    subtotal['sum-'+id]=0;
                }
            });
            //全选
            $('#select-all').on('click',function(){
                if(this.checked){
                    $('.check-item').prop('checked',true);
                    Array.from($('.g-sum')).forEach(elm =>{
                        subtotal[elm.id]=parseInt(elm.textContent.slice(1,-3));
                    $('.cart-item').addClass('item-seleted');
                    });
                }else{
                    $('.check-item').prop('checked',false);
                    Array.from($('.g-sum')).forEach(elm =>{
                        subtotal[elm.id]=0;
                    });
                    $('.cart-item').removeClass('item-seleted');
                }
                total(subtotal);
                number();
            });
            //选中
            $('.check-item').on('click',function(){
                let flag = Array.from($('.check-item')).every(elm => elm.checked===true);
                let id = this.id.slice(-1);
                let sum = parseInt( $('#sum-'+id).text().slice(1,-3));
                if(flag){
                    $('#select-all').prop('checked',true);
                }else{
                    $('#select-all').prop('checked',false);
                }
                if(this.checked===true){
                    subtotal['sum-'+id]=sum;
                    $(this).parents('.cart-item').addClass('item-seleted')
                }else if(this.checked===false){
                    subtotal['sum-'+id]=0;
                    $(this).parents('.cart-item').removeClass('item-seleted')
                }
                total(subtotal);
                number();
            });
            
        }
    });
}else{
    $('.cart-empty').removeClass('empty');
    $('.cart-box').addClass('empty');
}