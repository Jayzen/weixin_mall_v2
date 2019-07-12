Component({
    properties: {
        categoryInfo: {
            type: Object
        }
    },

    data: {
    },

    methods: {
        onProductsItemTap: function (event) {
            var id = event.currentTarget.dataset.id
            wx.navigateTo({
                url: '../product/index?id=' + id
            })
        }
    }
})
