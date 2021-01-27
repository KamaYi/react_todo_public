export interface Config {
  BASENAME?: string;

  API_URL: string;

  TOKEN_KEY: string;

  title: string;

}

const BaseConfig: Config = {
  // react-router basename
  BASENAME: '/',

  // 统一请求地址
  API_URL: '',

  // 本地存储token的键
  TOKEN_KEY: 'token_key',

  // 项目名称
  title: 'React-TS-Todo'

};

export default BaseConfig;
