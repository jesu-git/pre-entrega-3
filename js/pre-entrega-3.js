
let sectionMostrar = document.querySelector("#sectionMostrar");
let btnComprar = document.querySelectorAll(".btnComprar");
let contador = document.querySelector("#contador");
const nombreInput = document.querySelector("#nombre");
const precioInput = document.querySelector("#precio");
const bebidaInput = document.querySelector("#bebida");
const idInput = document.querySelector("#id");
const a = document.getElementById("a");

a.addEventListener("click",agregarArticulo);

console.log(a)
class ingreso {
    constructor(nombre,precio,bebida,id){
        this.nombre = nombre;
        this.precio = precio;
        this.bebida = bebida;
        this.id     = id;
    }
 }
 // Array de obj pre-cargados
 let combos = [    
           
    {  
    nombre:"lomo",
    precio:2500,
    bebida: "con bebida",
    id:"lomo(01)"


   },
    { 
    nombre:"hamburguesa",
    precio: 1800,
    bebida:"con bebida",
    id:"hamburguesa(02)"

   },            
    {
    nombre:"pancho",
    precio: 1000,
    bebida:"sin bebida",
    id:"pancho(03)"
    
   },
   {  
    nombre:"pizza",
    precio: 2500,
    bebida:"sin bebida" ,
    id:"pizza(04)"
   },
   {  
    nombre:"pizzas",
    precio: 3500,
    bebida:"con bebida",
    id:"pizzas(05)"
   

   },

   {

    nombre:"papas",
    precio: 1000,
    bebida:"sin bebida",
    id:"papas(06)"
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
    combos.forEach((x)=>{bd.push(new ingreso(x.nombre,x.precio,x.bebida,x.id))})   
}
function cargarArticulos(){
    bd.forEach((articulo)=>{
        const{nombre,precio,bebida,id} = articulo;
        const div = document.createElement("div");
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
function agregarArticulo(e){
    e.preventDefault();
    bd.innerHTML = "";
    nombre = nombreInput.value
    precio = precioInput.value
    bebida = bebidaInput.value
    id = idInput.value
    let articulo = new ingreso(nombre,precio,bebida,id);
    bd.push(articulo)
    cargarArticulos()

}


porConstructor()
cargarArticulos()
console.log(contador)