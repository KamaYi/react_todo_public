import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function Error500() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="系统提示：抱歉，出了点问题，已上报后台管理员，尽快修复此问题。"
            extra={
                <Button type="primary">
                    <Link to="/">返回首页</Link>
                </Button>
            }
        />
    );
}

export default Error500;