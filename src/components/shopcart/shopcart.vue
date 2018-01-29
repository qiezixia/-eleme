<template>
  <div class="shopCart">
    <div class="cart-wrapper">
        <div class="cart-msg" @click="showList()">
            <div class="cart-nomber" v-show="cartNumber > 0">{{cartNumber}}</div>
            <div class="cart-box">
                <div class="cart-inner" :class="{'active': cartNumber >0 }">
                   <span class="icon-shopping_cart"></span>
                </div>
            </div>
            <div class="total-ptice highlight">¥{{totalPrice}}</div>
            <div class="fee">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="start-price" :class="{'active': totalPrice > minPrice}">{{payText}}</div>
    </div>
    <transition name="fade">
        <div class="shopcart-list" v-if="showCartList">
            <div class="cartList-wrapper">
                <div class="list-header">
                    <div class="title">
                        <div class="name">购物车</div>
                        <div class="clear-cart" @click="emptyCart()">清空</div>
                    </div>
                </div>
                <div class="list-content" ref="cartWrapper">
                    <ul>
                        <li v-for="food in selectFoods">
                            <div class="goods-name">{{food.name}}</div>
                            <div class="goods-price">¥{{food.price}}</div>
                            <div class="goods-wrapper">
                                <cartControl :food="food"></cartControl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="list-bg" v-if="showCartList" @click="showList()"></div>
    </transition>
  </div>
</template>

<script>
import cartControl from '../cartControl/cartControl';
import BScroll from 'better-scroll';

export default {
    data() {
        return {
            showCartList:false
        }
    },
    props:['selectFoods', 'deliveryPrice', 'minPrice'],
    components:{
        cartControl
    },
    methods: {
        showList:function() {
            if(!this.totalPrice) {
                this.showCartList = false;
                return false;
            }
            this.showCartList = !this.showCartList;
            if(this.showCartList) {
                this.$nextTick( () => {
                    this._initScroll();
                })
            }else {
                this.cartScroll.refresh();
            }    
        },
        _initScroll:function() {
            this.cartScroll = new BScroll(this.$refs.cartWrapper, {
                click: true
            })
        },
        emptyCart:function() {
            this.selectFoods.forEach( (food) => {
               food.count = 0; 
            });
            this.showCartList = false;
        }
    },
    computed: {
        cartNumber() {
            let allNum = 0;
            this.selectFoods.forEach( (food) => {
                allNum += food.count;
            });
            return allNum;
        },
        payText() {
            let payText;
            if(this.totalPrice === 0) {
                payText = `¥${this.minPrice}起送`;
            }else if(this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                payText = `还差${diff}元起送`;
            }else {
                payText = "去结算";
            }
            return payText;
        },
        totalPrice() {
            let price = 0;
            this.selectFoods.forEach( (food) => {
                price += food.count * food.price;
            })
            return price;
        }
    }
}
</script>

