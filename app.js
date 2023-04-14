const express = require("express")
const fs = require("fs")

const ProductManager = require("./ProductManager")

const manager = new ProductManager("./producto.json")

manager.addProduct("producto 1","Este es un producto prueba",200,"Sin imagen","abc12341",25)
manager.addProduct("producto 2","Este es un producto prueba",200,"Sin imagen","abc12342",25)
manager.addProduct("producto 3","Este es un producto prueba",200,"Sin imagen","abc12343",25)
manager.addProduct("producto 4","Este es un producto prueba",200,"Sin imagen","abc12344",25)
manager.addProduct("producto 5","Este es un producto prueba",200,"Sin imagen","abc12345",25)
manager.addProduct("producto 6","Este es un producto prueba",200,"Sin imagen","abc12346",25)
manager.addProduct("producto 7","Este es un producto prueba",200,"Sin imagen","abc12347",25)
manager.addProduct("producto 8","Este es un producto prueba",200,"Sin imagen","abc12348",25)
manager.addProduct("producto 9","Este es un producto prueba",200,"Sin imagen","abc12349",25)
manager.addProduct("producto 10","Este es un producto prueba",200,"Sin imagen","abc123410",25)

const PUERTO = 8080

const servidor = express()

servidor.get("/",(req,res)=>{
  res.send("Servidor Express")
})

servidor.get("/productos/:id",(req,res)=>{
  const id = parseInt(req.params.id)
  const producto = manager.getProductById(id)
  if(producto === undefined){
    res.send("El ID ingresado no existe")
  }else{
    res.send(producto)
  }
}) 

servidor.get("/productos",(req,res)=>{
  const prodArray = manager.getProducts()
  const numberLimit = req.query.limit
  const prodLimit = prodArray.slice(0,numberLimit)
  res.send(prodLimit)
})

servidor.listen(PUERTO, ()=>{
  console.log(`Servidor activo en puerto ${PUERTO}`)
})