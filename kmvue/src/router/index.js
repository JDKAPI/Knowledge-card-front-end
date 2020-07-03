import Vue from 'vue'
import Router from 'vue-router'

import Appindex from "../components/home/Appindex";
import Login from "../components/Login";
import Home from "../components/Home";
import SideMenu from "../components/common/SideMenu";
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

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'Appindex',
          component: Appindex
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {

      path: '/text',
      name: 'Text',
      component: Text
    },
    {

      path: '/personinfo',
      name: 'Personinfo',
      component: Personinfo
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path:'/cardmanager',
      name:'Cardmanager',
      component: Cardmanager,
      children:[
        {
          path:'/cards',
          name:'Card',
          component:Card
        }
      ]
    },
    {
      path: '/timeLine',
      name: 'TimeLine',
      component: TimeLine
    },
    {
      path: '/reviewcard',
      name: 'Reviewcard',
      component: Reviewcard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cardDetail',
      name: 'CrdDetail',
      component: cardDetail
    },
    {
      path: '/cardEdit',
      name: 'CardEdit',
      component: CardEdit
    },
    {
      path: '/test',
      name: 'TestReview',
      component: TestReview
    }
  ]
})
