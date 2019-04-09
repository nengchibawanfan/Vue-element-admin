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
  return axios.get('http://127.0.0.1:5000/total_balance_data', { params: params })
}

module.exports = {
  getBalanceData
}

