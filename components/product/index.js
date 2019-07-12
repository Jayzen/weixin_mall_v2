Component({
    properties: {
        products: {
            type: Array
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
