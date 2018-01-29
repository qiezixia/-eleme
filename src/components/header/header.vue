<template>
  <div class="header" v-if="seller">
    <div class="content">
        <div class="blur" @click="close()">
            <img :src="seller.avatar"> 
        </div>
        <div class="container">
            <div class="goodsImg">
                <img :src="seller.avatar"> 
            </div>
            <div class="messageBox">
                <div class="title">{{seller.name}}</div>
                <div class="diriver">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div class="discountName" :class="classMap[seller.supports[0].type]">{{seller.supports[0].description}}</div>
                <div class="discountNum" @click="showAnnounce()">{{seller.supports.length}}个<span class="icon-keyboard_arrow_right"></span></div>
            </div>
        </div>
        <div class="announcement" @click="showAnnounce()">
            <div class="text">{{seller.bulletin}}</div>
            <div class="goDetail">
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
    </div>
    <transition name="bounce">
        <div class="announceDetal" v-if="showDetail">
            <div class="contentBox clearfix">
                <div class="bgBlur">&nbsp;</div>
                <div class="name">{{seller.name}}</div>
                <div class="start">
                    <start :score="seller.score" :starType="36"></start>
                </div>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <div class="favourable">
                    <p class="msg" v-for="item in seller.supports" :class="classMap[item.type]">{{item.description}}</p>
                </div>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <div class="announceNote">{{seller.bulletin}}</div>
            </div>
            <div class="closeAnnounce" @click="close()"><span class="icon-close"></span></div>
        </div>
    </transition>
  </div>
</template>

<script>
import start from '../start/start';

