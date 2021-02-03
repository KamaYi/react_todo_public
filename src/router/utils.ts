import routes, { IRoute } from './config';
import LocalStore from '@/utils/store'
let localRouteList: any[] = [] // 全局的路由数据

/**
 *
 * 以递归的方式展平react router数组
 * @param routeArray 路由
 * @param auth 路由鉴权，默认是
 * 此处遍历成的路由存进缓存，否则每次路由变动都要进行去维度
 */
const flattenRoutes = (routeArray: any) =>
  routeArray.reduce((pre: any, cur: IRoute) => {
    pre.push({
      ...cur,
      auth: typeof cur.auth !== 'undefined' ? cur.auth : true
    });
    return pre.concat(
      Array.isArray(cur.children) ? flattenRoutes(cur.children) : []
    );
  }, []);

// function getRouteList(): IRoute[] {
//   if (routes.length > 0) {
//     const localRouteList: Array<IRoute> = LocalStore.getValue('localRouteList') || []
//     console.log('localRouteList: ', localRouteList);
//     if (localRouteList.length) {
//       return localRouteList
//     } else {
//       const flatten: Array<IRoute>  = flattenRoutes(routes)
//       console.log('flatten: ', flatten);
//       LocalStore.setValue('localRouteList',flatten)
//       return flatten
//     }
//   }
//   return [];
// }

function getRouteList(): IRoute[] { // 本地遍历后的路由一维数组暂不能进行浏览器storage缓存，暂不能进行处理，只能在路由刷新时实时的进行遍历----后期优化
  if (routes.length > 0) {
    return flattenRoutes(routes);
  }
  return [];
}

export const routeList = getRouteList()
console.log('routeList: ', routeList);

export function getPageTitle(pathname: string): string {
  const route = routeList.find(child => child.path === pathname);
  return route ? route.meta.title : '';
}


function findRoutesByPaths(pathList: string[], routeList: IRoute[]): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf(child.path) !== -1,
  );
}

export function getBreadcrumbs(pathList: string[]): IRoute[] {
  return findRoutesByPaths(pathList, routeList);
}
