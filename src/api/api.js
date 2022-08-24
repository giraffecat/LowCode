import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export class Login {       // 模块一
    /**
     * @description 用户登录
     * @param {string} username - 用户名
     * @return {HttpResponse} result
     */
    static async login() {   // 接口一
      let res = await request('/oauth/github',{}, {} ,'GET')
      let url = res.data;
      // console.log("ruasdal",url)
      window.location.href = url;
    }
    static async getUserInfo(access_token) {   // 接口一
      let headers = {
        'Authorization': 'token ' + access_token
      }
      let userInfo = await request(`https://api.github.com/user`,headers, {}, "Get")
      .catch(err => {
        console.log("err", err)
      })
      return userInfo
    }
}