export default {
    props:{
        seller: {
            type: Object
        }
    },
    components:{
        start
    },
    data() {
        return{
            showDetail:false
        }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods:{
        showAnnounce:function() {
            this.showDetail = true;
        },
        close:function() {
            this.showDetail = false;
        },
    }

}
</script>

<style lang="scss">
    @import '../../common/style/style.scss';
    .header{
        width:100%;
        background:rgba(7,17,27,0.5);
        overflow: hidden;
        .announceDetal{
            position: fixed;
            width:100%;
            height: 100%;
            top:0;
            left: 0;
            z-index: 200;
            background: rgba(7,17,27,0.8); 
            color:#fff;
            overflow: auto;
            .contentBox{
                min-height: 100%;
                clear: both;
                box-sizing: border-box;
                padding-bottom:1.64rem;
            }
            .closeAnnounce{
                position: relative;
                width: 100%;
                text-align: center;
                font-size:0.64rem;
                height: 0.64rem;
                line-height: 0.64rem;
                color:rgba(255,255,255,0.5);
                margin-top:-1.64rem;
                // height: 0.64rem;
                clear: both; 
            }
            .announceNote{
                margin-top:0.48rem;
                font-size:0.24rem;
                line-height: 0.48rem;
                text-align: left;
                padding:0 0.72rem;
                padding-bottom:0.2rem;
            }
            .favourable{
                margin-top:0.48rem;
                text-align:left;
                padding:0 0.72rem;
                .msg{
                    margin:0;
                    padding:0;
                    font-size:0.24rem;
                    height: 0.32rem;
                    margin-top:0.24rem;
                    padding: 0.04rem 0 0.04rem 0.44rem;
                    &.decrease{
                        background: url(../../images/decrease_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden; 
                    }
                    &.discount{
                        background: url(../../images/discount_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                    &.special{
                        background: url(../../images/special_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                    &.invoice{
                        background: url(../../images/invoice_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                    &.guarantee{
                        background: url(../../images/guarantee_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                }
            }
            .title{
                margin-top:0.56rem;
                padding:0 0.72rem;
                height: 0.28rem;
                line-height: 0.28rem;
                font-size:0.28rem;
                font-weight: 700;
                display: flex;
                .line{
                    flex:1;
                    border-top:0.02rem solid rgba(255,255,255,0.2);
                    margin-top:0.12rem;
                }
                .text{
                    flex: 0 0 auto;
                    padding:0 0.24rem;
                }
            }
            .name{
                width:100%;
                height: 0.32rem;
                line-height: 0.32rem;
                font-size:0.32rem;
                font-weight: 700;
                text-align: center;
                margin-top:1.28rem;
                margin-bottom:0.32rem;
            }
            .start{
                height: 0.48rem;
                line-height: 0.48rem;
                text-align: center;
                font-size: 0.36rem;
            }
            .bgBlur{
                position: absolute;
                width:100%;
                height: 100%;
                top:0;
                left: 0;
                filter: blur(0.1rem);
            }
        }
        .bounce-enter-active {
            animation: bounce-in .5s;
        }
        .bounce-leave-active {
            animation: bounce-out .5s;
        }
        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes bounce-out {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(0);
            }
        }
        .blur{
            position: absolute;
            left: 0;
            top:0;
            width:100%;
            height: 100%;
            -webkit-filter: blur(0.1rem); /* Chrome, Opera */
            -moz-filter: blur(0.1rem);
            -ms-filter: blur(0.1rem);    
            filter: blur(0.1rem); 
            z-index: -1;
            img{
                width:100%;
                height: 100%;
            }
        }
        .announcement{
            height: 0.56rem;
            line-height: 0.56rem;
            display: inline-block;
            padding:0 0.24rem;
            text-align: left;
            font-size:0.2rem;
            color: #fff;
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            background:rgba(7,17,27,0.2);
            .text{
               flex:1; 
               height: 0.56rem;
               background: url(../../images/bulletin@3x.png) no-repeat left center;
               background-size:0.48rem auto;
               padding-left:0.64rem;
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: nowrap;
            }
            .goDetail{
               flex:0 0 0.26rem; 
               text-align: right;
               .icon-keyboard_arrow_right{
                   font-size: 0.3rem;
                   vertical-align: middle;
               }
            }

        }
        .container{
            z-index:100;  
            color:#fff;  
            display: flex;
            padding:0.48rem 0.48rem 0.36rem 0.48rem;
            font-size:0;
            .goodsImg{
                flex:0 0 1.28rem;
                img{
                    width:1.28rem;
                    height: 1.28rem;
                    overflow: hidden;
                    border-radius: 0.04rem;
                }
            }
            .messageBox{
                flex:1;
                text-align: left;
                padding-left:0.32rem;
                position:relative;
                .discountNum{
                    position: absolute;
                    right: 0;
                    bottom:0;
                    height: 0.48rem;
                    width: 0.8rem;
                    text-align:center;
                    line-height: 0.48rem;
                    color:#fff;
                    background: rgba(0,0,0,0.2);
                    font-size:0.2rem;
                    border-radius: 0.24rem;
                }
                .title{
                    height: 0.32rem;
                    line-height:0.32rem;
                    font-size:0.32rem;
                    font-weight: bold;
                    margin-top:0.04rem;
                    background: url(../../images/brand@3x.png) no-repeat left center;
                    background-size:0.6rem auto;
                    padding-left:0.72rem;
                }
                .diriver{
                    height:0 .24rem;
                    line-height: 0.24rem;
                    font-size: 0.24rem;
                    margin-top:0.16rem;
                }
                .discountName{
                    // height: 0.24rem;
                    // line-height: 0.24rem;
                    font-size:0.2rem;
                    margin-top:0.2rem;
                    padding-left:0.34rem;
                    &.decrease{
                        background: url(../../images/decrease_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden; 
                    }
                    &.discount{
                        background: url(../../images/discount_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                    &.special{
                        background: url(../../images/special_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                    &.invoice{
                        background: url(../../images/invoice_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                    &.guarantee{
                        background: url(../../images/guarantee_2@3x.png) no-repeat left center;
                        background-size:0.26rem auto;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
