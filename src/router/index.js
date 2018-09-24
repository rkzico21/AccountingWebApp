import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Accounts from '@/components/Accounts'
import Transactions from '@/components/Transactions'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Organization from '@/components/Organization'

import store from '@/store'

Vue.use(Router)



const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { 
        requiresAuth: true
      }
    },
	 {
      path: '/Accounts',
      name: 'Accounts',
      component: Accounts,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/Transactions',
      name: 'Transactions',
      component: Transactions,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },

    {
      path: '/Organization',
      name: 'Organization',
      component: Organization
    }

  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/Login') 
  } else {
    next() 
  }
})

export default router;

