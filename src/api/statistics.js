// import axios from 'axios'

// // export function getBalanceData(query) {
// //   return request({
// //     url: '/total_balance_data',
// //     method: 'post',
// //     query
// //   })
// // }

// function getStatistics(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/get_statistics', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_statistics', { params: params })
// }

// module.exports = {
//   getStatistics
// }

import request from '@/utils/request'

export function getStatistics(params) {
  return request({
    url: '/get_statistics',
    method: 'get',
    params: params
  })
}

