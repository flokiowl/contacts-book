import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactList from '../views/ContactList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ContactList
  },
  {
    path: '/add',
    name: 'Add new contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddContact.vue')
  },
  {
    path: '/contact/:id',
    name: 'Contact Info',
    props:true,
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
