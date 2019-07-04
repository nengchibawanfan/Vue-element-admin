import request from '@/utils/request'

export function startMarketMake(params) {
  return request({
    url: '/market_make/start',
    method: 'post',
    data: params
  })
}

export function reStartMarketMake(params) {
  return request({
    url: '/market_make/restart',
    method: 'post',
    data: params
  })
}

export function stopMarketMake(params) {
  return request({
    url: '/market_make/stop',
    method: 'post',
    data: params
  })
}
