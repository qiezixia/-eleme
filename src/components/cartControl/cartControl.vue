<template>
  <div class="cartControl">
    <transition name="fade">
        <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart()">
            <transition name="inner">
                <span class="decrease icon-remove_circle_outline"></span>
            </transition>
        </div>
    </transition>
     <span class="number" v-if="food.count > 0">{{food.count}}</span>
     <span class="increase icon-add_circle" @click.stop.prevent="addCart($event)"></span>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
    props: ['food'],
    methods: {
        addCart:function(event) {
            if(!event._constructed) {
                return;
            }
            if(!this.food.count) {
                Vue.set(this.food, 'count', 1);
            }else {
                this.food.count++;
            }
        },
        decreaseCart:function() {
            if(!event._constructed) {
                return;
            }
            this.food.count--;
        }
    }

}
</script>

<style lang="scss">
    .cartControl{
        font-size: 0;
        text-align: right;
        .cart-decrease{
            display: inline-block;
            &.fade-enter-active, &.fade-leave-active {
                transition: all 0.4s linear;
            }
            &.fade-enter, &.fade-leave-active {
                opacity: 0;
                transform: translate3d(0.24rem, 0, 0);
            }
        }
        .decrease{
            &.inner-enter-active, &.inner-leave-active{
                transition: all 0.4s linear;
                transform: rotate(0);
            }
            &.inner-enter, &.inner-leave-active {
                opacity: 0;
                transform: rotate(180deg);
            }
        }
        .decrease,.increase{
            font-size: 0.48rem;
            color: rgb(0,160,220);
            line-height: 0.48rem;
            display: inline-block;
            vertical-align: middle;
        }
        .number{
            display: inline-block;
            width: 0.48rem;
            font-size: 0.2rem;
            line-height: 0.48rem;
            color: rgb(147,153,159);
            vertical-align: middle;
            text-align: center;
        }
    }
</style>
