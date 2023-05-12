import http from '@/utils/http'

export function getBannerAPI(params = {}) {
    const {distributionSite = '1'} = params
    return http({
        url: 'home/banner',
        params: {
            distributionSite
        }
    })
}

export const getNewAPI= () =>{
    return http({
        url: '/home/new'
    })

}

export const getHotAPI = () =>{
    return http({
        url: '/home/hot'
    })
}

export const getGoodsAPI = () =>{
    return http({
        url: '/home/goods'
    })
}