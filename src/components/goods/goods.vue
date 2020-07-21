<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <div class="table-cell border-1px" >
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
    <div class="goods-wrapper"></div>
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
</style>
