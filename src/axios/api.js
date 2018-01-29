import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  axios.defaults.baseUrl = 'localhost'
// 请求时的拦截
axios.interceptors.request.use(function (config) {
    // 发送请求之前做一些处理
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  // 当请求异常时做一些处理
  return Promise.reject(error)
})

// 响应时拦截
axios.interceptors.response.use(function (response) {
    // 返回响应时做一些处理
  return response
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

export function post (url, params) {
  return new Promise((resolve, reject) => {
  axios.post(url, params)
  .then(response => {
    resolve(response.data)
  }, err => {
    reject(err)
  })
  .catch((error) => {
    reject(error)
  })
  })
}

export function get (url, params) {
return new Promise((resolve, reject) => {
axios.get(url, params)
.then(response => {
  resolve(response.data)
}, err => {
  reject(err)
})
.catch((error) => {
  reject(error)
})
})
}

// export default {
//     /**
//      * 广告列表
//      page,page_size,company,start_created_at,end_created_at,start_online_at,end_online_at,put_in_page,put_in_position
//      http://192.168.1.100/index.php?s=/1&page_id=373
//      */
//   banner_list (params) {
//     return post('advertise/list', params)
//   },
//     /**
//      * 广告详情
//      http://192.168.1.100/index.php?s=/1&page_id=374
//      */
//   banner_detail (id) {
//     return post('advertise/detail', {id: id})
//   }
// }
