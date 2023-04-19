const fs = require("fs")

class ProductManager{
  static ultimo_id = 0
  constructor(ruta){
    this.ruta = ruta
    this.products = []
  }
  
  getProducts(){
    const products = fs.readFileSync(this.ruta, "utf-8")
    return JSON.parse(products)
  }

  addProduct(title, description,price,thumbnail,code,stock){
    ProductManager.ultimo_id = ProductManager.ultimo_id +1
    const producto_nuevo = {
      id: ProductManager.ultimo_id,
      title: title,
      description: description,
      price:price,
      thumbnail: thumbnail,
      code:code,
      stock:stock
    }
    
    const keys = Object.keys(producto_nuevo)
    const values = Object.values(producto_nuevo)
    const obligatorios = [ 'id', 'title', 'description', 'price', 'thumbnail', 'code', 'stock' ]
    const sameCode = this.products.find((prod)=>prod.code === producto_nuevo.code)
    
   
    if (obligatorios.every(val => keys.includes(val)) && !values.includes(undefined)) {
      if(!sameCode){
        this.products.push(producto_nuevo)
        const cadenaArchivo = JSON.stringify(this.products)
        fs.writeFileSync(this.ruta, cadenaArchivo)
        console.log("Archivo actualizado")
      }else{
        console.log("Los productos no pueden incluir el mismo code")
      }
    }else{
      console.log("Es obligatorio incluir todos los campos")
    }
  }

  getProductById(id){
    const products = JSON.parse(fs.readFileSync(this.ruta, "utf-8"))
    const filterId = products.filter((prod)=> (prod.id == id)) 
    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      return filterId
    }
  }

  updateProduct(id, campo, value){
    const products = JSON.parse(fs.readFileSync(this.ruta, "utf-8"))
    const filterId = products.filter((prod)=> (prod.id == id))

    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      const filterOtherId = this.products.filter((prod)=> (prod.id !== id))
      filterId.map((elemento)=> (elemento[campo]= value))
  
      const cadenaProductos = [...filterOtherId, ...filterId]
      this.products = cadenaProductos
      console.log("Producto editado") 
      return this.products
    }
  }

  deleteProduct(id){
    const products = JSON.parse(fs.readFileSync(this.ruta, "utf-8"))
    const filterId = products.filter((prod)=> (prod.id == id)) 
    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      const filterIdDelete = this.products.filter((prod)=> (prod.id !== id))
      this.products = filterIdDelete
      console.log("Producto eliminado") 
      return this.products
    }
  }
}

module.exports = ProductManager
