import {
    HTTP
}
    from '../utils/http'

class BannerModel extends HTTP {
    getFirstBanner() {
        return this.request({
            url: 'banners/first'
        })
    }
}

export {
    BannerModel
}