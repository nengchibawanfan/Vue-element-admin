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
  return axios.get('http://18.179.204.45:5001/get_all_trading_volume', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_all_trading_volume', { params: params })
}

function getSingleMarketTradingVolume(params) {
  return axios.get('http://18.179.204.45:5001/get_trading_volume_single_market', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_trading_volume_single_market', { params: params })
}

// 获取真实用户数量
function getRealuserNum(params) {
  return axios.get('http://18.179.204.45:5001/get_realuser_num_info', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_realuser_num_info', { params: params })
}

module.exports = {
  getAllTradingVolume,
  getSingleMarketTradingVolume,
  getRealuserNum
}

