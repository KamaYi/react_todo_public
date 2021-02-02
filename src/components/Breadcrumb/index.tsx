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
        history.listen((path: Path) => { // 监听路由辩护变化
            setBreadcrumbs(getBreadcrumbs(filterArrayBreadcrums(history.location.pathname)));
        })
    }, []);
    function toLink(link: IRoute) {
        console.log('link: ', link);
        let findItem: any = routeList.find(item => item.path === link.path)
        history.push(findItem.path)
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
                    <Breadcrumb.Item key={route.path}>{route.meta.title}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    );
}

export default memo(Breadcrumbs);