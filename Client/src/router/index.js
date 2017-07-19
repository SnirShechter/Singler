import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home/Home'
import myProfile from '@/components/MyProfile/MyProfile'
import settings from '@/components/MyProfile/Settings'
import register from '@/components/Home/Register'
import matcher from '@/components/Matcher/Matcher'
import matches from '@/components/Matches/Matches'
import chat from '@/components/Matches/Chat'
import loader from '@/components/General/Loader'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
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
    },
    {
      path: '/chat/:id',
      name: 'Chat',
      component: chat
    },
    {
      path: '/loader',
      name: 'Loader',
      component: loader
    },
    {
      path: '/myProfile/settings',
      name: 'Settings',
      component: settings
    }
  ],
  mode: 'history'
})
