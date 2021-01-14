export interface Config {
  BASENAME?: string;

  API_URL: string;

  TOKEN_KEY: string;

  layout: 'side' | 'top';

  theme: 'dark' | 'light';

  title: string;

}

const BaseConfig: Config = {
  // react-router basename
  BASENAME: '/',

  // 统一请求地址
  API_URL: '',

  // 本地存储token的键
  TOKEN_KEY: 'token_key',

  // 默认菜单栏位置
  layout: 'side',

  // 默认主题颜色
  theme: 'dark',

  // 项目名称
  title: 'React Todo'

};

export default BaseConfig;
