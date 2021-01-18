import { Layout, Menu } from 'antd';
import logo from "@/assets/images/logo.svg";
import './index.less'
const LayoutHeader = () => {
    const { Header } = Layout;
    return (
        <Header className="header-container">
            <div className="logo" >
                <img src={logo} className="sidebar-logo" alt="logo" />
                <span className="color-primary">暗黑主题</span>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
    );
};
export default LayoutHeader;
