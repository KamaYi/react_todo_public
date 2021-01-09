import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function Error404() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="系统提示：您访问的页面不存在，我们已经上报管理员，尽快修复。"
            extra={
                <Button type="primary">
                    <Link to="/">返回首页</Link>
                </Button>
            }
        />
    );
}

export default Error404;