import { Layout, Menu, message } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { apiNav } from '@/api/index';
import { useEffect, useState, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSettings, Settings } from '@/store/module/settings';
import { StoreState } from '@/store/types';
import routeKeysMap from './routeMap'
import './index.less';

interface MenuList {
    child: Array<{ name: string; id: string }>;
    icon: string;
    name: string;
    id: string;
    parentId: number;
}

interface LayoutSiderProps extends RouteComponentProps {
    updateSettings: (settings: Settings) => {};
    settings: Settings;
}
function LayoutSider(props: LayoutSiderProps) {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    const settings = props.settings;
    console.log('settings: ', settings);
    const [menuList, setMenuList] = useState<Array<MenuList>>([]);
    const initMenuList = async () => {
        const data: any = await apiNav();
        console.log('data: ', data);
        setMenuList(data.menuList);
    };
    useEffect(() => {
        initMenuList();
    }, []);

    const clickMenu = (item: MenuList) => {
        console.log('你点击了菜单：' + item.name + '----菜单id：' + item.id);
        if (item.parentId) {
            // 点击子集菜单记录id
            let subscript: number = 0;
            settings.defaultOpenKeys.find((ele, index) => {
                if ((ele = item.id)) subscript = index;
            }); // 存储展开menu
            subscript ? settings.defaultOpenKeys.splice(subscript, 1) : settings.defaultOpenKeys.push(item.id);
            settings.defaultSelectedKeys = item.id;
        }
        props.updateSettings(settings);
        console.log('routeKeysMap[item.id]: ', routeKeysMap[item.id]);
        props.history.push(routeKeysMap[item.id]) // 页面路由跳转
    };
    console.log('menuList: ', menuList);
    // 利用 createMenuListMap 的递归调用实现菜单的动态创建，当 menuList 值改变时，菜单也会动态改变，可以将此方法声明成单独的组件，传值 list，并返回 JSX 节点列表
    function createMenuListMap(menuList: any) {
        return menuList.reduce((pre: any, item: any) => {
            if (!Number(item.has_button) && item.child.length) {
                // 如果当前循环到的菜单项有 child，那就返回 SubMenu，否则返回的直接是 Menu.Item
                pre.push(
                    <SubMenu
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
                            // 根据当前菜单的 child 去生成其子菜单，由于菜单项 menuList 是个有终结的数据，且嵌套层数并不复杂，所以这里不用担心递归会造成栈溢出的问题
                            createMenuListMap(item.child)
                        }
                    </SubMenu>
                );
            } else {
                pre.push(
                    <Menu.Item key={item.id} onClick={() => clickMenu(item)}>
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
