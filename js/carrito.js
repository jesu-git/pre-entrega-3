const carritoVacio = document.querySelector(".carritoVacio");
const btnComprar = document.querySelector(".btnComprar");
const btnOferta = document.querySelector(".btnOferta")
const carrito = JSON.parse(localStorage.getItem("ProductosCarrito"));
const mostrar = document.querySelector(".mostrarCart")
const total = JSON.parse(localStorage.getItem("totalCompra"))
const contenedorP = document.querySelector(".total")
console.log(total)

if(carrito){
     
     carritoVacio.classList.add("disabled");
     btnOferta.classList.add("disabled");
     btnComprar.classList.remove("disabled");

      carrito.forEach(x =>{
        const{nombre,precio,bebida,id,cantidad} = x;
        mostrar.innerHTML += `
        <div class="productoTarjeta">
         <h3>${nombre}</h3>
         <p>$${precio}</p>
         <p>${bebida}</p>
         <p>${cantidad}</p>
          <button type="button" class="btn btn-danger btnEliminar"id="${id}">Eliminar</button>
    </div>`})
        const preciofinal = document.createElement("p");
        p.innerHTML=`El total de la compra es ${total}.` 
        contededorP.append("p")
           }
else{

    btnComprar.classList.add("disabled")
}
