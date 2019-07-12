import {
    HTTP
}
from '../utils/http'

class ProductModel extends HTTP {
    getHomeProducts() {
        return this.request({
            url: 'home_products'
        })
    }

    getProduct(id){
        return this.request({
            url: 'products/' + id
        })
    }
}

export {
    ProductModel
}