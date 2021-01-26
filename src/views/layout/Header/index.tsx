import logo from "@/assets/images/logo.svg";
import { ExportOutlined, FormOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { logout } from '@/store/module/user';
import { StoreState } from '@/store/types';
import './index.less'
interface LayoutHeaderProps extends RouteComponentProps{ // 这样写存在ts类型问题 暂未解决
    logout: () => void;
    realNameLast: string;
}
function LayoutHeader(props: LayoutHeaderProps) {
    const { logout } = props;
    function onHeaderClick(type: string) {
        console.log('props: ', props);
        console.log('type: ', type);
        if (type === 'singOut') {
            logout()
            props.history.push('/login');
        } else {
            console.log('问卷调差');
        }
    }
    return (
        <div className="header-container">
            <div className="logo" >
                <img src={logo} className="sidebar-logo" alt="logo" />
                <span className="color-primary">DataMap数据平台</span>
            </div>
            <div className="right-option vertical-middle">
                <Tooltip placement="bottom" title={'问题反馈'}>
                    <FormOutlined onClick={() => onHeaderClick('question')} />
                </Tooltip>
                <Tooltip placement="bottom" title={'欢迎使用'}>
                    <div className="right-option_name">易</div>
                </Tooltip>
                <Tooltip placement="bottom" title={'退出系统'}>
                    <ExportOutlined onClick={() => onHeaderClick('singOut')} />
                </Tooltip>
            </div>
        </div>
    );
};
export default connect((state: StoreState) => {
    console.log('state: ', state);
    return {
        realNameLast: state.user.realName.substring(state.user.realName.length - 1, state.user.realName.length)
    }
}, {
    logout,
})(LayoutHeader);
