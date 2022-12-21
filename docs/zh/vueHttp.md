# vueHttp

[![img](https://profile.csdnimg.cn/5/F/9/2_m0_68402487)](https://blog.csdn.net/m0_68402487)

# vue项目中的http.js（请求封装）

# 第一个版本

vue+vant

```javascript
import axios from 'axios'
import { Toast } from 'vant';
import store from '@/store/index.js'
import router from '@/router'
import {getToken} from '@/libs/util'
const instance = axios.create({
  timeout: 105000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
/**
 * 请求拦截
 */
instance.interceptors.request.use(async config => {
  if (getToken()) {
    // 如果是CAS平台
    // 在请求头部增加 切换的租户 字段（User-Information）发给后台
    config.headers.Authorization = getToken()
    // request.headers['Tenant_id'] = getCurrentTenantId()
    config.headers['Tenant-ID'] = localStorage.getItem('tenantId')
    if (config.url.indexOf('login') === -1 && config.url.indexOf('refreshToken') === -1 && config.url.indexOf('selectUnReadMessage') === -1) {
      await store.dispatch('refreshToken')
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
/**
 * 响应拦截
 */
instance.interceptors.response.use(response => {
  if ((response.data.code === 'E0B00001' && response.data.data === 'E0B00002') || response.data.code == 401) {
    //Toast(response.data.msg);
    return router.replace({
      name: 'transfer',
    })
  }
  return Promise.resolve(response)
}, error => {
  if (error.response.status === 500 || error.response.status === 502) {
    Toast(error.response.data.msg);
  } else if (error.response.status == 401) {
    //token失效
    Toast(error.response.data.msg);
    router.replace({
      name: 'transfer',
    })
  } else if (error.response.status === 404) {
    Toast('请求接口不存在' + error.response.status);
  } else {
    Toast(error.response.status);
  }
  return Promise.reject(error)
})
const http = {
  get: (path, data, config) =>
    instance.get(path, { params: data, ...config }),
    post: (path, data, config) => instance.post(path, data, config),
    put: (path, data, config) => instance.put(path, data, config),
    delete: (path, data, config) => instance.delete(path, { data, ...config })
}
export default http
```

# 第二个版本

vue+element-ui



```javascript
import axios from 'axios'
import router from '@/router'
import {getToken} from '@/libs/util'
// 2021年6月22日：统一ui框架为elementUI
import {
    Message,
    Loading
} from 'element-ui';
import store from '@/store/index.js'
// import { mapActions, mapState } from 'vuex'
const instance = axios.create({
    // baseURL: baseUrl,
    timeout: 105000,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
let loadingInstance = null; // 记录页面中存在的loading
let loadingCount = 0; // 记录当前正在请求的数量
function showLoading(data) {
    if (loadingCount === 0) {
        loadingInstance = Loading.service({
            lock: true,
            text: data || '加载中……'
        });
    }
    loadingCount++
};

function hideLoading() {
    loadingCount--
    if (loadingInstance && loadingCount === 0) {
        loadingInstance.close()
        loadingInstance = null
    }
}

// 这里的response包含每次请求的内容
instance.interceptors.request.use(
    async request => {
        if (!request.loadingHide) {
            showLoading(request.loadingText)
        }
        // 全局给header添加token
        if (getToken()) {
            // 如果是CAS平台
            // 在请求头部增加 切换的租户 字段（User-Information）发给后台
            request.headers.Authorization = getToken()
            // request.headers['Tenant_id'] = getCurrentTenantId()
            request.headers['Tenant-ID'] = localStorage.getItem('tenantId')
            if (request.url.indexOf('login') === -1 && request.url.indexOf('refreshToken') === -1 && request.url.indexOf('selectUnReadMessage') === -1) {
                await store.dispatch('refreshToken')
            }
        }
        return request
    },
    error => {
        return Promise.reject(error)
    }
)
// 拦截器
instance.interceptors.response.use(
    (response) => {
        if (!response.config.loadingHide) {
            hideLoading()
        }
        // paas token失效
        // || response.data.code == 401
        if (response.data.code === 'E0B00001' && response.data.data === 'E0B00002') {
            Message({
                message: response.data.msg,
                type: 'warning'
            });
            let timer = setTimeout(() => {
                router.replace({
                    name: 'login',
                    params: {
                        clear: true
                    }
                })
                clearTimeout(timer)
            }, 1000)
            return
        }
        return response
    },
    (error) => {
        if (!error.config.loadingHide) {
            hideLoading()
        }
        if (error.response.status === 500 || error.response.status === 502) {
            Message({
                message: error.response.data.msg,
                type: 'warning'
            });
        } else if (error.response.status === 404) {
            Message({
                message: '请求接口不存在' + error.response.status,
                type: 'error'
            });
        } else if (error.response.status === 401) {
            Message({
                message: 'token失效，请重新登陆',
                type: 'warning'
            });
            router.replace({
                name: 'login',
                params: {
                    clear: true
                }
            })
        } else {
            Message({
                message: error.response.status,
                type: 'warning'
            });
        }
        return Promise.reject(error)
    }
)
const http = {
    get: (path, data, config) =>
        instance.get(path, {
            params: data,
            ...config
        }),
    post: (path, data, config) => instance.post(path, data, config),
    put: (path, data, config) => instance.put(path, data, config),
    delete: (path, data, config) =>
        instance.delete(path, {
            data,
            ...config
        })
}
export default http
```

**第一个版本和第二个版本的使用，都是一样的，如下：**

 使用

①main.js中引用

```javascript
//main.js
import http from "@/libs/request";
Vue.prototype.$http = http;
```

②vue文件中使用

```html
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
    name: 'app',
    components: {
},
    created() {
    this.$http.post("/cmdb-base/instanceAsst/findAllInstanceAsstListApp", this.dataForm).then(({ data: res }) => {
    if (res.code != "S1A00000") {
    this.groupList = []
    return this.$toast.fail(res.msg)
}
    this.groupList = res.data || []
}).finally(() => {
    this.dataLoading = false
})
}
}
</script>
<style>
</style>
```

 ③ 其他js中的使用，比如vuex的store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import HTTP from '@/libs/request'
import sysConfig from './module/sysConfig'
import {
    setToken
} from '@/libs/util'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {
        handleNewLogin({
                           state,
                           commit
                       }, {
                           type,
                           appSessionKey,
                           account,
                           pwd,
                           userType
                       }) {
            return new Promise((resolve) => {
                let url = ""
                let method = ""
                let params = null
                if (type === 'local') {
                    url = '/cmdb-rbac/v1/sysLogin/login'
                    method = 'post'
                    params = {
                        account: account.trim(),
                        pwd: pwd,
                        userType
                    }
                } else {
                    url = '/base-auth/oauth/login'
                    method = 'get'
                    params = {
                        [state.sysConfig.sso.appSessionKey]: appSessionKey,
                        // [state.sysConfig.sso.redirectKey]: state.sysConfig.sso.redirectValue
                    }
                }
                HTTP[method](url, params).then(({data: res}) => {
                    if (res.code !== 'S1A00000') {
                        resolve(res)
                        return
                    }
                    setToken(res.data.token)
                    localStorage.setItem('tenantId', res.data.userInfo.user.tenantId)
                    localStorage.setItem('expireTime', res.data.expireTime)
                    resolve(res)
                })
                    .catch((err) => {
                        resolve({
                            code: 'E0B00001',
                            'msg': err.message
                        })
                    }).finally(() => {
                })
            })
        },
    },
    modules: {
        sysConfig
    }
    // plugins: [persistedState()]
})
```





# 第三个版本

```javascript
import axios from 'axios'
import {message} from 'ant-design-vue'
import Cookie from 'js-cookie'

