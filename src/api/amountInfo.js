import axios from 'axios'

// export function getBalanceData(query) {
//   return request({
//     url: '/total_balance_data',
//     method: 'post',
//     query
//   })
// }

function getAmountInfo(params) {
// body...
  return axios.get('http://18.179.204.45:5001/get_amount_info', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_amount_info', { params: params })
}

module.exports = {
  getAmountInfo
}