<style lang="scss">
    .shopCart{
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 50;
        height: 0.96rem;
        .shopcart-list{
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            z-index: 40;
            transform:translate3d(0, -100%, 0);
            background: #fff;
            &.fade-enter-active, &.fade-leave-active {
                transition: all 0.5s;
                transform:translate3d(0, -100%, 0);
            }
            &.fade-enter, &.fade-leave-active {
                transform:translate3d(0, 0, 0);
            }
            .cartList-wrapper {
                max-height: 6.11rem;
                overflow: hidden;
                position: relative;
                z-index: 60;
                .list-content{
                    width: 100%;
                    overflow: hidden;
                    font-size: 0.28rem;
                    max-height: 5.31rem;
                    ul{
                        margin: 0;
                        padding: 0 0.36rem;
                        li{
                            height: 0.96rem;
                            border-bottom: 0.01rem solid rgba(1,17,27,0.1);
                            position: relative;
                            .goods-name{
                                font-size: 0.28rem;
                                color:rgb(7,17,27);
                                line-height: 0.48rem;
                                padding: 0.24rem 0;
                            }
                            .goods-price{
                                position: absolute;
                                right: 1.84rem;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                            .goods-wrapper{
                                z-index: 999999;
                                width: 1.6rem;
                                position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                height: 0.48rem;
                            }
                        }
                    }
                }
                .list-header{
                    width: 100%;
                    height: 0.8rem;
                    background: #f3f5f7;
                    .title{
                        display: flex;
                        justify-content: space-between;
                        padding:0 0.36rem;
                        line-height: 0.8rem;
                        .name{
                            font-size: 0.28rem;
                            color: rgb(7,17,27);
                        }
                        .clear-cart{
                            font-size: 0.24rem;
                            color: rgb(0,160,220);
                        }
                    }
                    
                }
            }
        }
        .list-bg{
            position:fixed;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            backdrop-filter: blur(0.1rem);
            -webkit-backdrop-filter: blur(0.1rem);
            opacity: 1;
            background: rgba(7, 17, 27, 0.6);
           &.fade-enter-active, &.fade-leave-active {
                opacity: 1;
                transition: all 0.5s;
                background: rgba(7, 17, 27, 0.6);
            }
            &.fade-enter, &.fade-leave-active {
                opacity: 0;
                background: rgba(7, 17, 27, 0);
            }
        }
        .cart-wrapper{
            width: 100%;
            height: 100%;
            display: inline-block;
            background: #141d27;
            display: flex;
            font-size: 0.32rem;
            position: relative;
            z-index: 60;
            .start-price{
                background: rgba(255,255,255,0.2);
                color: rgba(255,255,255, 0.4);
                font-size: 0.24rem;
                font-weight: 700;
                text-align: center;
                line-height: 1rem;
                &.active{
                    background: #00b43c;
                    color: #fff;
                }
            }
            .cart-msg{
                flex: 1;
                position: relative;
                padding: 0.24rem 0;
                font-size: 0;
                .cart-nomber{
                    position: absolute;
                    box-sizing: border-box;
                    z-index: 100;
                    width: 0.48rem;
                    padding: 0.02rem 0;
                    left: 0.88rem;
                    background: rgb(240,20,20);
                    color: #fff;
                    font-weight: 700;
                    font-size: 0.18rem;
                    line-height: 0.32rem;
                    text-align: center;
                    border-radius: 0.2rem;
                    top: -0.26rem;
                }
                .fee{
                    border-left: 0.01rem solid rgba(255,255,255,0.1);
                    margin-left: 0.24rem;
                    padding-left: 0.24rem;
                    font-size: 0.32rem;
                    color: rgba(255,255,255,0.4);
                    font-weight: 400;
                    line-height: 0.48rem;
                    display: inline-block;
                }
                .total-ptice{
                   font-size: 0.32rem;
                   color: rgba(255,255,255, 0.4);
                   font-weight: 700;
                   line-height: 0.48rem;
                   margin-left: 1.6rem;
                   display: inline-block;
                   &.highlight{
                       color: #fff;
                   }
                }
                .cart-box{
                    position: absolute;
                    width: 1rem;
                    height: 1rem;
                    background: #141d27;
                    border-radius: 50%;
                    top: -0.2rem;
                    left: 0.36rem;
                    overflow: hidden;
                    padding: 0.12rem;
                    box-sizing: border-box;
                    .cart-inner{
                       border-radius: 50%;
                        width: 100%;
                        height: 100%;
                        background: rgba(255,255,255,0.2);
                        text-align: center;
                        &.active{
                           background: rgb(0,160,220);
                           .icon-shopping_cart{
                               color: #fff;
                           }
                        }
                        .icon-shopping_cart{
                            line-height: 0.78rem;
                            font-size: 0.48rem;
                            color: rgba(255,255,255,0.4);
                        }
                    }
                }

            }
            .start-price{
                flex: 0 0 2.1rem;
            }
        }
    }
</style>
