import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Subscribe from '../views/Subscribe.vue'
import User from '../views/User.vue'
import Pro from '../views/Pro.vue'
import answer from '../views/answer.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import Footer from '../components/Footer.vue'
import Shop from '../views/Shop.vue'
import List from '../views/List.vue'
import Car from '../views/Car.vue'
import userinfo from '../views/userinfo.vue'
import Yu from '../views/Yu.vue'
import Yulist from '../views/Yulist.vue'
import addresslist from '../views/addresslist.vue'
import addresseidt from '../views/addressedit.vue'
import addressadd from '../views/addressadd.vue'
import aboutus from '../views/aboutus.vue'
import Yuyuelist from '../views/Yuyuelist.vue'
import Dingdan from '../views/Dingdan.vue'
import order from '../views/order.vue'
import QQ from '../views/QQ.vue'
import pay from '../views/pay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/qq',
    components: {
      default: QQ
    }
  },
  {
    path: '/yuyuelist',
    components: {
      default: Yuyuelist
    }
  },
  {
    path: '/yulist',
    components: {
      default: Yulist
    }
  },
  {
    path: '/dingdan',
    components: {
      default: Dingdan
    }
  },
  {
    path: '/yu',
    components: {
      default: Yu
    }
  },
  {
    path: '/list',
    components: {
      default: List
    }
  },
  {
    path: '/home',
    components: {
      default: Home,
      footer: Footer
    }
  },
  {
    path: '/shop',
    components: {
      default: Shop
    }
  },
  {
    path: '/subscribe',
    components: {
      default: Subscribe,
      footer: Footer
    }
  },
  {
    path: '/user',
    components: {
      default: User,
      footer: Footer
    }
  },
  {
    path: '/problem',
    components: {
      default: Pro,
      footer: Footer
    }
  },
  {
    path: '/answer',
    components: {
      default: answer
    }
  },
  {
    path: '/cart',
    components: {
      default: Car
    }
  },
  {
    path: '/register',
    components: {
      default: register
    }
  },
  {
    path: '/login',
    components: {
      default: login
    }
  },
  {
    path: '/userinfo',
    components: {
      default: userinfo
    }
  },
  {
    path: '/addresslist',
    components: {
      default: addresslist
    }
  },
  {
    path: '/addressedit',
    components: {
      default: addresseidt
    }
  },
  {
    path: '/addressadd',
    components: {
      default: addressadd
    }
  },
  {
    path: '/aboutus',
    components: {
      default: aboutus
    }
  },
  {
    path: '/order',
    components: {
      default: order
    }
  },
  {
    path: '/pay',
    components: {
      default: pay
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
