const express = require('express')

const app = express()

const Contenedor =  require ('./Desafio2.js')
const contenedor = new Contenedor ('productos.txt')

async function mostrarProductos (req,res) { 
  const lista = await contenedor.getAll()
  res.send(`La lista de productos del servidor es la siguiente:
  ${lista}!`)
}

async function productoAleatorio (req,res) { 
  const lista = await contenedor.getAll()
  const productosJSON = JSON.parse(lista)
  let azar = Math.floor(Math.random() * productosJSON.length + 1)
  const seleccion = await contenedor.getByID(azar)
  res.json(seleccion)
}

app.get('/productos', mostrarProductos)
        
app.get('/productoRandom', productoAleatorio)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))