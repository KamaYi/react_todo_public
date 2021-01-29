import React, { memo, useState, useEffect } from 'react';
import { useHistory, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { IRoute, IRouteBase } from '@/router/config';
import './index.less';
import { getBreadcrumbs } from '@/router/utils';
import { routeList } from '@/router/utils';

interface Path {
    pathname: string;
}

function Breadcrumbs(props: RouteComponentProps) {
    const [breadcrumbs, setBreadcrumbs] = useState<IRoute[]>([]);

    const history = useHistory();

    useEffect(() => {
        history.listen((path: Path) => {
            let pathList: string[] = path.pathname.split('/').filter(Boolean).map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))
            console.log('pathList: ', pathList);
            setBreadcrumbs(getBreadcrumbs(pathList));
        })
    }, []);
    function toLink(link: IRoute) {
        console.log('link: ', link);
        let findItem: any = routeList.find(item => item.path === link.path)
        props.history.push(findItem.path)
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

export default withRouter(memo(Breadcrumbs));