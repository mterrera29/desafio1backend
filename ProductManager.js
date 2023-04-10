const fs = require("fs")

class ProductManager{
  static ultimo_id = 0
  constructor(ruta){
    this.ruta = ruta
    this.products = []
  }
  
  getProducts(){
    return this.products
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
   
    if (obligatorios.every(val => keys.includes(val)) && !values.includes(undefined)){
      this.products.push(producto_nuevo)
      const cadenaArchivo = JSON.stringify(this.products)
      fs.writeFileSync(this.ruta, cadenaArchivo)
      console.log("Archivo actualizado")
    }else{
      console.log("Es obligatorio incluir todos los campos")
    }
  }

  getProductById(id){
    const filterId = this.products.filter((prod)=> (prod.id == id)) 
    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      return filterId
    }
  }

  updateProduct(id, campo, value){
    const filterId = this.products.filter((prod)=> (prod.id == id))

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
    const filterId = this.products.filter((prod)=> (prod.id == id)) 
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

const manager = new ProductManager("./producto.json")


manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123", 25)
manager.addProduct("producto 2","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.addProduct("producto 3","Este es un producto prueba",200,"Sin imagen","abc123",25)

console.log(manager.getProducts())

console.log (manager.getProductById(2))

console.log(manager.updateProduct(2, "price", 500))

console.log (manager.deleteProduct(2))