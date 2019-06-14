// import axios from 'axios'

// function getMarketmakeIndicator(params) {
// // body...
//   // return axios.get('http://18.179.204.45:5001/get_marketmake_indicator', { params: params })
//   return axios.get('http://127.0.0.1:5001/get_marketmake_indicator', { params: params })
// }

// module.exports = {
//   getMarketmakeIndicator
// }

import request from '@/utils/request'

export function getMarketmakeIndicator(params) {
  return request({
    url: '/get_marketmake_indicator',
    method: 'get',
    params: params
  })
}

export function getMarketMakeAssessmentInfo(params) {
  return request({
    url: '/market_make_assessment_details',
    method: 'get',
    params: params
  })
}

