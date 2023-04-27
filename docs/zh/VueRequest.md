# Vite4、Vue3、TS 基于 Axios 的二次封装

## useRequest.ts

```ts
// 请求工具类
import axios, {CancelTokenStatic, AxiosRequestConfig, AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse} from "axios";
import {useGlobalStore} from "@/stores";
import {hasOwn, hasOwnDefault} from "@/utils";

/**
 * @description: HttpConfig
 * @param {string} contentType 请求头 Content-Type 类型 json、form、file 默认 json
 * @param {object} extendHeaders 扩展请求头 用于不满足默认的 Content-Type、token 请求头的情况
 * @param {boolean} ignoreLoading 是否忽略 loading 默认 false
 * @param {boolean} ignoreToken 是否忽略 token 默认 false
 * */
interface HttpConfig extends AxiosRequestConfig {
  contentType?: string;
  extendHeaders?: {[key: string]: string};
  ignoreLoading?: boolean;
  ignoreToken?: boolean;
}

/**
 * @description: Http 请求工具类 hook
 * @param {function} useGlobalStore 全局状态管理
 * @param {object} InsideConfig 内部配置
 * @param {boolean} ignoreLoading 是否忽略 loading 默认 true
 * @param {object} instance axios 实例
 * @param {object} CancelToken axios.CancelToken
 * @param {object} source axios.CancelToken.source()
 * @param {string} ContentType 请求头 Content-Type 类型 json、form、file 默认 json
 * @param {function} interceptors 拦截器
 * @param {function} cancel 取消请求
 * @param {function} request 发送请求
 * @param {function} hasOwn 判断对象是否有某个属性
 * @param {function} hasOwnDefault 判断对象是否有某个属性，如果没有则使用默认值
 * */
export default class Http {
  private readonly globalStore = useGlobalStore() as any;
  private readonly InsideConfig: any;
  private readonly ignoreLoading: boolean;
  private readonly instance: AxiosInstance;
  private CancelToken: CancelTokenStatic;
  private source: {cancel: (arg0: string) => void; token: any};
  private readonly ContentType = {
    json: "application/json;charset=UTF-8",
    form: "application/x-www-form-urlencoded;charset=UTF-8",
    file: "multipart/form-data;charset=UTF-8",
  };

  constructor(config?: HttpConfig) {
    this.instance = axios.create();
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    this.InsideConfig = {
      headers: {
        "Content-Type": this.ContentType[hasOwnDefault(config, "contentType", "json")],
        [this.globalStore.getTokenKey]: this.globalStore.getToken,
      },
      timeout: hasOwnDefault(config, "timeout", 10000),
      withCredentials: true,
      url: config.url,
      method: config.method,
      data: config?.data || {},
      params: config?.params || {},
      cancelToken: this.source.token,
    };
    this.ignoreLoading = hasOwnDefault(config, "ignoreLoading", true);
    // 不满足默认的 Content-Type、token 请求头的话可传入 extendHeaders 用来 扩展请求头
    if (hasOwn(config, "extendHeaders")) this.InsideConfig.headers = {...this.InsideConfig.headers, ...config.extendHeaders};
    // 丢掉默认的 headers 替换为 新传入的 headers
    if (hasOwn(config, "headers")) this.InsideConfig.headers = config.headers;
    // 忽略data、params、token
    if (!hasOwn(config, "data")) delete this.InsideConfig.data;
    if (!hasOwn(config, "params")) delete this.InsideConfig.params;
    if (hasOwnDefault(config, "ignoreToken", true)) delete this.InsideConfig.headers[this.globalStore.getTokenKey];
  }

  private interceptors(instance: any) {
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!this.ignoreLoading) this.globalStore.setLoading(true);
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.globalStore.setLoading(false);
        const {data, status} = response;
        return Promise.resolve({data, status});
      },
      (error: AxiosError) => {
        this.globalStore.setLoading(false);
        return Promise.reject(error);
      }
    );
  }

  // 取消请求
  public cancel(message = "Request canceled") {
    this.source.cancel(message);
  }

  // 发送请求
  public request(): Promise<object> {
    this.interceptors(this.instance);
    return this.instance(this.InsideConfig);
  }
}

```

##  utils/index.ts

```ts
// 判断对象上是否有某个属性
export const hasOwn = (target: object, key: string): boolean => Object.prototype.hasOwnProperty.call(target, key);

// 判断对象上是否有某个属性有的话返回属性值没有的话返回默认值
export const hasOwnDefault = (target: object, key: string, defaultValue: any): any => (hasOwn(target, key) ? target[key] : defaultValue);

```

## stores/index.ts

```ts
import {createPersistedState} from "pinia-plugin-persistedstate";

const pinia = createPinia().use(
  createPersistedState({
    storage: localStorage, // sessionStorage or localStorage
  })
);

export default pinia;

export const useGlobalStore = defineStore("Global", {
  state: () => ({
    loading: false as boolean, // 全局loading状态
    token: "" as string | null, // token
    tokenKey: "token" as string, // 请求头token的key
    locale: "zh_CN" as string, // 语言
  }),
  getters: {
    getLoading: state => state.loading as boolean,
    getToken: state => state.token as string,
    getTokenKey: state => state.tokenKey as string,
    getLocale: state => state.locale as string,
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setToken(token: string) {
      this.token = token;
    },
    setTokenKey(tokenKey: string) {
      this.tokenKey = tokenKey;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
  persist: true, // 设置持久化
});

```

