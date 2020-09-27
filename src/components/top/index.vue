<template>
  <div class="top">
    <div class="content-wrapper">
      <div class="avater">
        <img width="64" height="64" :src="sellers.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ sellers.name }}</span>
        </div>
        <div class="description">
          {{ sellers.description }}/{{ sellers.deliveryTime }}分钟送达
        </div>
        <div v-if="sellers.supports" class="support">
          <span class="icon" :class="classMap[sellers.supports[0].type]"></span>
          <span class="text">{{ sellers.supports[0].description }}</span>
        </div>
      </div>
      <div
        v-if="sellers.supports"
        class="support-count"
        @click="() => (detailShow = true)"
      >
        <span class="count">{{ sellers.supports.length }}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="() => (detailShow = true)">
      <span class="bulletin-title"></span
      ><span class="bulletin-text">{{ sellers.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="sellers.avatar" />
    </div>
    <Detail
      v-show="detailShow"
      :data="sellers"
      @close-detail="closeDetail"
    ></Detail>
  </div>
</template>
<script>
import Detail from "components/detail";
// import Star from "components/star";

const classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
export default {
  name: "top",
  data() {
    return {
      classMap: classMap,
      detailShow: false
    };
  },
  components: { Detail },
  props: {
    sellers: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    closeDetail() {
      this.detailShow = false;
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl';
.top
  position: relative
  color: #fff
  background: rgba(7,17,27,0.5)
  overflow: hidden
  .content-wrapper
    display: flex
    position: relative
    .avater
      padding: 24px 16px 18px 24px
      img
        border-radius: 4px
    .content
      padding: 24px 12px 24px 0
      .title
        .brand // 背景图
          display: inline-block
          width: 30px
          height: 18px
          bg-image('./brand')
          background-size: 100%
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
        margin-top: 8px
      .support
        margin-bottom: 2px;
        line-height: 12px;
        .icon
          display: inline-block
          width: 12px
          height: 12px
          background-size: 100%
          background-repeat: no-repeat
          vertical-align: middle
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size: 10px
    .support-count
      padding: 0 8px
      font-size: 0px
      line-height: 24px
      height: 24px
      text-align: center
      background-color: rgba(0,0,0,.2)
      border-radius: 14px
      position: absolute
      bottom: 14px
      right: 12px
      .count
        margin-right: 2px
        font-size: 10px
        vertical-align: top
      .icon-keyboard_arrow_right
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    padding: 0 22px 0 12px
    height: 28px
    line-height: 28px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: rgba(7,17,27,0.2)
    .bulletin-title
      display: inline-block
      width: 22px
      height: 12px
      vertical-align: top
      margin-top: 7px
      bg-image('bulletin')
      background-size: 100%
      background-repeat: no-repeat
    .bulletin-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      bottom: 6px
      right: 12px
  .background
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    z-index: -1
    img
      width: 100%
      height: 100%
      filter:blur(10px)
  .detail
    position: fixed
    top 0
    left 0
    z-index: 100
    width: 100%
    height: 100%
    overflow auto
    background rgba(7,17,27,0.8)
</style>
