import axios from 'axios'

// export function getBalanceData(query) {
//   return request({
//     url: '/total_balance_data',
//     method: 'post',
//     query
//   })
// }

function getBalanceData(params) {
// body...
  return axios.get('http://127.0.0.1:5001/total_balance_data', { params: params })
}

function getAllSymbolBalance(params) {
  return axios.get('http://127.0.0.1:5001/all_symbol_balance', { params: params })
}

module.exports = {
  getBalanceData,
  getAllSymbolBalance
}

