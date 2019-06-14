// import axios from 'axios'

// // export function getBalanceData(query) {
// //   return request({
// //     url: '/total_balance_data',
// //     method: 'post',
// //     query
// //   })
// // }

// function getBalanceData(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/single_coin_total_balance_data', { params: params })
//   return axios.get('http://127.0.0.1:5001/single_coin_total_balance_data', { params: params })
// }

// function getAllSymbolBalance(params) {
//   // return axios.get('http://18.179.204.45:5001/all_symbol_balance', { params: params })
//   return axios.get('http://127.0.0.1:5001/all_symbol_balance', { params: params })
// }

// function getTotalETH(params) {
//   // return axios.get('http://18.179.204.45:5001/get_total_ETH', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_total_ETH', { params: params })
// }

// module.exports = {
//   getBalanceData,
//   getAllSymbolBalance,
//   getTotalETH
// }

import request from '@/utils/request'

export function getBalanceData(params) {
  return request({
    url: '/single_coin_total_balance_data',
    method: 'get',
    params: params
  })
}

export function getAllSymbolBalance(params) {
  return request({
    url: '/all_symbol_balance',
    method: 'get',
    params: params
  })
}

export function getTotalETH(params) {
  return request({
    url: '/get_total_ETH',
    method: 'get',
    params: params
  })
}
