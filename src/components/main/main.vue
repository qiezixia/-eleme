<template>
    <div class="main">
        <eleme-header :seller="seller"></eleme-header>
        <div class="tab">
            <div class="tab-item">
                <router-link v-bind:to="'/goods'" replace active-class="active">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link v-bind:to="'/rating'" active-class="active">评价</router-link>
            </div>
            <div class="tab-item">
                <router-link v-bind:to="'/seller'" active-class="active">商家</router-link>
            </div>
        </div>
        <div class="content-box">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import service from '../../axios/getData';
import elemeHeader from '../header/header';
export default {
    data() {
        return {
            seller:{}
        }
    },
    components:{
        elemeHeader
    },
    created:function(){
        this.getSeller();
    },
    methods:{
        getSeller:function() {
            service.getSeller().then( res=> {
                console.log(res);
                this.seller = res.data;
            })
        }
    }
}
</script>


<style lang="scss">
    .main{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      overflow: hidden;
      .content-box{
          height: 100%;
          background: #fff;
      }
      .tab{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size:0.28rem;
          background: #fff;
          display: flex;
          border-bottom:1px solid rgba(7,17,27,0.1);
          .tab-item{
              flex:1;
              text-align: center;
              a{
                    display: inline-block;
                    width:100%;
                    height: 100%;
                    text-decoration: none;
                    color:rgb(77,85,93);
                    &.active{
                        color:rgb(240, 20, 20);
                    }
              }
          }
      }
    }
</style>