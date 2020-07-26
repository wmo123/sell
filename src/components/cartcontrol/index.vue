<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script>
export default {
  name: "cartcontrol",
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 这里直接对props进行操作,此时的props是引用类型数据,更改之后直接影响了父组件中的goods
     */
    addCart(e) {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  },
  created() {}
};
</script>
<style lang="stylus">
.cartcontrol
  font-size 0
  position: absolute;
  right: 0;
  bottom: 0px;
  .cart-decrease
    display inline-block
    padding 6px
    .inner
      display: inline-block
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
  .move-enter-active, .move-leave-active
    transition: all .4s linear
    .inner
      transition: all 0.4s linear
  .move-enter, .move-leave-to // 过渡开始状态
    opacity: 0
    transform: translate3d(24px, 0, 0)
    .inner
      transform: rotate(180deg)
  .move-enter-to,.move-leave
    opacity: 1
    transform: translate3d(0, 0, 0)
    .inner
      transform: rotate(0)
  .count
    display inline-block
    font-size 10px
    line-height 24px
    color rgb(147,153,159)
    vertical-align: top;
    margin-top: 6px;
  .add
    display inline-block
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
    padding 6px
</style>
