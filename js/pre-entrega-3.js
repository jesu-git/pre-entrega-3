
let sectionMostrar = document.querySelector("#sectionMostrar");
let btnComprar = document.querySelectorAll(".btnComprar");
let contador = document.querySelector("#contador");
const nombreInput = document.querySelector("#nombre");
const precioInput = document.querySelector("#precio");
const bebidaInput = document.querySelector("#bebida");
const idInput = document.querySelector("#id");
const a = document.getElementById("a");
const botonesCategoria = document.querySelectorAll(".botonesCategoria")


console.log(a)
class ingreso {
    constructor(nombre,precio,bebida,categoria,id){
        this.nombre = nombre;
        this.precio = precio;
        this.bebida = bebida;
        this.categoria =categoria;
        this.id     = id;
    }
 }
 // Array de obj pre-cargados
 let combos = [    
           
    {  
    nombre:"lomo",
    precio:2500,
    bebida: "con bebida",
    categoria:"lomo",
    id:"lomo(01)",


   },
   {  
    nombre:"lomo palta",
    precio:2500,
    bebida: "con bebida",
    categoria:"lomo",
    id:"lomo(13)",


   },    {  
    nombre:"lomo completo",
    precio:2500,
    bebida: "con bebida",
    categoria:"lomo",
    id:"lomo(14)",


   },
    { 
    nombre:"hamburguesa",
    precio: 1800,
    bebida:"con bebida",
    categoria:"hamburguesa",
    id:"hamburguesa(02)"

   }, 
   { 
    nombre:"hamburguesa cheddar",
    precio: 1800,
    bebida:"con bebida",
    categoria:"hamburguesa",
    id:"hamburguesa(07)"

   },
   { 
    nombre:"hamburguesa sabor",
    precio: 1800,
    bebida:"con bebida",
    categoria:"hamburguesa",
    id:"hamburguesa(08)"

   },           
    {
    nombre:"pancho",
    precio: 1000,
    bebida:"sin bebida",
    categoria:"pancho",
    id:"pancho(03)"
    
   },{ 
   nombre:"pancho con poncho",
   precio: 1000,
   bebida:"sin bebida",
   categoria:"pancho",
   id:"pancho(09)"
   
  },
  { 
    nombre:"pancho doble salchicha",
    precio: 1000,
    bebida:"sin bebida",
    categoria:"pancho",
    id:"pancho(10)"
    
   },         
   {  
    nombre:"pizza",
    precio: 2500,
    bebida:"sin bebida",
    categoria:"pizza",
    id:"pizza(04)"
   },
   {  
    nombre:"pizza napolitana",
    precio: 2500,
    bebida:"sin bebida",
    categoria:"pizza",
    id:"pizza(15)"
   },
   {  
    nombre:"pizzas",
    precio: 3500,
    bebida:"con bebida",
    categoria:"pizza",
    id:"pizza(05)"
   },

   {

    nombre:"papas",
    precio: 1000,
    bebida:"sin bebida",
    categoria:"papa",
    id:"papas(06)"
   },
   
   {

    nombre:"papas verdeo",
    precio: 1000,
    bebida:"sin bebida",
    categoria:"papa",
    id:"papas(11)"
   },
   
   {

    nombre:"papas panceta",
    precio: 1000,
    bebida:"sin bebida",
    categoria:"papa",
    id:"papas(12)"
   },
 ]

let bd = []//Array donde se pasaran los obj despues de ser pasados por function objPorContructor() o los nuevos obj a ingresar

let carrito;
let carritoLs = localStorage.getItem("ProductosCarrito"); 

if(carritoLs){
    carrito = JSON.parse(carritoLs);
}
else{
    carrito = [];
}
function porConstructor(){
    combos.forEach((x)=>{bd.push(new ingreso(x.nombre,x.precio,x.bebida,x.categoria,x.id))})   
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
    const articuloPedido = bd.find(x => x.id === id);
     carrito.push(articuloPedido)
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))
}


porConstructor()
cargarArticulos(bd)


botonesCategoria.forEach(boton => {
    boton.addEventListener("click",(e)=>{    
        if(e.currentTarget.id != "todos"){ 
        const productosBoton = bd.filter( x => x.categoria === e.currentTarget.id)
        cargarArticulos(productosBoton)
        }
     else if(e.currentTarget.id === "todos"){
        cargarArticulos(bd)
        }
        })})
    
    



   
