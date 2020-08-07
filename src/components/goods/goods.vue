<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in goods"
          :key="index"
          @click="clickEvent(index)"
        >
          <div class="table-cell ">
            <span
              v-show="item.type > 0"
              class="icon"
              :class="classMap[item.type]"
            ></span>
            <span border-1px class="text">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li class="good-item" v-for="(good, index) in goods" :key="index">
          <h2 class="title">{{ good.name }}</h2>
          <div
            class="item border-1px"
            :class="`food${index}`"
            v-for="(food, index) in good.foods"
            :key="index"
          >
            <div class="image">
              <img width="64px" height="64px" :src="food.image" />
            </div>
            <div class="content">
              <div class="food-name">{{ food.name }}</div>
              <div class="food-desc">{{ food.description }}</div>
              <div class="sell">
                <span class="count">月售{{ food.sellCount }}份</span
                ><span class="rating">好评率{{ food.rating }}%</span>
              </div>
              <div class="good-price">
                <span class="price"
                  ><i class="symbol">¥</i>{{ food.price }}</span
                >
                <span v-if="food.oldPrice" class="old-price"
                  ><i class="symbol">¥</i>{{ food.oldPrice }}</span
                >
              </div>
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shopcart
      :sellers="sellers"
      :selectFoods="selectItems"
      @showcart="showCartEvent"
      @settle-account="settleAccountEvent"
    ></shopcart>
    <transition name="fade">
      <div class="cart-mask" v-show="fold" @click="showCartEvent"></div>
    </transition>
    <transition name="move">
      <div class="cart" v-show="fold">
        <div class="title">
          <span class="text">购物车</span>
          <span class="clear" @click="clearCart">清空</span>
        </div>
        <div class="list-content" ref="list-wrapper">
          <ul>
            <li
              class="food-item"
              v-for="(selectFood, index) in selectItems"
              :key="index"
            >
              <span class="name">{{ selectFood.name }}</span>
              <span class="price">¥{{ selectFood.price }}</span>
              <cartcontrol :food="selectFood"></cartcontrol>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Shopcart from "../shopcart";
