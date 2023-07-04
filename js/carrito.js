

let carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));
const mostrar = document.querySelector(".mostrarCart");
const contenedorP = document.querySelector(".total")
let eliminarArticulo = document.querySelectorAll(".btnEliminar")
const vaciar = document.querySelector("#vaciar")
let montoTotal = document.querySelector(".montoTotal")
let comprar = document.querySelector(".comprar")
let avisoVacio = document.querySelector(".avisoVacio")
carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));
console.log(carrito)
function cargaPrincipal(){

   if(carrito){

   
   
    
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
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))
    cargaPrincipal()

}
function vaciarCarrito(){
    carrito.length = 0;
    localStorage.setItem("ProductosCarrito",JSON.stringify(carrito))
    cargaPrincipal()


}
function actualizarTotal(){
  console.log(carrito)
 let acumulado = carrito.reduce((x,y)=>x + y.precio,0)
 console.log(acumulado)
 montoTotal.innerText=`$${acumulado}`
}
function comprarCarrito(){

    Swal.fire({
      title: 'Desea comprar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,comprar!'
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.length = 0;
        localStorage.setItem("ProductosCarrito",JSON.stringify(carrito));
        cargaPrincipal()

        Swal.fire(
          'Comprado!',
          'Tu compra se ha realizado con exito.',
          'success'
        )   
      }
    })
         
    
  

    

}
comprar.addEventListener("click",comprarCarrito);
vaciar.addEventListener("click",vaciarCarrito);
cargaPrincipal()
actualizarTotal()