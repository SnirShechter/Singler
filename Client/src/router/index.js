import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home/Home'
import myProfile from '@/components/MyProfile/MyProfile'
import matcher from '@/components/Matcher/Matcher'
import matches from '@/components/Matches/Matches'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/myprofile',
      name: 'MyProfile',
      component: myProfile
    },
    {
      path: '/matcher',
      name: 'Matcher',
      component: matcher
    },
    {
      path: '/matches',
      name: 'Matches',
      component: matches
    }
  ],
  mode: 'history'
})