let isFormData = (v) => {
    return Object.prototype.toString.call(v) === '[object FormData]';
}
axios.defaults.timeout = 10000
// axios.defaults.withCredentials = trueÏ
axios.defaults.crossDomain = true
let sessions = {}
//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (!isFormData(config.data)) {
            config.data = JSON.stringify(config.data)
        }
        const jwt = Cookie.get('jwt');
        const sessions = Cookie.get('sessions') ? JSON.parse(Cookie.get('sessions')) : {}
        // 判断是否是登录请求
        // true
        if (config.url.indexOf('admin-user/login') > -1) {
            config.headers = {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        } else {
            // false
            // 判断是否有登录token
            if (jwt) {
                if (isFormData(config.data)) {
                    config.headers = {
                        "Content-Type": "multipart/form-data",
                        'Authorization': jwt,
                        ...sessions
                    }
                } else {
                    config.headers = {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': jwt,
                        ...sessions
                    }
                }
            } else {
                if (isFormData(config.data)) {
                    config.headers = {
                        "Content-Type": "multipart/form-data",
                        ...sessions
                    }
                } else {
                    config.headers = {
                        'Content-Type': 'application/json;charset=UTF-8',
                        ...sessions
                    }
                }
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
//http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log('success',response)
        response.headers.Authorization && Cookie.set('jwt', 'Bearer ' + response.headers.Authorization, {expires: 7})
        return response;
    },
    err => {
        console.log('fail', err.response)
        console.log('fail', err)
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break
                case 401:
                    break
                case 403:
                    err.message = '登录过期，请重新登录'
                    break
                case 404:
                    err.message = '网络请求不存在'
                    break
                case 408:
                    break
                case 500:
                    err.message = '请求错误'
                    break
                case 501:
                    err.message = '服务未实现'
                    break
                case 502:
                    err.message = '网关错误'
                    break
                case 503:
                    err.message = '服务不可用'
                    break
                case 504:
                    err.message = '网关超时'
                    break
                case 505:
                    err.message = 'HTTP版本不受支持'
                    break
                default:
            }
        } else {
            err.message = '网络出现问题，请稍后再试'
        }
        message.error(err.message);
        return Promise.reject(err)
    }
)

