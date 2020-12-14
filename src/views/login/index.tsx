import React from 'react';
import { Result, Switch } from 'antd';
import { Button } from 'antd';

function Error403() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="系统提示：你暂无有访问该页面的权限，请联系管理员添加权限后使用"
      extra={
        <Button type="primary">Button</Button>
      }
    />
    
  );
}

export default Error403;
