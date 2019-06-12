import axios from 'axios'

function getBttInfo(params) {
// body...
  return axios.get('http://18.179.204.45:5001/get_btt_info', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_btt_info', { params: params })
}

function getETHCharge(params) {
  return axios.get('http://18.179.204.45:5001/get_eth_charge', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_eth_charge', { params: params })
}

module.exports = {
  getBttInfo,
  getETHCharge
}

