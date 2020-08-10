<template>
  <div class="scroll-warpper" ref="wrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-lf">
          <span class="score">4.2</span>
          <span class="title">综合评分</span>
          <span class="rank">高于周边商家69.2%</span>
        </div>
        <div class="overview-rg">
          <div class="attitude">
            <span class="text">服务态度</span>
            <Star :size="36" :score="4.2"></Star>
            <span class="number">4.2</span>
          </div>
          <div class="score">
            <span class="text">商品评分</span>
            <Star :size="36" :score="4.1"></Star>
            <span class="number">4.1</span>
          </div>
          <div class="delivery-time">
            <span class="text">送达时间</span>
            <span class="time">38分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratings-filter">
        <div class="rating-type">
          <div
            @click="active = type.type"
            class="type"
            v-for="(type, index) in ratingType"
            :key="index"
            :class="classObj(type.type)"
          >
            <span v-show="type.type === 0">全部</span>
            <span v-show="type.type === 1">满意</span>
            <span v-show="type.type === 2">不满意</span>
            {{ type.count }}
          </div>
        </div>
        <div class="switch">
          <span
            :class="switchClass"
            class="icon-check_circle"
            @click="check = !check"
          ></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="ratings-wrapper" ref="ratings">
        <ul>
          <li
            v-for="(item, index) in ratingsTypeData"
            :key="index"
            class="item-wrapper"
          >
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
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Star from "../star";
export default {
  name: "ratings",
  components: { Star },
  data() {
    return {
      ratings: [],
      active: 0,
      ratingsTypeData: [],
      check: false
    };
  },
  computed: {
    ratingType: function() {
      let all = this.ratings.length;
      let satisfied = 0;
      let unsatisfied = 0;
      this.ratings.forEach(item => {
        if (item.score >= 3) {
          satisfied += 1;
        } else {
          unsatisfied += 1;
        }
      });
      return [
        { count: all, type: 0 },
        { count: satisfied, type: 1 },
        { count: unsatisfied, type: 2 }
      ];
    },
    classObj: function() {
      return function(type) {
        if (type === 2) {
          return type === this.active ? "active-unsatisfied " : "unsatidfied";
        } else {
          return type === this.active ? "active" : "";
        }
      };
    },
    switchClass: function() {
      return this.check ? "check" : "";
    }
  },
  watch: {
    check: function(val, oldVal) {
      if (val) {
        const active = this.active;
        if (active === 0) {
          this.ratingsTypeData = this.ratings.filter(item => {
            return item.text;
          });
        }
        if (active === 1) {
          this.ratingsTypeData = this.ratings.filter(item => {
            return item.text && item.score >= 3;
          });
        }
        if (active === 2) {
          this.ratingsTypeData = this.ratings.filter(item => {
            return item.text && item.score < 3;
          });
        }
      } else {
        this.switchRating();
      }
      this.scroll.refresh();
    },
    active: function(val, oldVal) {
      if (this.check) {
        if (val === 0) {
          this.ratingsTypeData = this.ratings.filter(item => {
            return item.text;
          });
        }
        if (val === 1) {
          this.ratingsTypeData = this.ratings.filter(item => {
            return item.text && item.score >= 3;
          });
        }
        if (val === 2) {
          this.ratingsTypeData = this.ratings.filter(item => {
            return item.text && item.score < 3;
          });
        }
      } else {
        this.switchRating();
      }
      this.scroll.refresh();
    }
  },
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
    },
    switchRating() {
      let active = this.active;
      if (active === 0) {
        this.ratingsTypeData = this.ratings;
        return;
      }
      if (active === 1) {
        this.ratingsTypeData = this.ratings.filter(item => {
          return item.score >= 3;
        });
      } else {
        this.ratingsTypeData = this.ratings.filter(item => {
          return item.score < 3;
        });
      }
    }
  },
  created() {
    this.$http.get("/api/ratings").then(response => {
      this.ratings = response.body.data;
      this.ratingsTypeData = response.body.data;
      // 获取到数据,dom重新渲染,content的高度大于wrapper的高度,才能发生滚动
      this.$nextTick(() => {
        const ele = this.$refs.wrapper;
        this.scroll = new BScroll(ele, { click: true });
      });
    });
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl';
  .scroll-warpper
    width 100%
    position absolute
    top 183px
    bottom 0
    overflow hidden
  .ratings-content
    .overview
      display flex
      padding 18px 0
      .overview-lf
        flex 0 0 137px
        margin 0 auto
        border-right 1px solid rgba(7,17,27,0.1)
        span
          display block
          text-align center
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color #f90
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color #07111b
        .rank
          font-size 10px
          color #93999f
      .overview-rg
        flex 0 0 287px
        padding 5px 24px
        margin 0 auto
        .star
          display inline-block
          margin 0
          vertical-align middle
          margin -2px 12px 0
        .attitude,.score
          font-size 0px
          .text
            font-size 12px
            display inline-block
            vertical-align middle
            color #07111b
            line-height: 18px
          .number
            line-height: 18px
            font-size 12px
            display inline-block
            color #f90
            vertical-align middle
        .score
          margin 8px 0
        .delivery-time
          font-size 12px
          line-height 18px
          .time
            margin-left 12px
            color rgb(147,153,159)
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
        .type
          display: inline-block;
          padding: 8px 12px;
          margin-right: 8px;
          line-height: 16px;
          border-radius: 1px;
          font-size: 12px;
          color: #4d555d;
          background rgba(0,160,220,0.2)
        .active
          background #00a0dc
          color #fff
        .unsatidfied
          background rgba(77,85,93,0.2)
        .active-unsatisfied
          background #4d555d
          color #fff
      .switch
        padding 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        color #93999f
        font-size 0
        line-height 24px
        .icon-check_circle
          display inline-block
          font-size 24px
          margin-right 4px
          vertical-align top
        .check
          color #00c850
        .text
          display inline-block
          color #93999f
          font-size 12px
          vertical-align top
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
