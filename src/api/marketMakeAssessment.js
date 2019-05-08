import axios from 'axios'

function getMarketMakeAssessment(params) {
// body...
  // return axios.get('http://18.179.204.45:5001/market_make_assessment', { params: params })
  return axios.get('http://127.0.0.1:5001/market_make_assessment', { params: params })
}

function getMarketMakeAssessmentInfo(params) {
// body...
  // return axios.get('http://18.179.204.45:5001/market_make_assessment_details', { params: params })
  return axios.get('http://127.0.0.1:5001/market_make_assessment_details', { params: params })
}

module.exports = {
  getMarketMakeAssessment,
  getMarketMakeAssessmentInfo
}

