import request from '@/utils/request'

export function getAmountInfo(params) {
  return request({
    url: '/get_amount_info',
    method: 'get',
    params: params
  })
}

// import axios from 'axios'

// function getAmountInfo(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/get_amount_info', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_amount_info', { params: params })
// }

// module.exports = {
//   getAmountInfo
// }
