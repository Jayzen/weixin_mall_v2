import {
    ProductModel
} from '../../models/product'
import {
    CartModel
} from '../../models/cart.js';

const cartModel = new CartModel();
const productModel = new ProductModel()


Page({
    data: {
        loadingHidden: false,
        hiddenSmallImg: true,
        countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        productCounts: 1,
        currentTabsIndex: 0,
        cartTotalCounts: 0
    },

    onLoad: function(option) {
        var id = option.id;
        this.data.id = id;
        this._loadData();
    },

    _loadData: function(callback) {
        var that = this;
        productModel.getProduct(that.data.id)
            .then(res => {
                that.setData({
                    cartTotalCounts: cartModel.getCartTotalCounts().counts1,
                    product: res,
                    loadingHidden: true
                });
                callback && callback();
            })
            .catch(res => {
                console.log(res);
            })
    },

    //选择购买数目
    bindPickerChange: function(e) {
        this.setData({
            productCounts: this.data.countsArray[e.detail.value]
        })
    },

    //切换详情面板
    onTabsItemTap: function(event) {
        var index = event.currentTarget.dataset.index;
        this.setData({
            currentTabsIndex: index
        });
    },

    /*添加到购物车*/
    onAddingToCartTap: function(events) {
        this.addToCart();
        this.setData({
            cartTotalCounts: cartModel.getCartTotalCounts().counts1,
        });
    },

    /*将商品数据添加到内存中*/
    addToCart: function() {
        var tempObj = {},
            keys = ['id', 'name', 'current_price', 'pic'];
        for (var key in this.data.product) {
            if (keys.indexOf(key) >= 0) {
                tempObj[key] = this.data.product[key];
            }
        }
        cartModel.add(tempObj, this.data.productCounts);
    },

    /*跳转到购物车*/
    onCartTap: function() {
        wx.switchTab({
            url: '/pages/cart/index'
        });
    },

    onPullDownRefresh: function() {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function() {}
})