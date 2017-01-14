// src/main.js

import Vue from 'vue'
import App from './App.vue'

// Include components and templates
import addCountry from './components/addCountry.vue'
import addCity from './components/addCity.vue'
import countries from './components/Countries.vue'
import logout from './components/Logout.vue'
import subcat from './components/subcat.vue'
import adverts from './components/adverts.vue'
import subcatInfo from './components/subcatInfo.vue'
import dragAndDrop from './components/dragAndDrop.vue'
import createAdvert from './components/createAdvert.vue'
import login from './components/Login.vue'
import info from './components/practicalInfo.vue'

// Include libraries
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueSortable from 'vue-sortable'
import VueValidator from 'vue-validator'

// We want to apply VueResource, VueRouter and VueSortable
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueSortable)
Vue.use(VueValidator)

const router = new VueRouter()

// Pointing routes to the components they should use
router.map({
  '/addCountry': {
    component: addCountry
  },
  '/addCity': {
    component: addCity
  },
  '/countries': {
    component: countries
  },
  '/logout': {
    component: logout
  },
  '/subcat': {
    component: subcat
  },
  '/adverts': {
    component: adverts
  },
  '/subcatInfo': {
    component: subcatInfo
  },
  '/dragAndDrop': {
    component: dragAndDrop
  },
  '/createAdvert': {
    component: createAdvert
  },
  '/login': {
    component: login
  },
  '/info': {
    component: info
  }
})
// Any invalid route will redirect to home
router.redirect({
  '*': '/addCountry'
})

router.start(App, '#app')
