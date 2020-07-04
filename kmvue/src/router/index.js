import Vue from 'vue'
import Router from 'vue-router'

import Appindex from "../components/home/Appindex";
import Login from "../components/Login";
import Home from "../components/Home";
import Cardmanager from "../components/Cardmanager";
import Card from "../components/cardmanager/Card";
import Personinfo from "../components/personinfo/Personinfo";
import TimeLine from "../components/timeLine/TimeLine";
import Notice from "../components/notice/Notice";
import Text from "../components/Text";
import cardDetail from "../components/cardDetail/cardDetail";

import CardEdit from "../components/cardEdit/CardEdit";

import Reviewcard from "../components/reviewCard/Reviewcard";
import Register from "../components/Register";
import TestReview from "../components/test/TestReview";
import SearchDetail from "../components/searchDetail/SearchDetail";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home,
      meta: {
        requireAuth: true
      },
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'Appindex',
          component: Appindex,
          meta: {
            requireAuth: true
          }

        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {

      path: '/text',
      name: 'Text',
      component: Text,
      meta: {
        requireAuth: true
      }

    },
    {

      path: '/personinfo',
      name: 'Personinfo',
      component: Personinfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/cardmanager',
      name:'Cardmanager',
      component: Cardmanager,
      children:[
        {
          path:'/cards',
          name:'Card',
          component:Card,
          meta: {
            requireAuth: true
          }
        }
      ],
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/timeLine',
      name: 'TimeLine',
      component: TimeLine,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/reviewcard',
      name: 'Reviewcard',
      component: Reviewcard,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/cardDetail',
      name: 'CrdDetail',
      component: cardDetail,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/cardEdit',
      name: 'CardEdit',
      component: CardEdit,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/test',
      name: 'TestReview',
      component: TestReview,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/searchDetail',
      name: 'SearchDetail',
      component: SearchDetail,
      meta: {
        requireAuth: true
      }

    }
  ]
})
