import axios from 'axios'

// export function getBalanceData(query) {
//   return request({
//     url: '/total_balance_data',
//     method: 'post',
//     query
//   })
// }

function getAllTradingVolume(params) {
// body...
  // return axios.get('http://18.179.204.45:5001/get_all_trading_volume', { params: params })
  return axios.get('http://127.0.0.1:5001/get_all_trading_volume', { params: params })
}

// function getAllSymbolBalance(params) {
//   return axios.get('http://18.179.204.45:5001/all_symbol_balance', { params: params })
// }

// function getTotalETH(params) {
//   return axios.get('http://18.179.204.45:5001/get_total_ETH', { params: params })
// }

module.exports = {
  getAllTradingVolume
}

