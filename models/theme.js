import {
    HTTP
}
    from '../utils/http'

class ThemeModel extends HTTP {
    getThemes() {
        return this.request({
            url: 'themes'
        })
    }

    getTheme(id) {
        return this.request({
            url: 'themes/' + id
        })
    }    
}

export {
    ThemeModel
}