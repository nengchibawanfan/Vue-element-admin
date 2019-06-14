// import axios from 'axios'

// function getRealuserChipDistribution(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/get_realuser_chip_distribution', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_realuser_chip_distribution', { params: params })
// }

// function getRealuserChipDistributionInfo(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/get_realuser_chip_distribution_details', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_realuser_chip_distribution_details', { params: params })
// }

// function getSingleRealuserChipDistributionInfo(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/get_realuser_chip_distribution_details2', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_realuser_chip_distribution_details2', { params: params })
// }

// module.exports = {
//   getRealuserChipDistribution,
//   getRealuserChipDistributionInfo,
//   getSingleRealuserChipDistributionInfo
// }

import request from '@/utils/request'

export function getRealuserChipDistribution(params) {
  return request({
    url: '/get_realuser_chip_distribution',
    method: 'get',
    params: params
  })
}

export function getRealuserChipDistributionInfo(params) {
  return request({
    url: '/get_realuser_chip_distribution_details',
    method: 'get',
    params: params
  })
}

export function getSingleRealuserChipDistributionInfo(params) {
  return request({
    url: '/get_realuser_chip_distribution_details2',
    method: 'get',
    params: params
  })
}
