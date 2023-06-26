
let sectionMostrar = document.querySelector("#sectionMostrar");
let btnComprar = document.querySelectorAll(".btnComprar");
let contador = document.querySelector("#contador");
const a = document.getElementById("a");
const botonesCategoria = document.querySelectorAll(".botonesCategoria")
const http = "https://6488da890e2469c038fe72f9.mockapi.io/products";
const mostrarSBtn = document.querySelector(".mostrarSBtn");


let bdBajada = [];
let mostarSinClick = true

let carrito;
let carritoLs = localStorage.getItem("ProductosCarrito"); 

if(carritoLs){
    carrito = JSON.parse(carritoLs);
}
else{
    carrito = [];
}
function cargarArticulos(categoria,mostrarIn){
    mostrarIn.innerHTML="";
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
          mostrarIn.append(div) 
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
       datos.forEach(x =>{bdBajada.push(x)})
    })

}
function productosSinBoton(){
    if(mostarSinClick == true){
        cargarArticulos(bdBajada,mostrarSBtn)
    }
}
bajarApi() 
setTimeout(()=>{productosSinBoton(); console.log("esperamos")},1000)
botonesCategoria.forEach(boton => {
    boton.addEventListener("click",(e)=>{    
        if(e.currentTarget.id != "todos"){ 
        const productosBoton = bdBajada.filter( x => x.categoria === e.currentTarget.id)
        mostrarSBtn.classList.add("oculto")
        mostarSinClick = false
        cargarArticulos(productosBoton,sectionMostrar)
        }
     else{
        cargarArticulos(bdBajada,sectionMostrar)
        }
        })})



  



   
