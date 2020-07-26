<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div
        class="decrease icon-remove_circle_outline"
        v-show="food.count > 0"
        @click="decreaseCart"
      ></div>
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
      console.log(e);
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
  created() {
    // console.log(this.food);
  }
};
</script>
<style lang="stylus">
.cartcontrol
  font-size 0
  position: absolute;
  right: 0;
  bottom: 0px;
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s;
    transform rotate(180deg)
  .fade-enter, .fade-leave-to
    opacity: 0;
    transform rotate(0)
  .decrease
    display inline-block
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
    padding 6px
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
