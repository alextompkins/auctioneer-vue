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
import EditAuction from './auction/EditAuction.vue';
import MyAuctions from './auction/MyAuctions.vue';
import WonAuctions from './auction/WonAuctions.vue';
import UserView from './user/UserView.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


const basePath = process.env.BASE_PATH || '/auctioneer';
const routes = [
  {
    path: basePath + '/',
    name: 'home',
    component: Home
  },
  {
    path: basePath + '/auctions',
    name: 'search-auctions',
    component: SearchAuctions
  },
  {
    path: basePath + '/auctions/:id',
    name: 'auction-view',
    component: AuctionView
  },
  {
    path: basePath + '/auctions/:id/edit',
    name: 'edit-auction',
    component: EditAuction
  },
  {
    path: basePath + '/new_auction',
    name: 'post-auction',
    component: PostAuction
  },
  {
    path: basePath + '/my_auctions',
    name: 'my-auctions',
    component: MyAuctions
  },
  {
    path: basePath + '/won_auctions',
    name: 'won-auctions',
    component: WonAuctions
  },
  {
    path: basePath + '/register',
    name: 'register',
    component: Register
  },
  {
    path: basePath + '/users/:id',
    name: 'user-view',
    component: UserView
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

Vue.http.options.emulateJSON = false;
Vue.prototype.$apiUrl = process.env.API_URL || 'https://fathomless-hollows-20816.herokuapp.com/api/v1';

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
