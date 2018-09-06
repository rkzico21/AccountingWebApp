import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AccountCategories from '@/components/AccountCategories'

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
      name: 'AccountCategories',
      component: AccountCategories
    }
  ]
})
