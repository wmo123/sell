<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <div class="table-cell border-1px">
            <span
              v-show="item.type > 0"
              class="icon"
              :class="classMap[item.type]"
            ></span>
            <span class="text">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
      <div class="good-item" v-for="(good, index) in goods" :key="index">
        <h2 class="title">{{ good.name }}</h2>
        <div
          class="item border-1px"
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
              <span class="price"><i class="symbol">¥</i>{{ food.price }}</span>
              <span v-if="food.oldPrice" class="old-price"
                ><i class="symbol">¥</i>{{ food.oldPrice }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const ERR_OK = 0;
const classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
export default {
  name: "goods",
  props: {
    sellers: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      classMap: classMap,
      goods: []
    };
  },
  created() {
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
      }
    });
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/base.styl'
.goods
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
        border-1px(rgba(7,17,27,0.2))
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
        border-1px(rgba(7,17,27,0.1))

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
          .sell
            margin-top 0
            .count
              margin-right 12px
          .good-price
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
                margin-right 3px
</style>
