<template>
  <div class="star" :class="starType">
    <span
      v-for="(item, index) in starClasses"
      :key="index"
      :class="item"
      class="star-item"
    ></span>
  </div>
</template>
<script>
const LENGTH = 5;
const LIST_ON = "on";
const LIST_OFF = "off";
const LIST_HALF = "half";
export default {
  name: "star",
  props: {
    size: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    starClasses: function() {
      let result = [];
      // <0.5 不计数 大于0.5记半星
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(LIST_ON);
      }
      if (hasDecimal) {
        result.push(LIST_HALF);
      }
      while (result.length < LENGTH) {
        result.push(LIST_OFF);
      }
      return result;
    },
    starType: function() {
      return "star_" + this.size;
    }
  },
  data() {
    return {};
  },
  mounted() {
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.star
  height: 24px
  margin: 16px 0
  text-align: center
  line-height: 24px
  &.star_48
    .star-item
      display inline-block
      background-repeat no-repeat
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      vertical-align middle
      &:last-child
        margin-right: 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
  &.star_36
    .star-item
      display inline-block
      background-repeat no-repeat
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      vertical-align middle
      &:last-child
        margin-right: 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star_24
    .star-item
      display inline-block
      background-repeat no-repeat
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      vertical-align middle
      &:last-child
        margin-right: 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
