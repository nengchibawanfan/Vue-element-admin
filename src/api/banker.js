
import request from '@/utils/request'

export function getBankerInfo(params) {
  return request({
    url: '/get_banker_info',
    method: 'get',
    params: params
  })
}

