import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home/Home'
import myProfile from '@/components/MyProfile/MyProfile'
import register from '@/components/Home/Register'
import matcher from '@/components/Matcher/Matcher'
import matches from '@/components/Matches/Matches'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'



Vue.use(Element)
// Vue.use(ElementUI, { locale })
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
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    }
  ],
  mode: 'history'
})
