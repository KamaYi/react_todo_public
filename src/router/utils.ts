import routes, { IRoute } from './config';
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



const watermark = ({
  // 使用 ES6 的函数默认值方式设置参数的默认取值
  container = document.body,
  width = '250px',
  height = '160px',
  textAlign = 'left',
  textBaseline = 'bottom',
  font = '20px Microsoft Yahei',
  fillStyle = 'rgba(184, 184, 184, 0.4)',
  content = '水印内容',
  content2 = '',
  rotate = 10,
  zIndex = 1000
} = {}, ...res: undefined[]) => {
  const args = res
  const canvas = document.createElement('canvas')

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx: any = canvas.getContext('2d')

  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate(Math.PI / 180 * rotate)
  // ctx.fillText(content, 30, parseFloat(height) / 2)
  ctx.fillText(content, 35, 15)
  ctx.fillText(content2, 10, 40)
  const base64Url = canvas.toDataURL()
  const __wm = document.querySelector('.__wm')
  const watermarkDiv = __wm || document.createElement('div')
  const styleStr = `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`
  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('__wm')

  if (!__wm) {
    container.style.position = 'relative'
    container.insertBefore(watermarkDiv, container.firstChild)
  }
  let wi: any = window
  const MutationObserver = wi.MutationObserver || wi.WebKitMutationObserver
  if (MutationObserver) {
    let mo = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm')
      // 只在__wm元素变动才重新调用 __canvasWM
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 避免一直触发
        mo.disconnect()
        mo = null
        watermark(JSON.parse(JSON.stringify(args)))
      }
    })

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    })
  }

}

export default watermark