import Cartcontrol from "../cartcontrol";
const ERR_OK = 0;
const classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
export default {
  name: "goods",
  components: { Shopcart, Cartcontrol },
  props: {
    sellers: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    activeIndex() {
      for (let i = 0; i < this.scrollY.length; i++) {
        let h1 = this.scrollY[i];
        let h2 = this.scrollY[i + 1];
        if (!h2 || (this.posY >= h1 && this.posY < h2)) {
          return i;
        }
      }
      return 0;
    },
    selectItems() {
      let data = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            data.push(food);
          }
        });
      });
      return data;
    },
    fold() {
      return this.selectItems.length && this.show;
    }
  },
  watch: {
    // 监控选中的美食,( selectItems=[] , show=false )
    selectItems: {
      handler: function (val, oldval) {
        if (!val.length) {
          this.show = false;
        };
      },
      deep: true
    }
  },
  data() {
    return {
      classMap: classMap,
      goods: [],
      scrollY: [],
      posY: 0,
      show: false // 操作行为引起购物车显隐的标示
    };
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true });
      this.goodScroll = new BScroll(this.$refs.goodsWrapper, {
        probeType: 3,
        click: true
      });
      this.goodScroll.on("scroll", ({ x, y }) => {
        // 向上滚动y值为负;向下滚动y值为正,
        this.posY = Math.abs(y);
      });
    },
    getScrollY() {
      let doms = this.$refs.goodsWrapper.querySelectorAll(".good-item");
      this.scrollY = Array.prototype.map.call(doms, dom => dom.offsetTop);
    },
    clickEvent(index) {
      let doms = this.$refs.goodsWrapper.querySelectorAll(".good-item");
      let ele = doms[index];
      this.goodScroll.scrollToElement(ele, 300);
    },
    showCartEvent() {
      this.show = !this.show;
      if (this.fold) {
        this.$nextTick(() => {
          if (!this.listContentScroll) {
            let ele = this.$refs["list-wrapper"];
            this.listContentScroll = new BScroll(ele, { click: true });
          }
        });
      } else if (this.listContentScroll) {
        this.listContentScroll.refresh();
      }
    },
    clearCart() {
      this.show = false;
      this.selectItems.map(item => {
        item.count = 0;
      });
    },
    settleAccountEvent() {
      let totalPrice = 0;
      this.selectItems.map(item => {
        totalPrice += item.count * item.price;
      });
      alert(`需支付${totalPrice}元`);
    }
  },
  created() {
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this.getScrollY();
        });
      }
    });
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/base.styl'
.goods
  width 100%
  display flex
  position absolute
  top 183px
  bottom 46px
  left 0
  overflow: hidden
  .menu-wrapper
    width 80px
    flex 0 0 80px
    background-color #f3f5f7
    .menu-item
      display table
      width 56px
      height 54px
      padding 0 12px
      font-size 12px
      .table-cell
        display table-cell
        vertical-align middle
        font-size 0
        margin 0 auto
        border-1px(rgba(7,17,27,0.1))
        .icon
          font-size 12px
          width 12px
          height 12px
          display inline-block
          background-size: 100%
          background-repeat no-repeat
          vertical-align top
          margin-right 3px
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
          font-size 12px
          line-height 14px
      &:last-child
        .table-cell
          border-none()
    .active
      font-size 12px
      background-color #fff
      color rgb(7,17,27)
      margin-top -1px
      .table-cell
        border-none()
  .goods-wrapper
    flex 1
    .good-item
      .title
        font-size 12px
        line-height 26px
        color rgb(147,153,159)
        padding-left 14px
        background #f3f5f7
        height 26px
        border-left 2px solid #d9dde1
      .item
        display flex
        margin 18px 18px 0
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .image
          flex 0 0 64px
          margin-right 10px
        .content
          flex 1
          overflow hidden
          .food-name
            margin-top 2px
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
          .food-desc,.sell
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin 8px 0
          .food-desc
            line-height 12px
          .sell
            margin-top 0
            .count
              margin-right 12px
          .good-price
            font-size 0
            .price
              font-size 14px
              color rgb(240,20,20)
              font-weight 700
              line-height 24px
              margin-right 8px
              .symbol
                font-size 10px
                color rgb(240,20,20)
                font-weight normal
                font-style normal
                margin-right 2px
            .old-price
              font-size: 10px
              color: rgb(147,153,159)
              text-decoration: line-through;
              font-weight 700
              .symbol
                font-weight normal
                font-style normal
                margin-right 2px
      .food0
        padding-bottom 0
  .cart
    width 100%
    position: fixed;
    bottom: 0;
    left: 0;
    padding-bottom: 44px;
    z-index: 1;
    min-height: 50px;
    background #f3f5f7
    .title
      width 100%
      height: 40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      .text
        font-size 14px
        line-height 40px
        color rgb(7,17,27)
        padding-left: 18px;
      .clear
        font-size 14px
        line-height 40px
        color rgb(0,160,260)
        float: right;
        margin-right: 18px;
    .list-content
      max-height 217px
      padding 0 18px
      background #fff
      overflow hidden
      .food-item
        padding 12px 0
        position relative
        border-1px(rgba(7,17,27,.1))
        .name
          line-height: 24px;
          font-size: 14px;
          color: #07111b;
        .price
          line-height: 24px;
          font-size: 14px;
          font-weight: normal;
          color: #f01414;
          position absolute
          top 12px
          right 80px
        .cartcontrol
          bottom 5px
  .cart-mask
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background rgba(7,17,27,0.6)
    backdrop-filter: blur(10px)
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0;
  .move-enter-active, .move-leave-active
    transition: all .5s
  .move-enter, .move-leave-to
    transform: translate3d(0, 100%, 0);
  .move-leave, .move-enter-to
    transform: translate3d(0, 0, 0);
</style>
