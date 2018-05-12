import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Home.vue';
import Users from './Users.vue';


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/users',
    component: Users
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
