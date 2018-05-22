import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import Home from './Home.vue';
import SearchAuctions from './auction/SearchAuctions.vue';
import AuctionView from './auction/AuctionView.vue';
import Register from './user/Register.vue';
import PostAuction from './auction/PostAuction.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auctions',
    name: 'search-auctions',
    component: SearchAuctions
  },
  {
    path: '/auctions/:id',
    name: 'auction-view',
    component: AuctionView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/new_auction',
    name: 'post-auction',
    component: PostAuction
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(BootstrapVue);

Vue.http.options.emulateJSON = true;
Vue.prototype.$apiUrl = 'http://localhost:4941/api/v1';

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
