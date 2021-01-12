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
      console.log('res: ', res);
      const values = res as FormProp;
      if (values.account && values.password) {
        
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
      <Form onFinish={onSubmit} form={form}>
        <LoginItem.Account form={form}/>
        <LoginItem.Password form={form} />
        <Form.Item>
          <Button block htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    </FormWrap>
  );
}

export default connect(() => ({}), {
  setUserInfo,
})(Login);
