// import axios from 'axios'

// // export function getBalanceData(query) {
// //   return request({
// //     url: '/total_balance_data',
// //     method: 'post',
// //     query
// //   })
// // }
// function getIndexInfo(params) {
//   // return axios.get('http://18.179.204.45:5001/get_index_info', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_index_info', { params: params })
// }

// function getDetailIndexInfo(params) {
//   // return axios.get('http://18.179.204.45:5001/get_detail_index_info', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_detail_index_info', { params: params })
// }

// module.exports = {
//   getIndexInfo,
//   getDetailIndexInfo
// }

import request from '@/utils/request'

export function getIndexInfo(params) {
  return request({
    url: '/get_index_info',
    method: 'get',
    params: params
  })
}

export function getDetailIndexInfo(params) {
  return request({
    url: '/get_detail_index_info',
    method: 'get',
    params: params
  })
}

