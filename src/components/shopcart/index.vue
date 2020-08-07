<template>
  <div class="shopcart" >
    <div class="cart-lf" @click="$emit('showcart')">
      <div class="icon-wrapper">
        <div class="icon" :class="{ highLight: totalCount > 0 }">
          <i
            class="icon-shopping_cart"
            :class="{ highLight: totalCount > 0 }"
          ></i>
        </div>
        <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
      </div>
      <span class="price" :class="{ highLight: totalPrice > 0 }"
        >¥{{ totalPrice }}</span
      >
      <span class="text">另需配送费{{ sellers.deliveryPrice }}元</span>
    </div>
    <div class="cart-rg" :class="{ highLight: totalPrice >= sellers.minPrice }">
      <span v-show="totalPrice === 0">¥{{ sellers.minPrice }}元起送</span>
      <span v-show="totalPrice > 0 && totalPrice < sellers.minPrice"
        >还差¥{{ sellers.minPrice - totalPrice }}元起送</span
      >
      <span v-show="totalPrice >= sellers.minPrice" @click="$emit('settle-account')">去结算</span>
    </div>
    <!-- 先在此处准备好下落的区域及小球 -->
    <div class="ball-container">
      <transition
        name="drop"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-for="(ball, index) in balls"
        :key="index"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import eventBus from "../../common/js/bus";
export default {
  name: "shopcart",
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    };
  },
  props: {
    sellers: {
      type: Object,
      default: () => {}
    },
    selectFoods: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let num = 0;
      this.selectFoods.forEach(food => {
        num += food.count;
      });
      return num;
    }
  },
  mounted() {
    this.drop();
  },
  methods: {
    drop() {
      eventBus.$on("drop", el => {
        this.balls.forEach(ball => {
          if (!ball.show) {
            ball.el = el;
            ball.show = true;
          }
          this.dropBalls.push(ball);
        });
      });
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  }
};
</script>
<style lang="stylus">
.shopcart
  font-size 0
  display flex
  position fixed
  bottom 0
  right 0
  width 100%
  height 44px
  background #141d27
  color rgba(255,255,255,0.4)
  z-index 2
  .cart-lf
    flex 1
    width 100%
    .icon-wrapper
      display inline-block
      position relative
      top -12px
      box-sizing border-box
      width 56px
      height 56px
      padding 6px
      margin 0 15px
      border-radius 50%
      background #141d27
      .icon
        width: 100%
        height: 100%
        border-radius: 50%
        text-align: center
        background: #2b343c
        font-size 24px
        padding-top 9px
        box-sizing border-box
        &.highLight
          background: rgb(0,160,220);
        .icon-shopping_cart
          &.highLight
            color #fff
      .num
        width: 24px
        height: 16px
        line-height: 16px;
        color: rgb(255,255,255);
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 16px;
        text-align: center;
        font-size: 9px
        background: rgb(240,20,20);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
    .price
      display inline-block
      margin 10px 0 12px 0
      line-height 24px
      vertical-align top
      font-size 16px
      font-weight 700
      padding-right 12px
      border-right 1px solid rgba(255,255,255,0.1)
      letter-spacing: 2px;
      &.highLight
        color #fff
    .text
      font-size 10px
      padding-left 12px
      vertical-align top
      line-height 24px
      display: inline-block;
      margin-top: 11px;
  .cart-rg
    flex 0 0 105px
    width 100%
    background #2b333b
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 12px;
    span
      font-weight: 700;
      letter-spacing: 0.5px;
    &.highLight
      background #00b43c
      span
        color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
    .drop-enter-active
      transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        transition: all .4s linear
</style>
