import {
    CategoryModel
} from '../../models/category'

const categoryModel = new CategoryModel()


Page({
    data: {
        currentMenuIndex: 0,
        loadedData: {},
        categoryTypeArr: null,
        loadingCenter: true,
        categoryProducts: null
    },

    onLoad: function () {
        this._loadData();
    },

    //判断当前分类数据是否已经被加载
    isLoadedData: function (index) {
        if (this.data.loadedData[index]) {
            return true;
        }
        else {
            return false;
        }
    },

    _loadData: function (callback) {
        categoryModel.getCategories()
            .then(res=>{
                this.setData({
                    categoryTypeArr: res
                })
                return categoryModel.getCategory(res[0].id)
            })
            .then(res => {
                var dataObj = {
                    procucts: res.products,
                    topImgUrl: res.pic,
                    name: res.name
                };
                this.setData({
                    categoryProducts: dataObj
                });
                this.data.loadedData[0] = dataObj;
                callback && callback();
            })
            .catch(res => {
                console.log(res);
            })
    },

    changeCategory: function (event) {
        var index = event.currentTarget.dataset.index;
        var id = event.currentTarget.dataset.id;

        this.setData({
            currentMenuIndex: index
        });

        if (!this.isLoadedData(index)) {
            //如果没有加载过当前分类的商品数据
            categoryModel.getCategory(id)
              .then(res => {
                var dataObj = {
                    procucts: res.products,
                    topImgUrl: res.pic,
                    name: res.name
                };
                this.setData({
                    categoryProducts: dataObj
                });
                this.data.loadedData[index] = dataObj;
              })
        } else {
            //如果已经加载过当前分类商品数据，直接加载
            this.setData({
                categoryProducts: this.data.loadedData[index]
            });
        }
    },

    onPullDownRefresh: function () {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function () {
    }
})