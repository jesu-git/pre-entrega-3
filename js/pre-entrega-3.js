
const sectionMostrar = document.querySelector("#sectionMostrar");
let btnComprar = document.querySelectorAll(".btnComprar");
const contador = document.querySelector("#contador")
const nombre=document.querySelector("#nombre")
const precio=document.querySelector("#precio")
const bebida=document.querySelector("#bebida")
const id=document.querySelector("#id")
const btnAgregar=document.querySelector("#btnAgregar")


class ingreso {
    constructor(nombre,precio,bebida,id){
        this.nombre = nombre;
        this.precio = precio;
        this.bebida = bebida;
        this.id     = id
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
let porContructor = []//Array donde se pasaran los obj despues de ser pasados por function objPorContructor() o los nuevos obj a ingresar
let carrito;
const carritoLs = JSON.parse(localStorage.getItem("ProductosCarrito")); 

if(carritoLs){
    carrito = carritoLs;
}
else{
    carrito = [];
}

function porConstructor(){
    combos.forEach((x)=>{porContructor.push(new ingreso(x.nombre,x.precio,x.bebida,x.id))})
    
}

function mostrarProductos(){
        porContructor.forEach(x =>{
        const{nombre,precio,bebida,id} = x;
        sectionMostrar.innerHTML += `
        <div class="productoTarjeta">
         <h3>${nombre}</h3>
         <p>$${precio}</p>
         <p>${bebida}</p>
         <button type="button" class="btn btn-danger btnComprar"id="${id}">Comprar</button
</div>`
    })
    botonesComprar()
}

porConstructor()
mostrarProductos()

 function botonesComprar(){ 
 btnComprar = document.querySelectorAll(".btnComprar")
 btnComprar.forEach(boton=>{ boton.addEventListener("click",agregarAcarrito)})
 
}

function agregarAcarrito(e){
    const id = e.currentTarget.id;
    const articuloPedido = porContructor.find(x => x.id === id);
     carrito.push(articuloPedido)
    sumarCarrito()
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))
}

function sumarCarrito(){
    const numContador =  carrito.reduce((acc,articulo) => acc + articulo.precio,0)
    const total = localStorage.setItem("totalCompra",JSON.stringify(numContador))
    
}


btnAgregar.addEventListener("submit",(event)=>{
    event.defaultPrevented();
    crear()
}
)
 function crear(){
    const nombre = nombre.value
    const precio = precio.value
    const bebida = bebida.value
    const id = id.value
    let articulo = new ingreso(nombre.value,precio.value,bebida.value,id.value)
    porConstructor.push(articulo)
    console.log(porConstructor)
 }