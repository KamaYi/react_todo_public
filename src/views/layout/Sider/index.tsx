import { Layout, Menu, message } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { apiNav } from '@/api/index';
import { useEffect, useState, memo } from 'react';
import { useHistory } from 'react-router-dom';
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

interface LayoutSiderProps {
    updateSettings: (settings: Settings) => {};
    settings: Settings;
}
function LayoutSider(props: LayoutSiderProps) {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    const settings = props.settings;
    const history = useHistory()

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
        console.log('item: ', item);

        // 点击子集菜单记录id
        settings.defaultOpenKeys = []
        settings.defaultOpenKeys.push(item.id.substring(0,item.id.indexOf('-')),item.id.substring(0,item.id.lastIndexOf('-')),item.id)
        settings.defaultSelectedKeys = item.id;
        props.updateSettings(settings);
        routeKeysMap[item.id] ? history.push(routeKeysMap[item.id]) : history.replace('/error/404')
    };

    // 利用 createMenuListMap 的递归调用实现菜单的动态创建，当 menuList 值改变时，菜单也会动态改变，可以将此方法声明成单独的组件，传值 list，并返回 JSX 节点列表
    function createMenuListMap(menuList: any) {
        return menuList.reduce((pre: any, item: MenuList, index: number) => {
            if ((!Number(item.has_button) && item.child.length)) { // item.has_button-页面是否有按钮权限
                // 如果当前循环到的菜单项有 child，那就返回 SubMenu，否则返回的直接是 Menu.Item
                pre.push(
                    <SubMenu
                        className={['3-2'].find((itemA: any) => itemA === item.id) ? 'next-title' : ''}
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
                    <Menu.Item className={['1','4'].find((itemA: any) => itemA === item.id) ? 'first-title' : ''} key={item.id} onClick={() => clickMenu(item)}>
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
)(memo(LayoutSider));
