import { Layout, Menu, message } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { apiNav } from '@/api/index'
import { useEffect, useState, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSettings, Settings } from '@/store/module/settings';
import { StoreState } from '@/store/types';
import './index.less'

interface MenuList {
    list: Array<{ name: string, menuId: number }>;
    icon: string;
    name: string;
    menuId: number;
    parentId: number;
}
interface LayoutSiderProps extends RouteComponentProps {
    updateSettings: (settings: Settings) => {};
    settings: Settings
}
function LayoutSider(props: LayoutSiderProps) {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    const settings = props.settings
    console.log('settings: ', settings);
    const [menuList, setMenuList] = useState<Array<MenuList>>([]);
    const initMenuList = async () => {
        const data: any = await apiNav();
        console.log('data: ', data);
        setMenuList(data.menuList)
    }
    useEffect(() => {
        initMenuList();
    }, []);

    const clickMenu = (item: MenuList) => {
        message.warning('你点击了菜单：' + item.name + '----菜单id：' + item.menuId)
        if (item.parentId) { // 点击子集菜单记录id
            const parentId = item.parentId.toString()
            const menuId = item.menuId.toString()
            let subscript: number = 0
            settings.defaultOpenKeys.find((ele, index) => { if (ele = parentId) subscript = index }) // 存储展开menu
            subscript ? settings.defaultOpenKeys.splice(subscript, 1) : settings.defaultOpenKeys.push(parentId)
            settings.defaultSelectedKeys = menuId
        }
        props.updateSettings(settings)
        // props.history.push('') // 页面路由跳转
    }
    console.log('menuList: ', menuList);
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
                        {menuList.map(item => (
                            item.list.length ? <SubMenu key={item.menuId.toString()} icon={<TeamOutlined />} title={item.name}>
                                {item.list.map(element => (
                                    <Menu.Item key={element.menuId.toString()} onClick={() => clickMenu(element as any)}>{element.name}</Menu.Item>
                                ))}
                            </SubMenu>
                                : <Menu.Item key={item.menuId.toString()} icon={<TeamOutlined />} onClick={() => clickMenu(item)}>{item.name}</Menu.Item>
                        ))}
                    </Menu>
                </Sider>
            </Scrollbars>
        </div>
    );
};
export default connect((state: StoreState) => { return { settings: state.settings } }, { updateSettings })(memo(withRouter(LayoutSider)));
