import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const routes = [
  {
    path: '/',
    name: 'threeMap',
    component: r => require.ensure([], () => r(require('../components/threeMap/threeMap')), 'threeMap'),
    meta: {
      title: '三维地图'
    }
  },
  {
    path: '/alarmPage',
    name: 'alarmPage',
    component: r => require.ensure([], () => r(require('../components/alarmPage/alarmPage')), 'alarmPage'),
  },
];
const router = new Router({
  routes
});
export default router;

