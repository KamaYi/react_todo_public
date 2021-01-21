import routes , { IRoute } from './config';
import config from '../config';

/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由鉴权，默认是
 */

export function flattenRoute(routeList: IRoute[], deep: boolean, auth: boolean): IRoute[] {
  const result: IRoute[] = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];

    result.push({
      ...route,
      auth: typeof route.auth !== 'undefined' ? route.auth : auth,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth));
    }
  }
  return result;
}

function getRouteList(): IRoute[] {
  if (routes.length > 0) {
    return flattenRoute(routes, true, true);
  }
  return [];
}

/**
 * config路由配置转化成为一维数组
 */

export const routeList = getRouteList();
// console.log('routeList: ', routeList);

// function findRoutesByPaths(pathList: string[], routeList: IRoute[], basename?: string): IRoute[] {
//   return routeList.filter(
//     (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1,
//   );
// }

// export function getPagePathList(pathname?: string): string[] {
//   return (pathname || window.location.pathname)
//     .split('/')
//     .filter(Boolean)
//     .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
// }

export function getPageTitle(routeList: IRoute[]): string {
  const route = routeList.find(child => child.path === window.location.pathname);

  return route ? route.meta.title : '';
}

/**
 * 只有业务路由会有面包屑
 */
// export function getBreadcrumbs(): IRoute[] {
//   return findRoutesByPaths(getPagePathList(), routeList, config.BASENAME);
// }
