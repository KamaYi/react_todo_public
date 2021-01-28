import routes, { IRoute } from './config';
import config from '../config';

/**
 * config路由配置转化成为一维数组
 */

/**
 *
 * 以递归的方式展平react router数组
 * @param routeArray 路由
 * @param auth 路由鉴权，默认是
 */
const flattenRoutes = (routeArray: any, auth: boolean) =>
  routeArray.reduce((pre: any, cur: IRoute) => {
    console.log('cur: ', cur);
    pre.push({
      ...cur,
      auth: typeof cur.auth !== 'undefined' ? cur.auth : auth,
    });
    return pre.concat(
      Array.isArray(cur.children) ? flattenRoutes(cur.children, auth) : cur
    );
  }, []);

function getRouteList(): IRoute[] {
  if (routes.length > 0) {
    return flattenRoutes(routes, true);
  }
  return [];
}

export const routeList = getRouteList();
console.log('routeList: ', routeList);

function findRoutesByPaths(pathList: string[], routeList: IRoute[], basename?: string): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1,
  );
}

export function getPageTitle(routeList: IRoute[]): string {
  const route = routeList.find(child => child.path === window.location.pathname);

  return route ? route.meta.title : '';
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
}

export function getBreadcrumbs(): IRoute[] {
  return findRoutesByPaths(getPagePathList(), routeList, config.BASENAME);
}