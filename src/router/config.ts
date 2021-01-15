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
 * routes 第一级路由负责最外层的路由渲染，区分业务和系统模块。在此按照模块进行设计拆分
 */

const routes: IRoute[] = [
  {
    path: '/system',
    component: React.lazy(() => import('@/layout/Layout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() => import(/*webpackChunkName:'Login'*/'@/views/system/login')),
        meta: {
          title: '登录',
        }
      }, {
        path: '/system/welcome',
        component: React.lazy(() => import(/*webpackChunkName:'Welcome'*/'@/views/system/welcome')),
        meta: {
          title: '登录',
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
      }
    ]
  }, {
    path: '/business',
    component: React.lazy(() => import('@/layout/Layout')),
    meta: {
      title: '业务路由',
    },
    redirect: '/business/welecome',
    children: [
      {
        path: '/business/welecome',
        auth: false,
        component: React.lazy(() => import('@/views/business/welcome')),
        meta: {
          title: '暂无权限',
        },
      }
    ]
  }
];

export default routes;
