import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Accounts from '@/components/Accounts'
import Transactions from '@/components/Transactions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
	 {
      path: '/Accounts',
      name: 'Accounts',
      component: Accounts
    },
    {
      path: '/Transactions',
      name: 'Transactions',
      component: Transactions
    }
  ]
})
