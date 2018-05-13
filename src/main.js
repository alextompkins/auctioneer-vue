import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './Home.vue';
import Auctions from './Auctions.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auctions',
    name: 'auctions',
    component: Auctions
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.emulateJSON = true;
Vue.prototype.$apiUrl = 'http://localhost:4941/api/v1';

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
