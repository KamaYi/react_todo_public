import React, { memo, useState, useEffect } from 'react';
import { useHistory, Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { IRoute} from '@/router/config';
import './index.less';
import { getBreadcrumbs } from '@/router/utils';
import { routeList } from '@/router/utils';

interface Path {
    pathname: string;
}

function Breadcrumbs() {
    const [breadcrumbs, setBreadcrumbs] = useState<IRoute[]>([]);

    const history = useHistory();
    console.log('history: ', history);
    const filterArrayBreadcrums = (pathname: string) => {
        return pathname.split('/').filter(Boolean).map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))
    }
    useEffect(() => {
        setBreadcrumbs(getBreadcrumbs(filterArrayBreadcrums(history.location.pathname))); // 初次加载
        history.listen((path: Path) => { // 监听路由变化
            setBreadcrumbs(getBreadcrumbs(filterArrayBreadcrums(history.location.pathname)));
        })
    }, []);
    function toLink(link: IRoute) {
        let findItem: any = routeList.find(item => item.path === link.path)
        console.log('findItem: ', findItem);
        if (findItem.isClick) {
            findItem.children && findItem.children.length > 1 ? history.push(findItem.children.find( (item: any) => history.location.pathname.includes(item.path.substring(item.path.lastIndexOf('/'),item.path.length))).path) : history.push(findItem.path)
        }
    }
    return (
        <div className="breadcrumb-container">
            <Breadcrumb>
                {breadcrumbs.map((route: IRoute) => (
                    // <Breadcrumb.Item key={route.path} onClick={() => toLink(route)}>{route.meta.title}
                    //     {
                    //         route.children &&  <Link to={route.path}>{route.meta.title}</Link>
                    //     }
                    // </Breadcrumb.Item>
                    route.isClick ? (
                        <Breadcrumb.Item key={route.path}>
                            <span className="link_name" onClick={() => toLink(route)}>{route.meta.title}</span>
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={route.path}><span>{route.meta.title}</span></Breadcrumb.Item>
                    )
                ))}
            </Breadcrumb>
        </div>
    );
}

export default memo(Breadcrumbs);