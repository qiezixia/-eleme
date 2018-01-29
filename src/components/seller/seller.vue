<template>
  <div class="seller" ref="sellerWrapper">
    <div>
      <div class="seller-msg-box">
        <div class="title">
          <div class="seller-name">{{seller.name}}</div>
          <p class="small-box">
            <span class="start">
              <start :score="seller.score" :starType="30"></start>
            </span>
            <span class="number">(661)</span>
            <span class="monSellerNum">月售{{seller.sellCount}}单</span>
          </p>
        </div>
        <div class="entirety">
          <div class="entirety-item right-border">
            <p class="note">起送价</p>
            <p class="price">{{seller.minPrice}}<i>元</i></p>
          </div>
          <div class="entirety-item right-border">
            <p class="note">商家配送</p>
            <p class="price">{{seller.deliveryPrice}}<i>元</i></p>
          </div>
          <div class="entirety-item">
            <p class="note">平均配送时间</p>
            <p class="price">{{seller.deliveryTime}}<i>分钟</i></p>
          </div>
        </div>
      </div>
      <div class="spilt"></div>
      <div class="favourable">
        <div class="name">公告活动</div>
        <div class="descoration">{{seller.bulletin}}</div>
        <ul class="favour-list">
          <li :class="classMap[supports.type]" v-for="supports in seller.supports">在线支付满28减5</li>
        </ul>
        <div class="spilt"></div>
        <div class="outdoor">
          <div class="text">商家实景</div>
          <div class="outImg-box" ref="picWrapper">
            <ul class="outdoor-img" ref="picList">
              <li v-for="pic in seller.pics">
                <img :src="pic">
              </li>
            </ul>
          </div>
        </div>
         <div class="spilt"></div>
        <div class="seller-message">
          <div class="text">商家信息</div>
          <ul>
            <li v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import start from '../start/start';
import BScroll from 'better-scroll';

export default {
  components:{
     start,
   },
   props:['seller'],
   created() {
     if (!this.picScroll) {
        if (this.seller.pics) {
          this.$nextTick(() => {
            let picWidth = 240;
            let margin = 12;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$refs.picList.style.width = width / 100 + 'rem';
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      } else {
        this.picScroll.refresh();
      }
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$el, {click: true});
        });
      } else {
        this.scroll.refresh();
      }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   },
}
</script>

<style lang="scss">
    .seller{
      width:100%;
      overflow: hidden;
      position: absolute;
      top: 3.49rem;
      bottom: 0;
      .spilt{
          width: 100%;
          height: 0.36rem;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          border-bottom: 1px solid rgba(1, 17, 27, 0.1);
          background: #f3f5f7;
      }
      .favourable{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        .seller-message{
          padding:0 0.36rem;
          .text{
            height: 0.28rem;
            line-height: 0.28rem;
            font-size: 0.28rem;
            color: rgb(7, 17, 27);
            padding-top: 0.36rem;
            margin-bottom: 0.24rem;
          }
          ul{
              margin:0;
              padding:0;
              li{
                width:100%;
                border-top: 0.01rem solid rgba(1, 17, 27, 0.1);
                font-size:0.24rem;
                line-height: 0.32rem;
                padding: 0.32rem 0.24rem;
                color: rgb(7, 17, 27);
                font-weight: 200;
                &:last-child{
                  border-bottom: 0.01rem solid rgba(1, 17, 27, 0.1);
                }
              }
            }
        }
        .outdoor{
          padding: 0.36rem 0 0.36rem 0.36rem;
          .text{
            font-size: 0.28rem;
            height: 0.28rem;
            line-height: 0.28rem;
            color: rgb(7, 17, 27);
            margin-bottom: 0.24rem;
          }
          .outImg-box{
            width: 100%;
            height: 1.88rem;
            white-space:nowrap;
          }
          .outdoor-img{
            margin:0;
            padding: 0;
            list-style:none;
            overflow-y: scroll;
            li{
              width: 2.48rem;
              height: 1.88rem;
              margin-right: 0.12rem;
              display:inline-block;
              img{
                display: block;
                width: 2.48rem;
                height: 1.88rem;
                margin-right: 0.12rem;
              }
            }
          }
        }
        .favour-list{
          width: 100%;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          line-height: 0;
          font-size: 0;
          margin-top: 0.32rem;
          padding:0 0.36rem;
          li{
            font-size: 0.24rem;
            line-height: 0.32em;
            padding: 0.32rem 0.24rem 0.32rem 0.68rem;
            border-top: 1px solid rgba(7, 17, 27,0.1);
            &.decrease{
              background: url(./decrease_4@3x.png) no-repeat 0.24rem center;
              background-size: 0.32rem 0.32rem;
            }
            &.discount{
              background: url(./discount_4@3x.png) no-repeat 0.24rem center;
              background-size: 0.32rem 0.32rem;
            }
            &.guarantee{
              background: url(./guarantee_4@3x.png) no-repeat 0.24rem center;
              background-size: 0.32rem 0.32rem;
            }
            &.invoice{
              background: url(./invoice_4@3x.png) no-repeat 0.24rem center;
              background-size: 0.32rem 0.32rem;
            }
            &.special{
              background: url(./special_4@3x.png) no-repeat 0.24rem center;
              background-size: 0.32rem 0.32rem;
            }
          }
        }
        .descoration{
          font-size: 0.24rem;
          font-weight: 200;
          color: rgb(240,20,20);
          line-height: 0.48rem;
          margin-top: 0.16rem;
          padding:0 0.6rem;
        }
        .name{
          height: 0.28rem;
          line-height: 0.28rem;
          font-size: 0.28rem;
          color: rgb(7, 17, 27);
          padding: 0.36rem 0.36rem 0 0.36rem;
        }
      }
      .seller-msg-box{
        overflow: hidden;
        padding:0 0.36rem;
        line-height: 0;
        .right-border{
          border-right: 1px solid rgba(1, 17, 27, 0.1);
        }
        .entirety{
          display: flex;
          justify-content:center; 
          font-size: 0.2rem;
          overflow: hidden;
          border-top: 1px solid rgba(7,17,27,0.1);
          padding: 0.36rem 0;
          .entirety-item{
            flex:1;
            text-align: center;
            p{
              margin:0;
              padding:0;
            }
            .note{
              font-size: 0.2rem;
              color: rgb(147, 153, 159);
              height: 0.2rem;
              line-height: 0.2rem;
              margin-bottom: 0.08rem;
            }
            .price{
              font-size: 0.48rem;
              font-weight: 200;
              color: rgb(7, 17, 27);
              height: 0.48rem;
              line-height: 0.48rem;
              i{
                font-style: normal;
                font-size: 0.2rem;
              }
            }
          }

        }
        .title{
          width: 100%;
          overflow: hidden;
          position: relative;
          margin-top: 0.36rem;
          .small-box{
            font-size:0;
            line-height: 0;
            margin-top: 0.16rem;
            margin-bottom: 0.28rem;
            .monSellerNum{
              display: inline-block;
              font-size: 0.2rem;
              color: rgb(77,85,93);
              line-height: 0.36rem;
            }
            .number{
              font-size: 0.2rem;
              color: rgb(77,85,93);
              line-height: 0.36rem;
              display: inline-block;
              margin:0 0.24rem 0 0.16rem;
            }
            .start{
              display: inline-block;
              width: 1.55rem;
              vertical-align: middle;
              line-height: 0.36rem;
              position:inherit;
            }
          }
          .seller-name{
            font-size:0.28rem;
            color: rgb(7,17,27);
            line-height: 0.28rem;
          }
        }
      }
    }
</style>
