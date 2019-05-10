import axios from 'axios'

function getRealuserChipDistribution(params) {
// body...
  return axios.get('http://18.179.204.45:5001/get_realuser_chip_distribution', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_realuser_chip_distribution', { params: params })
}

function getRealuserChipDistributionInfo(params) {
// body...
  return axios.get('http://18.179.204.45:5001/get_realuser_chip_distribution_details', { params: params })
  // return axios.get('http://127.0.0.1:5001/get_realuser_chip_distribution_details', { params: params })
}

module.exports = {
  getRealuserChipDistribution,
  getRealuserChipDistributionInfo
}

