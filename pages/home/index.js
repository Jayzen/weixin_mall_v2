import {
    BannerModel
} from '../../models/banner'
import {
    ProductModel
} from '../../models/product'
import {
    ThemeModel
} from '../../models/theme'

const bannerModel = new BannerModel()
const productModel = new ProductModel()
const themeModel = new ThemeModel()



Page({
    data: {
        themes: null,
        product_homes: null,
        banner: null,
        loadingCenter: true
    },

    onLoad: function () {
        this._loadData();
    }, 

    _loadData: function (callback) {
        bannerModel.getFirstBanner()
            .then(res => {
                this.setData({
                    banner: res
                })
                return themeModel.getThemes()
                
            })
            .then(res => {
                this.setData({
                    themes: res,
                })
                return productModel.getHomeProducts()
            })
            .then(res => {
                this.setData({
                    product_homes: res,
                    loadingCenter: false
                })
                callback && callback();
            })
            .catch(res => {
                console.log(res);
            })
    },

    onPullDownRefresh: function () {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onThemesItemTap: function (event) {
        var id = event.currentTarget.dataset.id
        var name = event.currentTarget.dataset.name
        wx.navigateTo({
            url: '../theme/index?id=' + id + '&name=' + name
        })
    },

    onProductsItemTap: function(event){
        var id = event.currentTarget.dataset.productId
        wx.navigateTo({
            url: '../product/index?id=' + id
        })
    },

    onShareAppMessage: function () {
    }
})
