import React, { useState, useCallback } from 'react';
import { Tabs, Checkbox, Button, Form,Typography } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo, UserState } from '@/store/module/user';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';

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
  const [activeTab, setActiveTab] = useState('account');
  const [form] = Form.useForm();

  // const next = () => {
  //   const params = new URLSearchParams(window.location.search);
  //   const redirectURL = params.get('redirectURL');
  //   if (redirectURL) {
  //     window.location.href = redirectURL;
  //     return;
  //   }
  //   props.history.push('/');
  // };

  const onSubmit = useCallback(() => {
    form.validateFields().then(res => {
      const values = res as FormProp;
      if (values.account && values.password) {

        return;
      }

      if (values.mobile && values.code) {

      }
    });
  }, []);
  return (
    <FormWrap className="page-login">
      <div className="top">
        <Typography.Title className="header">
          <Link to="/">
            <span className="title">登录 </span>
          </Link>
        </Typography.Title>
      </div>
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="账号密码登录" key="account"></Tabs.TabPane>
        <Tabs.TabPane tab="手机号登录" key="mobile"></Tabs.TabPane>
      </Tabs>

      <Form onFinish={onSubmit} form={form}>
        {activeTab === 'account' ? (
          <>
            <LoginItem.Account form={form} />
            <LoginItem.Password form={form} />
          </>
        ) : (
            <>
              <LoginItem.Mobile form={form} />
              <LoginItem.Code form={form} />
            </>
          )}

        <Form.Item>
          <div className="align--between">
            <Link to="/system/test">test</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
          <div className="align--between">
            <Link to="/system/register">注册账号</Link>
          </div>
      </Form>
    </FormWrap>
  );
}

export default connect(() => ({}), {
  setUserInfo,
})(Login);
