<template>
  <div class="good-detail">
    <div class="header">
      <span @click="$emit('back-to-list')" class="icon-arrow_lift"></span>
      <div class="image">
        <img :src="food.image" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "goodDetail",
  data() {
    return {};
  },
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="stylus">
.good-detail
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  padding-bottom 44px
  background #fff
  .icon-arrow_lift
    position fixed
    top 10px
    left 10px
    z-index 22
  .image
    width 100%
    padding-top 100%
    height 0
    position relative
    img
      width 100%
      height 100%
      position absolute
      top 0
      left 0
</style>
