const express = require('express')
const app = express()
const product = require('../controllers/product')

let PRODUCTS_DB = []


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/productos", (req, res) => {
    const products = product.get()
    if (!products) {
        return res.status(404).json({
            error: "no hay productos cargados"
        })
    }

    res.json(products);
})

app.post("/api/productos", (req, res) => {
    const data = req.body
    if (product.add(data)) {
        res.status(201).json(data)
    }
    res.status(400).send()
})

app.put("/api/productos/:id", (req, res) => {
    const data = req.body
    const { id } = req.params
    if (product.update(id, data)) {
        res.status(201).json(data)
    }
    res.status(400).send()
})

app.get("/api/productos/:id", (req, res) => {
    const { id } = req.params
    const currentProduct = product.getById(id)
    if (currentProduct) {
        return res.json(currentProduct)
    }
    res.status(404).json({ error: "producto no encontrado" })
})

app.delete("/api/productos/:id", (req, res) => {
    const { id } = req.params
    product.remove(id)
    res.send()
})

app.listen(8080)