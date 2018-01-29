<template>
  <div class="rating" ref="ratingWrapper">
    <div>
      <div class="whole">
        <div class="whole-left">
          <div class="left-content">
            <p class="score">{{seller.score}}</p>
            <p class="score-text">综合品分</p>
            <p class="decoration">高于周边商家{{seller.rankRate}}%</p>
          </div>
        </div>
        <div class="whole-right">
          <p class="service-status">
            服务态度
            <span class="right-start">
              <start :score="seller.serviceScore" :starType="30"></start>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </p>
          <p class="service-status reviews">
            商品评价
            <span class="right-start">
              <start :score="seller.foodScore" :starType="30"></start>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </p>
          <p class="deriveryTime">送达时间
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
      <div class="line"></div>
      <ratingSelect @filterEvaluate="changeEvaluate" :select-type="selectType" :only-content="onlyContent"></ratingSelect>
      <div class="ecaluate-wrapper">
        <div class="content">
          <div class="content-list" v-for="item in ratingList" v-show="needShow(item.rateType, item.text)">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="message-box">
              <div class="title">
                <div class="nick">{{item.username}}</div>
                <div class="date">{{item.rateTime | formatDate}}</div>
              </div>
              <div class="score">
                <span class="start-box">
                  <start :score="item.score" :starType="24"></start>
                </span>
                <span class="derivery" v-if="item.deliveryTime">{{item.deliveryTime}}分钟</span>
              </div>
              <div class="text">{{item.text}}</div>
              <div class="zan" v-show="item.recommend.length">
                <!-- <span class="icon-thumb_down"></span> -->
                <span class="icon-thumb_up"></span>
                <span class="recommandGood" v-for="recom in item.recommend">{{recom}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import start from '../start/start';
import ratingSelect from '../ratingselect/ratingselect';
import service from '../../axios/getData';
import BScroll from 'better-scroll';
import {formatDate} from '../../common/filter/date';

const ALL = 2;

export default {
  props:['seller'],
   components:{
     start,
     ratingSelect,
   },
   data() {
     return {
       ratingList:Array,
       tempData:Array,
       selectType: ALL,
       onlyContent: true
     }
   },
   filters:{
     formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
     }
   },
   created:function() {
     this.getRating();
   },
   methods: {
     changeEvaluate:function(type, data) {
       this[type] = data;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
     },
     _initScroll() {
      this.ratingScroll = new BScroll(this.$refs.ratingWrapper, {
        click: true
      });
    },
    getRating() {
      service.getRating().then( res=> {
        this.ratingList = res.data;
        this.tempData = res.data;
        this.$nextTick( ()=> {
          this._initScroll();
        })
      })
    },
    needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
   }
}
</script>

<style lang="scss">
  .rating{
      max-height: 100%;
      background: #fff;
      width: 100%;
      margin:0;
      padding:0 ;
      overflow: hidden;
      .content {
        margin: 0;
        padding: 0;
        padding:0 0.36rem;
        overflow: hidden;
        padding-bottom: 5rem;
        .content-list{
          padding:0.36rem 0;
          border-top: 0.01rem solid rgba(1,17,27,.1);
          display: flex;
          align-items: flex-start;
          .message-box{
            flex: 1;
            padding-left: 0.24rem;
            overflow: hidden;
            .zan{
              width: 100%;
              line-height: 0;
              margin-top: 0.16rem;
              font-size:0;
              .icon-thumb_down,.icon-thumb_up{
                font-size: 0.24rem;
                color: rgb(0, 160, 220);
                line-height: 0.32rem;
                margin-right: 0.16rem;
                margin-bottom: 0.12rem;
              }
              .recommandGood{
                font-size:.18rem;
                color: rgb(147, 153, 159);
                line-height: 0.32rem;
                display: inline-block;
                border: 1px solid rgba(1,17,27,.1);
                border-radius:  0.02rem;
                padding: 0 0.12rem;
                vertical-align: center;
                margin-right: 0.16rem;
                margin-bottom: 0.12rem;
              }
            }
            .text{
              width: 100%;
              overflow: hidden;
              font-size: .24rem;
              color: rgb(7,17,27);
              line-height: 0.36rem;
              margin-top: 0.12rem;
            }
            .score{
              width: 100%;
              overflow: hidden;
              margin-top: 0.08rem;
              font-size: 0;
              line-height: 0;
              .start-box{
                position: relative;
                display: inline-block;
                vertical-align: middle;
              }
              .derivery{
                display: inline-block;
                margin-left: 0.12rem;
                vertical-align: middle;
                height: 0.24rem;
                line-height: 0.24rem;
                font-size: 0.2rem;
                color: rgb(147,153,159);
              }
            }
            .title{
              width: 100%;
              overflow: hidden;
              .date{
                display: inline-block;
                text-align: right;
                font-size: 0.2rem;
                height: 0.24rem;
                line-height: 0.24rem;
                color: rgb(147,153,159);
                float: right;
              }
              .nick{
                height: 0.24rem;
                line-height: 0.24rem;
                font-size: 0.2rem;
                color:rgb(7,17,27);
                display: inline-block;
                float: left;
              }
            }
          }
          .avatar{
            flex: 0 0 0.56rem;
            border-radius: 50%;
            line-height: 0;
            img{
              border-radius: 50%;
              width: 0.56rem;
              height: 0.56rem;
            }
          }
        }
      }
      .ecaluate-wrapper{
        width: 100%;
      }
      .line{
        width: 100%;
        height: 0.36rem;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(1,17,27,.1);
        background: #f3f5f7;
      }
      .whole{
        margin:0;
        padding:0;
        font-size: 0.26rem;
        display: flex;
        .whole-right{
          flex:1;
          padding: 0.36rem 0.48rem;
          p{
            margin: 0;
            padding: 0;
          }
          .reviews{
            margin-top: 0.2rem;
          }
          .deriveryTime{
            font-size: 0.24rem;
            color: rgb(7,17,27);
            margin-top: 0.2rem;
            .time{
              color: rgb(147,153,159);
              margin-left: 0.24rem;
            }
          }
          .service-status{
            font-size: 0.24rem;
            color: rgb(7,17,27);
            line-height: 0.36rem;
            height: 0.36rem;
            .right-start{
              display: inline-block;
              vertical-align: top;
              margin:0 0.24rem;
            }
            .score{
              display: inline-block;
              vertical-align: middle;
              font-size: 0.24rem;
              color: rgb(255,153,0);
              font-weight: 500;
            }
          }
        }
        .whole-left{
          flex:0 0 2.75rem;
          padding: 0.36rem 0;
          overflow: hidden;
          .left-content{
            width: 100%;
            height: 100%;
            border-right: 0.01rem solid rgba(7,17,27, 0.1);
            text-align: center;
            p{
              margin: 0;
              padding: 0;
            }
            .decoration{
              font-size: 0.2rem;
              color: #93999f;
              line-height: 0.2rem;
              margin-top: 0.16rem;
              margin-bottom: 0.12rem;
            }
            .score-text{
              font-size: 0.24rem;
              color: rgb(7,17,27);
              line-height: 0.36rem;
              margin-top: 0.12rem;
            }
            .score{
              line-height: 0.56rem;
              color: rgb(255,153,0);
              font-size: 0.48rem;
              font-weight: 500;
            }
          }
        }
      }
  }
</style>
