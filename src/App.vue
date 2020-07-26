<template>
  <div id="app">
    <top :sellers="sellers"/>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/celler">商家</router-link>
    </div>
    <router-view :sellers="sellers"></router-view>
  </div>
</template>

<script>
import Top from './components/top';
const ERR_NO = 0;
export default {
  name: 'App',
  data() {
    return {
      sellers: {}
    };
  },
  components: {
    Top
  },
  created() {
    this.$http.get('/api/sellers').then(response => {
      response = response.body;
      if (response.errno === ERR_NO) {
        this.sellers = response.data;
      }
    });
  }
};
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'
#app
  .tab
    display: flex
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid red
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      font-size: 14px
      color:rgb(77,85,93)
    .active
      color:rgb(240,20,20)
</style>
