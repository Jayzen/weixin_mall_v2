import {
    HTTP
}
    from '../utils/http'

class CategoryModel extends HTTP {
    getCategories() {
        return this.request({
            url: 'product_sorts'
        })
    }

    getCategory(id) {
        return this.request({
            url: 'product_sorts/' + id
        })
    }
}

export {
    CategoryModel
}