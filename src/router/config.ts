import React from 'react';

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

/**
 * routes 区分业务和系统模块。在此按照模块进行设计拆分，分别引入
 */

const routes: IRoute[] = [
  {
    path: '/',
    component: React.lazy(() => import('@/views/layout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/welcome',
    children: [
      {
        path: '/login',
        component: React.lazy(() => import(/*webpackChunkName:'Login'*/'@/views/login')),
        meta: {
          title: '登录',
        }
      }, {
        path: '/welcome',
        component: React.lazy(() => import(/*webpackChunkName:'Welcome'*/'@/views/welcome')),
        meta: {
          title: '欢迎页',
        }
      }, {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            auth: false,
            component: React.lazy(() => import('@/views/error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            auth: false,
            component: React.lazy(() => import('@/views/error/403')),
            meta: {
              title: '暂无权限',
            },
          }
        ]
      }, {
        path: '/menu',
        meta: {
          title: '嵌套路由',
        },
        redirect: '/menu//menu1',
        children: [
          {
            path: '/menu/menu1',
            auth: false,
            component: React.lazy(() => import('@/views/menu/menu1')),
            meta: {
              title: '菜单1',
            },
          },
          {
            path: '/menu/menu2',
            auth: false,
            meta: {
              title: '菜单2',
            },
            children: [
              {
                path: '/menu/menu2/menu2_1',
                auth: false,
                component: React.lazy(() => import('@/views/menu/menu2/menu2_1')),
                meta: {
                  title: '菜单2_1',
                },
              }, {
                path: '/menu/menu2/menu2_2',
                auth: false,
                component: React.lazy(() => import('@/views/menu/menu2/menu2_2')),
                meta: {
                  title: '菜单2_2',
                },
              }
            ]
          }
        ]
      }
    ]
  }
];

export default routes;