/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
    sessions = Cookie.get('sessions') ? JSON.parse(Cookie.get('sessions')) : {}
    return new Promise((resolve, reject) => {
        axios.get(Util.baseUrl + url, {
            params: params
        })
            .then(response => {
                // 请求成功
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(Util.baseUrl + url, data)
            .then(response => {
                // 请求成功
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post请求 params
 * @param url
 * @param data
 * @returns {Promise}
 */
export function postParams(url, params = {}, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: Util.baseUrl + url,
            params: params,
            body: data
        })
            .then(response => {
                console.log(response)
                // 请求成功
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 文件上传 uploadFile(使用post请求)
 * @param url
 * @param data
 * @returns {Promise}
 * @param 不需要传passportId
 *
 *$$$$$$参数module取值参考如下$$$$$$$$$
 *运营中心服务【租户、秘钥】  【20010】
 'spm-operation'
 *统一组织机构服务[组织、部门等] 【20020】
 'spm-org-structure'
 *权限管理服务[资源菜单、角色、用户等] 【20030】
 'spm-admin'
 *账号信息服务[统一账号、账户管理] 【20040】
 'spm-passport'
 *统一鉴权中心服务[Token管理、认证、刷新] 【20050】
 'spm-auth-server'
 *应用中心服务[应用注册] 【20060】
 'spm-app-center'
 *第三方服务【提供短信、消息推送】 【20070】
 'spm-third-party'
 *系统服务（基础数据、版本、服务等） 【20080】
 'spm-system'
 *文件服务[文件/图片上传下载/处理等功能] 【20090】
 'spm-file-upload'
 *即时通讯信息服务[im管理] 【20100】
 'spm-im'
 *日志监控服务logstash  【20110】
 'spm-logstash'
 */
export function uploadFile(data = {}) {
    return new Promise((resolve, reject) => {
        //固定参数
        const fixedParams = {
            appId: 'spm',
            appName: 'spm',
        }
        //合并参数
        let params = {...fixedParams, ...data}
        //创建formData 并赋值
        let formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key])
        }
        //请求后台
        axios({
            method: 'post',
            url: 'http://39.105.163.75:20090/V1.0.0/api/file/upload',
            data: formData,
        })
            .then(response => {
                // 请求成功
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function uploadImg(data = {}) {
    return new Promise((resolve, reject) => {
        //请求后台
        axios({
            method: 'post',
            url: 'http://39.105.163.75:20090/V1.0.0/api/file/upload',
            data: data,
        })
            .then(response => {
                // 请求成功
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function exportFile(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: Util.baseUrl + url,
            data: data,
            responseType: 'arraybuffer'
        })
            .then(response => {
                // 请求成功
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 并发请求
 * @param requestLists
 * @returns {Promise<any>}
 */
export function getAll(requestLists = []) {
    let counter = 1 // 请求次数
    let maxRequestTimes = 5 // 最大请求次数，因为有可能别个页面就是访问不了，请求多少次也没用- -
    let result = [] // 最后的结果
    let failedList = []
    return new Promise((resolve, reject) => {
        axios.all(requestLists)
            .then(response => {
                result = result.concat(response.filter(i => i)) // filter返回true的时候保留该数组项，因为getDataById的catch里没有给返回值（这里也不需要），这里的resolve里就会有undefined，需要过滤掉
                let failedLength = failedList.length
                if (failedLength > 0 && counter < maxRequestTimes) { // 如果失败列表里有请求，并且请求次数不超过设定的值，就进行下一次请求，并且打出log
                    console.log(`第${counter}次请求完成，其中成功${requestLists.length - failedLength}个，失败${failedLength}个，正在进行第${++counter}次请求...`)
                    getAll(failedList)
                    failedList = [] // 这里要清空failedList，不然会一直调用。不用担心，下一次请求失败的会在getAll填充到failedList里。
                } else { // 表示所有请求都成功了，或者达到了最大请求次数。到这里就可以对result做进一步处理了。
                    console.log(`请求完成，共请求${counter}次, 其中成功${requestLists.length - failedLength}个，失败${failedLength}个\n`, result)
                    counter = 1
                    resolve(response)
                }
            })
            .catch(err => {
                reject(err)
            })
    })

```