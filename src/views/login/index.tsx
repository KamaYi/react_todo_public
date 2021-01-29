import React, { useCallback } from 'react';
import { Input, Button, Form, Typography } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo, UserState } from '@/store/module/user';
import { apiUserLogin } from '@/api/index'
import './index.less'

interface LoginProps extends RouteComponentProps {
  setUserInfo: (userInfo: UserState) => void;
}
interface FormProp {
  account?: string;
  mobile?: string;
  password?: string;
  code?: number;
}

function Login(props: LoginProps) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const [form] = Form.useForm();

  const next = () => {
    const params = new URLSearchParams(window.location.search);
    const redirectURL = params.get('redirectURL');
    if (redirectURL) {
      window.location.href = redirectURL;
      return;
    }
    props.history.push('/welcome');
  };

  const onSubmit = useCallback(() => {
    form.validateFields().then(res => {
      const values = res as FormProp;
      if (values.account && values.password) {
        console.log('res: ', res);
        apiUserLogin({
          account: values.account,
          password: values.password,
        })
          .then(({ data }: { data: UserState }) => {
            console.log('data: ', data);
            props.setUserInfo(data);
            next();
          })
          .catch(() => { });
      }
    });
  }, []);
  return (
    <div className="login-container">
      <div className="page-login">
      <div className="top">
        <Typography.Title className="header">
          <Link to="/">
            <span className="title">账号登录</span>
          </Link>
        </Typography.Title>
      </div>
      <Form
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="用户名："
          name="account"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码："
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3, span: 17 }}>
          <Button block htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

export default connect(state => state, {
  setUserInfo,
})(Login);
