import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from 'components/goods/goods';
import Celler from 'components/celler/celler';
import Ratings from 'components/ratings/ratings';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/celler',
    name: 'celler',
    component: Celler
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  }
];
const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
export default router;
