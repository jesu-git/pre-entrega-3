
const nombreInput = document.querySelector("#nombre");
const precioInput = document.querySelector("#precio");
const bebidaInput = document.querySelector("#bebida");
const categoriaInput = document.querySelector("#categoria");
const http = "https://6488da890e2469c038fe72f9.mockapi.io/products";
const mostrarProd = document.querySelector(".mostrarEditar")
const btnCargar = document.querySelector(".btn-agregar");
const btnEnviar = document.querySelector(".btnEditar")
const formEditar = document.querySelector(".formEditar")
const formAgregar = document.querySelector(".formAgregar")
const catAgregar = document.querySelector("#agregarProducto")
const catEditar = document.querySelector("#editar")
const catDelete = document.querySelector("#delete")
const nombreEdit = document.querySelector("#nombreEdit");
const precioEdit = document.querySelector("#precioEdit");
const bebidaEdit = document.querySelector("#bebidaEdit")
const categoriaEdit = document.querySelector("#categoriaEdit");
const idEdit = document.querySelector("#idEdit")

let bd = [] ;

class ingreso {
    constructor(nombre,precio,bebida,categoria,id){
        this.nombre = nombre;
        this.precio = precio;
        this.bebida = bebida;
        this.categoria =categoria;
        this.id     = id;
    }
 }
 function bajarApi(){
    fetch(http)
    .then((res)=> res.json())
    .then((datos)=>{
      
       datos.forEach(x =>{bd.push(new ingreso(x.nombre,x.precio,x.bebida,x.categoria,x.id))})
    })
  console.log(bd)
}
function crearProducto(){
   if(nombreInput.value == "" || precioInput.value == "" || bebidaInput.value == "" || categoriaInput.value == "" ){
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No ha ingresado datos',
      })
   }
   else{ 
    Swal.fire({
        title: 'Desea crear un nuevo producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cargar producto!'
      }).then((result) => {
        if (result.isConfirmed) {
            productoN = new ingreso(nombreInput.value,parseInt(precioInput.value),bebidaInput.value,categoriaInput.value)
            addBd(productoN)
          nombreInput.value = "";
          precioInput.value = "";
          bebidaInput.value = "";
          categoriaInput.value ="";
   
          Swal.fire(
            'Agregado!',
            'Su producto ha sido agregado exitosamente.',
            'success'
            
          )
        }
      })
    }
}
async function addBd(producto){
    const resp = await fetch(http,{ method: "POST",
                               body: JSON.stringify(producto),
                               headers:{"Content-Type":"application/json"},})                          
}
function cargarArticulosEliminar(categoria){
    mostrarProd.innerHTML="";
    categoria.forEach((articulo)=>{
        const{nombre,precio,bebida,id} = articulo;
        let div = document.createElement("div");
        div.classList.add("articulos");
        div.innerHTML = `
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${bebida}</p>
        <button type="button" class="btn btn-danger btnDelete"id="${id}">Eliminar</button
          `;
          mostrarProd.append(div) 
    })
    botonesEliminar()
}
function cargarArticulosEdit(categoria){
    mostrarProd.innerHTML="";
    categoria.forEach((articulo)=>{
        const{nombre,precio,bebida,id} = articulo;
        let div = document.createElement("div");
        div.classList.add("articulos");
        div.innerHTML = `
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${bebida}</p>
        <button type="button" class="btn btn-primary btnEdit"id="${id}">Editar</button
          `;
          mostrarProd.append(div) 
    })
    botonesEditar()
}
function botonesEditar(){
    const btnEditar = document.querySelectorAll(".btnEdit")
    btnEditar.forEach(x=>{x.addEventListener("click",(e)=>{
        const producto = bd.find(producto =>{return producto.id == e.currentTarget.id});
        nombreEdit.value = producto.nombre;
        precioEdit.value = producto.precio;
        bebidaEdit.value = producto.bebida;
        categoriaEdit.value = producto.categoria;
        idEdit.value = producto.id
    })

})
}
function botonesEliminar(){
        const btndelete = document.querySelectorAll(".btnDelete")
        btndelete.forEach(boton=>{boton.addEventListener("click",(e)=>{
        const idBoton = e.currentTarget.id   
        deleteP(idBoton)
})}
)}
async function deleteP(id){
    const resp = await fetch(`${http}/${id}`,{ method: "DELETE",
                               })
   const data = await resp.json()                            
   const producto = bd.find((x)=>{return x.id == data.id})   
   const index = bd.indexOf(producto) 
   bd.splice(index,1) 
   cargarArticulosEliminar(bd)
   console.log(bd)              
}
async function editarP(data){
   await fetch(`${http}/${data.id}`,{ method:"PUT",
                                 body:JSON.stringify(data),
                                 headers:{"Content-Type":"application/json"}})
}
function objEnviar(){

}
bajarApi()
btnCargar.addEventListener("click",crearProducto)
btnEnviar.addEventListener("click",(e)=>{
    const modificacion ={
        nombre: nombreEdit.value,
        precio: precioEdit.value,
        bebida: bebidaEdit.value,
        categoria: categoriaEdit.value,
        id:idEdit.value,
       
    }
    Swal.fire({
        title: 'Seguro quiere modificarlo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
            editarP(modificacion)
          Swal.fire(
            'Modificado!',
            'Se ha modificado con exito!.',
            'success'
          )
        }
      })
})
catAgregar.addEventListener("click",(e)=>{
    mostrarProd.classList.add("disable")
    formEditar.classList.add("disable")
    formAgregar.classList.remove("disable")
})
catEditar.addEventListener("click",(e)=>{
    mostrarProd.classList.remove("disable")
    formEditar.classList.remove("disable")
    formAgregar.classList.add("disable")
    cargarArticulosEdit(bd)
})
catDelete.addEventListener("click",(e)=>{
    mostrarProd.classList.remove("disable")
    formEditar.classList.add("disable")
    formAgregar.classList.add("disable")
    cargarArticulosEliminar(bd)
})
