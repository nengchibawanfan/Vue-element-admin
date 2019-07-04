import request from '@/utils/request'

export function changeLoginPws(params) {
  return request({
    url: '/changepwd/loginpwd',
    method: 'post',
    data: params
  })
}

export function changeMarketMakePwd(params) {
  return request({
    url: '/changepwd/marketmakepwd',
    method: 'post',
    data: params
  })
}
