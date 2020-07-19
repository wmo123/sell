<template>
  <div class="detail">
    <div class="main-wrapper">
      <div class="main">
        <div class="title">
          {{ data.name }}
        </div>
        <div class="star">
          <Star :size="48" :score="data.score" />
        </div>
        <div class="discount-info">
          <div class="title">
            <span class="line"></span>
            <span class="text">优惠信息</span>
            <span class="line"></span>
          </div>
        </div>
        <div class="seller-note"></div>
      </div>
    </div>
    <div class="close">
      <i class="icon-close" @click="$emit('closeDetail')"></i>
    </div>
  </div>
</template>
<script>
import Star from "components/star";
export default {
  name: "detail",
  components: { Star },
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="stylus">
.detail
  position: fixed
  top 0
  left 0
  width 100%
  height 100%
  .main-wrapper
    min-height 100%
    .main
      padding-bottom 64px
      .title
        padding-top 64px
        font-size 16px
        font-weight 700
        text-align center
        line-height 16px
      .discount-info
        .title
          font-size 0
          padding 0
          min-width: 80%
          margin: 28px auto 24px auto
          .text
            font-size 14px
            font-weight 700
            line-height 14px
            padding 0 12px
          .line
            display inline-block
            width 112px
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
  .close
    height 64px
    line-height 64px
    margin-top -64px
    text-align center
</style>
