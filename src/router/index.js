import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Goods from '@/components/goods/goods'
import Rating from '@/components/rating/rating'
import Seller from '@/components/seller/seller'
import ShopCart from '@/components/shopcart/shopcart'
import CartControl from '@/components/cartControl/cartControl'
import SelectRating from '@/components/ratingselect/ratingselect';
import Login from '@/components/login/login';
import Storage from '@/common/js/storage';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/goods',
      children:[
        {
          path: '/goods',
          name: 'Goods',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Goods
        },
        {
          path: '/rating',
          name: 'Rating',
          component: Rating
        },
        {
          path: '/seller',
          name: 'Seller',
          component: Seller
        },
      ]
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart,
    },
    {
      path: '/cartControl',
      name: 'cartControl',
      component: CartControl
    },
    {
      path: '/select-rating',
      name: 'SelectRating',
      component: SelectRating
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if(Storage.get('token')) {
      console.log(Storage.get('token'));
      next();
    }else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} 
      })
    }
  }else {
    next();
  }
})

export default router;
