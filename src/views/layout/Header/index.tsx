import logo from "@/assets/images/logo.svg";
import { ExportOutlined, FormOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Tooltip, message } from 'antd';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { updateSettings, Settings } from '@/store/module/settings';
import { logout } from '@/store/module/user';
import { StoreState } from '@/store/types';
import './index.less'
interface LayoutHeaderProps extends RouteComponentProps {
    logout: () => void;
    updateSettings: (settings: Settings) => {};
    realNameLast: string;
    settings: Settings;
}
function LayoutHeader(props: LayoutHeaderProps) {
    const { logout, realNameLast, settings } = props;
    console.log('====================================');
    console.log('header刷新了------');
    console.log('====================================');
    function onHeaderClick(type: string) {
        if (type === 'singOut') {
            logout()
            message.info('退出成功')
            props.history.push('/login');

        } else {
            message.info('问卷调查')
        }
    }
    function onCollapsedClick() {
        props.settings.collapsed = !props.settings.collapsed
        props.updateSettings(props.settings)
    }
    return (
        <div className="header-container">
            <div className="logo">
                <img src={logo} className="sidebar-logo" alt="logo" />
                <span className="color-primary">DataMap数据平台</span>
            </div>
            <div className="collapsed vertical-middle" onClick={onCollapsedClick}>{props.settings.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} </div>
            <div className="right-option vertical-middle">
                <Tooltip placement="bottom" title={'问题反馈'}>
                    <FormOutlined onClick={() => onHeaderClick('question')} />
                </Tooltip>
                <Tooltip placement="bottom" title={realNameLast + '，欢迎使用'}>
                    <div className="right-option_name">{realNameLast}</div>
                </Tooltip>
                <Tooltip placement="bottom" title={'退出系统'}>
                    <ExportOutlined onClick={() => onHeaderClick('singOut')} />
                </Tooltip>
            </div>
        </div>
    );
};
export default connect((state: StoreState) => {
    return {
        realNameLast: state.user.realName.substring(state.user.realName.length - 1, state.user.realName.length),
        settings: state.settings
    }
}, {
    logout, updateSettings
})(withRouter(LayoutHeader));
