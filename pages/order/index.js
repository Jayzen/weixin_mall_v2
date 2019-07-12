import {
    AddressModel
} from '../../models/address'
import {
    CartModel
} from '../../models/cart.js';

const cartModel = new CartModel();
const addressModel = new AddressModel()


Page({
    data: {
        currentMenuIndex: 0,
    },

    onLoad: function(options) {
        var productsArr;
        this.data.account = options.account;
        productsArr = cartModel.getCartDataFromLocal(true);

        this.setData({
            productsArr: productsArr,
            account: options.account,
            orderStatus: 0
        });

        this._loadData();
    },

    _loadData: function(callback) {
        addressModel.getAddress()
            .then(res => {
                if (res != null){
                    var addressInfo = {
                        name: res.name,
                        mobile: res.mobile,
                        totalDetail: addressModel.setAddressInfo(res)
                    }
                    this._bindAddressInfo(addressInfo);
                } 
                callback && callback();
            })
            .catch(res => {
                console.log(res);
            })
    },

    editAddress: function(event) {
        var that = this;
        wx.chooseAddress({
            success: function(res) {
                var addressInfo = {
                    name: res.userName,
                    mobile: res.telNumber,
                    totalDetail: addressModel.setAddressInfo(res)
                }
                that._bindAddressInfo(addressInfo);

                //保存地址
                addressModel.updateAddress(res)
                    .then(res => {
                        // console.log(res)
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        })
    },

    /*绑定地址信息*/
    _bindAddressInfo: function(addressInfo) {
        this.setData({
            addressInfo: addressInfo
        });
    },

    onPullDownRefresh: function() {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function() {}
})