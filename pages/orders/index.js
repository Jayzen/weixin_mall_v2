import {
    OrderModel
} from '../../models/order'

const orderModel = new OrderModel()

Page({
    data: {

    },

    onLoad: function () {
        this._loadData();
    },

    _loadData: function (callback) {
        orderModel.getOrders()
            .then(res => {
                this.setData({
                    orderArr: res
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

    onShareAppMessage: function () {
    }
})