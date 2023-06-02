const carritoVacio = document.querySelector(".carritoVacio");
const btnComprar = document.querySelector(".btnComprar");
const btnOferta = document.querySelector(".btnOferta")
let carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));
const mostrar = document.querySelector(".mostrarCart")
const total = JSON.parse(localStorage.getItem("totalCompra"))
const contenedorP = document.querySelector(".total")
let eliminarArticulo = document.querySelectorAll(".btnEliminar")
carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));



function cargaPrincipal(){

   if(carrito){

     carritoVacio.classList.add("disabled");
     btnOferta.classList.add("disabled");
     btnComprar.classList.remove("disabled");

     carrito.innerHTML = "";

     carrito.forEach((articulo)=>{
        const{nombre,precio,bebida,id}=articulo
        const div = document.createElement("div");
        div.classList.add("articulos");
        div.innerHTML = `
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${bebida}</p>
        <button type="button" class="btn btn-danger btnEliminar"id="${id}">eliminar</button
          `;
          mostrar.append(div)});
          actualizarBtnEliminar()

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
    console.log(carrito)
    carrito.splice(index,1);
    console.log(carrito)
    

    cargaPrincipal()

}
cargaPrincipal()