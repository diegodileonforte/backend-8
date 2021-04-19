let PRODUCTS_DB = []

class ProductController {

    constructor() {

    }

    add(data) {
        if (data.title === "" || typeof data.title === 'undefined') return false
        data.id = PRODUCTS_DB.length + 1
        PRODUCTS_DB.push(data)
        return true
    }

    get() {
        if (PRODUCTS_DB.length < 1) return false
        return PRODUCTS_DB
    }

    getById(id) {
        return PRODUCTS_DB.filter((product) => product.id === parseInt(id))[0]
    }

    update(id, data) {
        PRODUCTS_DB = PRODUCTS_DB.map(product => {
            if(product.id === parseInt(id)){
                product.title = data.title
                product.price = data.price
                product.thumbnail = data.thumbnail 
            }
            return product
        })
     }

    remove(id) {
        PRODUCTS_DB = PRODUCTS_DB.filter((product) => product.id !== parseInt(id))
    }
}

module.exports = new ProductController()
