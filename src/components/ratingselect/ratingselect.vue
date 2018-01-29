<template>
  <div class="ratingselect">
      <div class="selectBtn">
          <div class="all" @click="select(2)" :class="{'active': selectType==2}">全部<i class="normal">56</i></div>
          <div class="recommend" @click="select(0)" :class="{'active': selectType==0}">推荐<i>46</i></div>
          <div class="bad" @click="select(1)" :class="{'active': selectType==1}">吐槽<i>5</i></div>
      </div>
      <div class="selectContentBtn" @click="selectContent()">
          <span class="icon-check_circle" :class="{'active':onlyContent}"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const ALL = 0;
export default {
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
    },
    methods: {
        select:function(type) {
            this.selectType = type;
            this.$emit('filterEvaluate', 'selectType', type);
        },
        selectContent:function() {
            this.onlyContent = !this.onlyContent;
            this.$emit('filterEvaluate', 'onlyContent', this.onlyContent);
        }
    }
};
</script>

<style lang="scss">
.ratingselect {
  width: 100%;
  padding: 0.36rem 0.36rem 0 0.36rem;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
  .selectContentBtn {
    width: 100%;
    overflow: hidden;
    border-top: 0.01rem solid rgba(7, 17, 27, 0.1);
    padding: 0.24rem 0;
    margin: 0;
    font-size: 0;
    .icon-check_circle {
      font-size: 0.48rem;
      vertical-align: middle;
      color: rgb(147, 153, 159);
      &.active{
          color: #00c850;
      }
    }
    .text {
      font-size: 0.24rem;
      vertical-align: middle;
      color: rgb(147, 153, 159);
      margin-left: 0.08rem;
    }
  }
  .selectBtn {
    width: 100%;
    font-size: 0;
    margin-bottom: 0.36rem;
    i{
        font-style: normal;
        font-size: 0.16rem;
    }
    .all {
      display: inline-block;
      font-size: 0.24rem;
      color: #4d555d;
      background: rgba(0, 160, 220, 0.2);
      padding: 0.16rem 0.24rem;
      border-radius: 0.02rem;
      &.active {
        background: rgb(0, 160, 220);
        color: #fff;
      }
    }
    .recommend {
      display: inline-block;
      font-size: 0.24rem;
      color: #4d555d;
      background: rgba(0, 160, 220, 0.2);
      padding: 0.16rem 0.24rem;
      margin: 0 0.16rem;
      border-radius: 0.02rem;
      &.active {
        background: rgb(0, 160, 220);
        color: #fff;
      }
    }
    .bad {
      display: inline-block;
      font-size: 0.24rem;
      padding: 0.16rem 0.24rem;
      color: #4d555d;
      background: rgba(77, 85, 93, 0.2);
      border-radius: 0.02rem;
      &.active {
        color: #fff;
        background: #4d555d;
      }
    }
  }
}
</style>
