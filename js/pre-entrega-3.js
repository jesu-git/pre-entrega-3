
let sectionMostrar = document.querySelector("#sectionMostrar");
let btnComprar = document.querySelectorAll(".btnComprar");
let contador = document.querySelector("#contador");
const a = document.getElementById("a");
const botonesCategoria = document.querySelectorAll(".botonesCategoria")
const http = "https://6488da890e2469c038fe72f9.mockapi.io/products";


let bdBajada = [];

let carrito;
let carritoLs = localStorage.getItem("ProductosCarrito"); 

if(carritoLs){
    carrito = JSON.parse(carritoLs);
}
else{
    carrito = [];
}
function cargarArticulos(categoria){
    sectionMostrar.innerHTML="";
    categoria.forEach((articulo)=>{
        const{nombre,precio,bebida,id} = articulo;
        let div = document.createElement("div");
        div.classList.add("articulos");
        div.innerHTML = `
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${bebida}</p>
        <button type="button" class="btn btn-danger btnComprar"id="${id}">Comprar</button
          `;
          sectionMostrar.append(div) 
    })
    botonesComprar()
}
function botonesComprar(){ 
    btnComprar = document.querySelectorAll(".btnComprar")
    btnComprar.forEach(boton=>{ boton.addEventListener("click",agregarAcarrito)})
   }
function agregarAcarrito(e){
    const id = e.currentTarget.id;
    const articuloPedido = bdBajada.find(x => x.id === id);
     carrito.push(articuloPedido)
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))
}
function bajarApi(){
    fetch(http)
    .then((res)=> res.json())
    .then((datos)=>{
        console.log(datos)
       datos.forEach(x =>{bdBajada.push(x)})
    })
    cargarArticulos(bdBajada)
}
botonesCategoria.forEach(boton => {
    boton.addEventListener("click",(e)=>{    
        if(e.currentTarget.id != "todos"){ 
        const productosBoton = bdBajada.filter( x => x.categoria === e.currentTarget.id)
        cargarArticulos(productosBoton)
        }
     else{
        cargarArticulos(bdBajada)
        }
        })})
    
 bajarApi()   



   
