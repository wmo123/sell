<template>
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-lf"></div>
      <div class="overview-rg"></div>
    </div>
    <div class="split"></div>
    <div class="ratings-filter">
      <div class="rating-type"></div>
      <div class="switch"></div>
    </div>
    <div class="ratings-wrapper" ref="ratings">
      <ul>
        <li v-for="(item, index) in ratings" :key="index" class="item-wrapper">
          <div class="item-content">
            <div class="avater">
              <img :src="item.avatar" width="28" height="28" />
            </div>
            <div class="info">
              <p class="base">
                <span class="name">{{ item.username }}</span>
                <span class="time">{{
                  transDate(new Date(item.rateTime))
                }}</span>
              </p>
              <p class="score">
                <Star :size="24" :score="item.score"></Star>
                <span class="delivery-time" v-if="item.deliveryTime"
                  >{{ item.deliveryTime }}分钟送达</span
                >
              </p>
              <p class="text">{{ item.text }}</p>
              <p class="recommend">
                <span
                  v-if="item.recommend.length"
                  :class="
                    item.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'
                  "
                ></span>
                <span
                  class="text"
                  v-for="(rating, index) in item.recommend"
                  :key="index"
                  >{{ rating }}</span
                >
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Star from "../star";
export default {
  name: "ratings",
  components: { Star },
  data() {
    return {
      ratings: []
    };
  },
  computed: {},
  methods: {
    transDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDay();
      let tempStr = new Date(time) + "";
      let firidx = tempStr.indexOf(":") - 2;
      let lastIdx = tempStr.lastIndexOf(":") + 3;
      let detailTime = tempStr.slice(firidx, lastIdx);
      return `${year}-${month}-${day} ${detailTime}`;
    }
  },
  created() {
    this.$http.get("/api/ratings").then(response => {
      this.ratings = response.body.data;
    });
    // const ele = this.$refs.ratings;
    // this.scroll = new BScroll(ele);
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl';
  .ratings-content
    .overview
      display flex
      padding 18px 0
      .overview-lf
        flex 0 0 187px
      .overview-rg
        flex 0 0 287px
        padding 0 24px
    .split
      width 100%
      height 16px
      border-top 1px solid rgba(7,17,27,0.1)
      border-bottom 1px solid rgba(7,17,27,0.1)
      background #f3f5f7
    .ratings-filter
      .rating-type
        padding 18px 0
        margin 0 18px
        border-1px(rgba(7,17,27,0.1))
      .switch
        padding 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
    .ratings-wrapper
      height 100%
      overflow hidden
      .item-wrapper
        padding 18px 18px 0
        .item-content
          display flex
          padding-bottom 18px
          border-1px(rgba(7,17,27,.1))
          .avater
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              border-radius 50%
          .info
            flex 1
            .base
              height 12px
              line-height 12px
              .name
                font-size 10px
                line-height 12px
                color rgb(7,17,27)
                vertical-align top
              .time
                position absolute
                right 0
                height 12px
                font-size 10px
                line-height 12px
                font-weight 200
                color rgb(147,153,159)
            .score
              padding 4px 0 6px
              .star
                display inline
                margin 0px
                line-height 0
                .star-item
                  width 10px
                  height 10px
                  background-size 10px 10px
              .delivery-time
                font-size 10px
                line-height 12px
                font-weight 200
                color rgb(147,153,159)
            .text
              font-size 12px
              color rgb(7,17,27)
              line-height 18px
              margin-bottom 5px
            .recommend
              .icon-thumb_up
                color rgb(0,160,220)
                font-size 12px
                line-height 16px
              .icon-thumb_down
                color rgb(0,160,220)
                font-size 12px
                color rgb(183,187,191)
              .text
                padding 0 6px
                border 1px solid rgba(7,17,27,0.1)
                border-radius 1px
                color #93999f
                background #fff
                margin 0 8px 4px 0
                display inline-block
</style>
