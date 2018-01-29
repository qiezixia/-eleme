<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(menu,index) in goodsData"  
          :class="{'menuAvtive':currentIndex === index}"
          @click="selectMenu(index, $event)">
            <span>{{menu.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="food in goodsData" class="food-list-hook">
            <h1 class="title">{{food.name}}</h1>
          <ul class="child-foods">
            <li v-for="item in food.foods" class="food-item" @click="foodDetail(item, $event)">
              <div class="item-box">
                <div class="food-img">
                  <img :src="item.image">
                </div>
                <div class="msg">
                  <p class="name">{{item.name}}</p>
                  <p class="explain">{{item.description}}</p>
                  <p class="sale">月售{{item.sellCount}}份&nbsp;&nbsp;好评率{{item.rating}}%</p>
                  <p class="price">¥<b>{{item.price}}</b><span class="market-price" v-if="item.oldPrice">¥{{item.oldPrice}}</span></p>
                  <div class="cart-wrapper">
                    <cartControl :food="item"></cartControl>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          </li>
        </ul>
      </div>
    </div>
    <shopCart :select-foods="selectFoods" 
    :deliveryPrice="sellerData.deliveryPrice"
    :minPrice="sellerData.minPrice"
    ></shopCart>
    <food :food="chooseFood" ref="food"></food>
  </div>
</template>

<script>
import service from '../../axios/getData';
import BScroll from 'better-scroll';
import shopCart from '../shopcart/shopcart';
import cartControl from '../cartControl/cartControl';
import food from '../food/food';

export default {
  data() {
    return {
      goodsData:Array,
      sellerData:Array,
      listHeight:[],
      scrolly: 0,
      chooseFood: {}
    }
  },
  components:{
    shopCart,
    cartControl,
    food
  },
  created() {
    this.getGoods();
    this.getSeller();
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
          return i;
        }
      }
    },
    selectFoods() {
      let foods = [];
      this.goodsData.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count){
            foods.push(food); 
          }
        })
      });
      return foods;
    }
  },
  methods:{
    foodDetail(food, event) {
      if(!event._constructed) {
        return;
      }
      this.chooseFood = food;
      this.$refs.food.show();
    },
    selectMenu:function(index, event){
      if( !event._constructed) {
        // 去掉自带click事件的点击
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    _calculateHeight:function(){
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = -1;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    getGoods:function() {
      service.getGoods().then( res=> {
        this.goodsData = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        })
      })
    },
    getSeller:function() {
      service.getSeller().then( res=> {
        this.sellerData = res.data;
      })
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3,
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrolly = Math.abs(Math.round(pos.y));
      });
    }
  }
}
</script>

<style lang="scss">
  .goods{
    width: 100%;
    display: flex;
    overflow: hidden;
    position: absolute;
    top:3.49rem;
    bottom:0;
    .foods-wrapper{
      flex:1;
      ul{
        margin:0;
        padding: 0;
        width:100%;
        .food-item{
          padding:0 0.36rem;
          .item-box{
            width: 100%;
            border-bottom: 0.01rem solid rgba(7,17,27,0.1);
            display: flex;
            padding: 0.36rem 0;
            .msg{
              flex:1;
              font-size: 0.2rem;
              padding-left: 0.2rem;
              position: relative;
              .cart-wrapper{
                position: absolute;
                width: 100%;
                bottom: 0;
                right: 0;
                z-index: 999999;
              }
              .price{
                margin:0;
                padding: 0;
                margin-top:0.16rem;
                font-size: 0.2rem;
                color: rgb(240,20,20);
                line-height: 0.48rem; 
                b{
                  font-size: 0.28rem;
                }
                .market-price{
                  display: inline-block;
                  margin-left:0.16rem;
                  color: rgb(147,153,159);
                  font-size: 0.2rem;
                }
              }
              .explain{
                margin:0;
                padding: 0;
                min-height: 0.28rem;
                line-height: 0.28rem;
                font-size:0.2rem;
                color: rgb(147,153,159);
                margin-top: 0.16rem;
              }
              .sale{
                margin:0;
                padding: 0;
                height: 0.2rem;
                line-height: 0.2rem;
                font-size:0.2rem;
                color: rgb(147,153,159);
                margin-top: 0.16rem;
              }
              .name{
                margin:0;
                padding: 0;
                height: 0.28rem;
                line-height: 0.28rem;
                font-size: 0.28rem;
                margin-top: 0.04rem;
              }
            }
            .food-img{
              flex: 0 0 1.2rem; 
              img{
                width:1.2rem;
                height: 1.2rem;
              }
            }
          }
        }
        .title{
          margin:0;
          padding:0;
          width: 100%;
          height: 0.52rem;
          line-height: 0.52rem;
          font-size: 0.24rem;
          color: rgb(147,153,159);
          background: #f3f5f7;
          box-sizing: border-box;
          padding-left: 0.28rem;
          margin-top:-0.01rem;
          border-left: 0.04rem solid #d9dde1;
        }
      }
    }
    .menu-wrapper{
      flex:0 0 1.6rem;
      width:1.6rem;
      background: #f3f5f7;
      margin-top: 0.02rem;
      margin-bottom: 1rem;
      ul{
        margin:0;
        padding:0;
        margin-top: 0.02rem;
        li{
          flex:1;
          font-size:0.24rem;
          color:rgb(77,85,93);
          height: 1.08rem;
          width:100%;
          text-align: center;
          vertical-align: middle;
          position: relative;
          border-bottom: 0.01rem solid rgba(7,17,27,0.1);
          &.menuAvtive{
            background: #fff;
          }
          span{
            width:1.12rem;
            box-sizing: border-box;
            position: absolute;
	          top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: left;
          }
        }
      }
    }
    .foods-wrapper{
      flex:1;
    }
  }
</style>
