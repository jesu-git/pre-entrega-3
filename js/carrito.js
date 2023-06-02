const carritoVacio = document.querySelector(".carritoVacio");
const btnComprar = document.querySelector(".btnComprar");
const btnOferta = document.querySelector(".btnOferta")
let carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));
const mostrar = document.querySelector(".mostrarCart");
const contenedorP = document.querySelector(".total")
let eliminarArticulo = document.querySelectorAll(".btnEliminar")
carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));
const vaciar = document.querySelector("#vaciar")
let montoTotal = document.querySelector(".montoTotal")
let comprar = document.querySelector(".comprar")
let avisoVacio = document.querySelector(".avisoVacio")


function cargaPrincipal(){

   if(carrito){

    avisoVacio.classList.add("disable")
    

  

     mostrar.innerHTML = "";

     carrito.forEach((articulo)=>{
        const{nombre,precio,bebida,id}=articulo
        const div = document.createElement("div");
        div.classList.add("objNuevo");
        div.innerHTML = `
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${bebida}</p>
        <button type="button" class="btn btn-danger btnEliminar"id="${id}">eliminar</button
          `;
          mostrar.append(div)});
          actualizarBtnEliminar()
          actualizarTotal()


           }    
           
else{

    btnComprar.classList.add("disabled")
}
}
function actualizarBtnEliminar(){ 
eliminarArticulo = document.querySelectorAll(".btnEliminar")
eliminarArticulo.forEach(boton=> boton.addEventListener("click",eliminarA))
}
function eliminarA(e){
    idBoton = e.currentTarget.id;
    const index = carrito.findIndex(producto => producto.id === idBoton);
    carrito.splice(index,1);
    cargaPrincipal()
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))

}
function vaciarCarrito(){
    carrito.length = 0;
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))
    cargaPrincipal()


}
function actualizarTotal(){
 let acumulado = carrito.reduce((acc,articulo) => acc + articulo.precio,0);
 montoTotal.innerText=`$${acumulado}`

}
function comprarCarrito(){

    carrito.length = 0;
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito));
     
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Su compra se realizo con exito',
    showConfirmButton: false,
    timer: 1500
  })
    cargaPrincipal()
    

}
comprar.addEventListener("click",comprarCarrito);
vaciar.addEventListener("click",vaciarCarrito);
cargaPrincipal()