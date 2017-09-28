import Vue from 'vue'
import Router from 'vue-router'




import AuthComponent from '@/components/auth';
import AppComponent from '@/components/app';
import LoginComponent from '@/components/auth/login';
import LogoutComponent from '@/components/auth/logout';
import ContestComponent from '@/components/app/contest';
import ContestListComponent from '@/components/app/contest/list';
import ContestDetailComponent from '@/components/app/contest/detail';
import ContestCreateComponent from '@/components/app/contest/create';
import ContestEditComponent from '@/components/app/contest/edit';
import PageNotFoundComponent from '@/components/page-not-found';


Vue.use(Router)


const contestChildren = [
  {
    path: 'list',
    name: 'contestList',
    component: ContestListComponent
  },
  {
    path: 'create',
    name: 'contestCreate',
    component: ContestCreateComponent
  },
  {
    path: ':id',
    name: 'contestDetail',
    component: ContestDetailComponent,
    props: true 
  },
  {
    path: ':id/edit',
    name: 'contestEdit',
    component: ContestCreateComponent,
    props: true 
  },
  {
    path: '',
    redirect: { name: 'contestList' }
  },
]

const authChildren = [
  {
    path: 'login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    name: 'logout',
    component: LogoutComponent
  },
  {
    path: '',
    redirect: { name: 'login' }
  },
]


const appChildren = [
  {
    path: 'contest',
    name: 'contest',
    component: ContestComponent,
    children: contestChildren
  },
  {
    path: '',
    redirect: { name: 'contest' }
  },
]


global.router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthComponent,
      children: authChildren
    },
    {
      path: '/app',
      name: 'app',
      component: AppComponent,
      children: appChildren
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFoundComponent
    }
  ]
})


export default global.router;