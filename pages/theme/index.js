import {
    ThemeModel
} from '../../models/theme'

const themeModel = new ThemeModel()


Page({
    data: {
        theme: null,
        loadingCenter: true
    },
    
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.titleName
        });
    },
    
    onLoad: function (option) {
        this.data.titleName = option.name;
        this.data.id = option.id;
        this._loadData();

    },

    _loadData: function (callback) {
        var that = this;
        themeModel.getTheme(that.data.id)           
            .then(res => {
                this.setData({
                    theme: res,
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

    onShareAppMessage: function () {
    }
})