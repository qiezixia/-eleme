<template>
    <transition name="fade">
        <div v-show="showFlag" class="food">
            <div class="food-content">
                <div class="avatar">
                    <img :src="food.image">
                    <div class="goBack" @click="goBack()"><span class="icon-arrow_lift"></span></div>
                </div>
                <div class="title">
                    <p class="name">{{food.name}}</p>
                    <p class="score">{{food.sellCount}}<span class="rating">{{food.rating}}%</span></p>
                    <div class="price-box">
                        <div class="price">
                            <span class="smallSize">¥</span>{{food.price}}
                            <span class="smallPrice" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                        </div>
                        <transition name="buy">
                            <div @click.stop.prevent="addCart($event)" class="cart" v-show="!food.count || food.count===0">加入购物车</div>
                        </transition>
                        <div class="addCart">
                            <cartControl :food="food"></cartControl>
                        </div>    
                    </div>
                </div>
                <div class="spilt"></div>
                <div class="decoration" v-show="food.info">
                    <h3 class="titlepro">商品介绍</h3>
                    <div class="detailDeco">{{food.info}}</div>
                </div>
                <div class="spilt" v-show="food.info"></div>
                <ratingSelect @filterEvaluate="changeEvaluate" :select-type="selectType" :only-content="onlyContent"></ratingSelect> 
                <div class="rating-box">
                    <div class="tating-list" v-for="rating in food.ratings" >
                        <div class="list-header">
                            <div class="rateTime">{{rating.rateTime | formatDate}}</div>
                            <div>
                                <span class="userName">{{rating.username}}</span>
                                <span class="userAvatar">
                                    <img :src="rating.avatar">
                                </span>
                            </div>
                        </div>
                        <div class="list-msg">{{rating.text}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import cartControl from '../cartControl/cartControl';
import BScroll from 'better-scroll';
import Vue from 'vue';
import ratingSelect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/filter/date';

export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
        cartControl,
        ratingSelect
    },
    data() {
        return {
            showFlag: false,
            selectType: 2,
            onlyContent: true,
        }
    },
    filters:{
     formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
     }
   },
    methods: {
        show() {
            console.log(this.food);
            this.showFlag = true;
            this.$nextTick(() => {
             if (!this.scroll) {
                    this.scroll = new BScroll(this.$el, {
                    click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        goBack() {
            this.showFlag = false;
        },
        addCart(event) {
            if (!event._constructed) {
                return;
            }
            Vue.set(this.food, 'count', 1); 
        },
        changeEvaluate(type, data) {
            console.log(data, type);
        }
    }
  
}
</script>

<style lang="scss">
    @import 'food.scss';
</style>
