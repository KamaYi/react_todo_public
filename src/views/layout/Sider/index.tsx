import { Layout, Menu, message } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { apiNav } from '@/api/index';
import { useEffect, useState, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSettings, Settings } from '@/store/module/settings';
import { StoreState } from '@/store/types';
import routeKeysMap from '@/router/routeMap'
import './index.less';

interface MenuList {
    child: Array<{ name: string; id: string }>;
    icon: string;
    name: string;
    id: string;
    has_button: string;
}

interface LayoutSiderProps extends RouteComponentProps {
    updateSettings: (settings: Settings) => {};
    settings: Settings;
}
function LayoutSider(props: LayoutSiderProps) {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    const settings = props.settings;

    const [menuList, setMenuList] = useState<Array<MenuList>>([]);
    const initMenuList = async () => {
        const data: any = await apiNav();
        console.log('菜单刷新了-------: ', data);
        setMenuList(data.menuList);
    };
    useEffect(() => {
        initMenuList();
    }, []);

    const clickMenu = (item: MenuList) => {

        // 点击子集菜单记录id
        let subscript: number = 0;
        settings.defaultOpenKeys.find((ele, index) => {
            if ((ele = item.id)) subscript = index;
        }); // 存储展开menu
        subscript ? settings.defaultOpenKeys.splice(subscript, 1) : settings.defaultOpenKeys.push(item.id);
        settings.defaultSelectedKeys = item.id;
        props.updateSettings(settings);

        props.history.push(routeKeysMap[item.id] ? routeKeysMap[item.id] : '/error/404') // 页面路由跳转
    };

    // 利用 createMenuListMap 的递归调用实现菜单的动态创建，当 menuList 值改变时，菜单也会动态改变，可以将此方法声明成单独的组件，传值 list，并返回 JSX 节点列表
    function createMenuListMap(menuList: any) {
        return menuList.reduce((pre: any, item: MenuList, index: number) => {
            console.log('item: ', item.id);
            if ((!Number(item.has_button) && item.child.length)) {
                // 如果当前循环到的菜单项有 child，那就返回 SubMenu，否则返回的直接是 Menu.Item
                pre.push(
                    <SubMenu
                        className={['23-2','20-1','20-2','19-1','19-4','19-3'].find((itemA: any) => itemA === item.id) ? 'next-title' : ''}
                        key={item.id}
                        title={
                            <span>
                                {/* <item.icon /> */}
                                <UserOutlined />
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {
                            createMenuListMap(item.child)
                        }
                    </SubMenu>
                );
            } else {
                pre.push(
                    <Menu.Item className={['1','26'].find((itemA: any) => itemA === item.id) ? 'first-title' : ''} key={item.id} onClick={() => clickMenu(item)}>
                        <TeamOutlined />
                        <span>{item.name}</span>
                    </Menu.Item>
                );
            }
            return pre;
        }, []);
    };
    return (
        <div className="sidebar-menu-container" style={{ width: settings.collapsed ? '80px' : '' }}>
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <Sider width={200} className="site-layout-background" collapsed={settings.collapsed}>
                    <Menu
                        mode="inline"
                        theme="light"
                        style={{ height: '100%', borderRight: 0 }}
                        defaultSelectedKeys={[settings.defaultSelectedKeys]}
                        defaultOpenKeys={settings.defaultOpenKeys}
                    >
                        {
                            createMenuListMap(menuList)
                        }
                    </Menu>
                </Sider>
            </Scrollbars>
        </div>
    );
}
export default connect(
    (state: StoreState) => {
        return { settings: state.settings };
    },
    { updateSettings }
)(memo(withRouter(LayoutSider)));
