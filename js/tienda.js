// Simulación de una tienda de venta de plantas y accesorios para el jardín
//
class Producto{
    constructor(codigo, categoria, nombre, precio, imagen){
        this.codigo    = codigo
        this.categoria = categoria
        this.nombre    = nombre
        this.precio    = precio
        this.cantidad  = "1"
        this.imagen    = imagen
    }
    descripcion(){
        return  `<article class="contenedorFotoPlantas_Art">
        <img class="fotoTienda" src= ${this.imagen} alt=" " />
        <p>${this.nombre}</p><p>$ ${this.precio}</p>
        <button class="btn btn-primary" id="ap-${this.codigo}">Añadir al carrito</button>
        </article>`
    }
    descrConCantidad(){
        return  `${this.codigo}  ${this.nombre} $ ${this.precio}  ${this.cantidad} unid.   Total: $ ${(this.precio * this.cantidad)}\n`;
    }
    descripcionCarrito(){
        return  `<article>
                    <div class="contenedorCarrito">
                        <div>
                            <img class="fotoCarrito" src= ${this.imagen} alt=" " /></div>
                        <div>
                            <p><strong>${this.nombre}</strong></p>
                            <p>Precio:   $ ${this.precio}</p>
                            <p>Cantidad: ${this.cantidad}</p>
                            <button class="btn btn-primary" id="ep-${this.codigo}">
                            <p><strong>Eliminar</strong></p>
                            </button>
                            <p>==========================</p>
                        </div>
                    </div>
                </article>`
    }
}

class Carrito{
    constructor(){
        this.listaDeCompras = []
    }
    agregar(producto){
        this.listaDeCompras.push(producto)
    }

    guardarEnStorage(){
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras)
        localStorage.setItem("listaDeCompras",listaDeComprasJSON)
    }

/*  El código tiene el siguiente error y desconozco como resolverlo.

    Al recuperar la lista del carrito del local Storage recupera mal las
    imágenes del producto. 

    Chequeé a traves de console.log que todo había quedado bien almacenado
    en el local Storage.

    Agradezco las ayudas que me puedas dar para solucionar el problema.

    Desde ya, muchas gracias.
*/

    recuperarStorage(){
        let listaDeComprasJSON=localStorage.getItem("listaDeCompras")
        console.log(listaDeComprasJSON)
        let listaDeComprasJS=JSON.parse(listaDeComprasJSON)
        console.log(listaDeComprasJS)
        let nuevaListaDeCompras =[]
        listaDeComprasJS.forEach(producto => {
            let nuevoProducto = new Producto (producto.codigo, producto.categoria, producto.nombre, producto.precio, producto.cantidad, producto.imagen)
            nuevaListaDeCompras.push(nuevoProducto)
        })
        this.listaDeCompras = nuevaListaDeCompras;
        console.log(this.listaDeCompras[0])
    }

    mostrar(){
        let acumuladora_descripcion = ""
        this.listaDeCompras.forEach( producto => {
            acumuladora_descripcion = acumuladora_descripcion + producto.descripcionCarrito()
        })
        return acumuladora_descripcion
    }
    mostrarCarrito(){
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        let acumuladora_descripcion = ""
        this.listaDeCompras.forEach( producto => {
            acumuladora_descripcion = acumuladora_descripcion + producto.descripcionCarrito()
        })
        contenedor_carrito.innerHTML = acumuladora_descripcion + this.valorizarCarrito()
        contenedor_carrito.className = "contenedorFotoPlantas"
        this.eliminarProducto()
        return
    }
    valorizarCarrito(){
        let totalCosto = 0
        this.listaDeCompras.forEach( producto => {
            totalCosto = totalCosto + producto.precio * producto.cantidad
        })
        lista = `<strong>\nCosto total: $${totalCosto}<\strong>` ;
        return lista
    }
    validaExistencia(codigo1){
        return this.listaDeCompras.some( producto => producto.codigo === codigo1)
    }
    encuentraProducto(codigo1){
        return this.listaDeCompras.find( producto => producto.codigo === codigo1)
    }
    eliminar(productoAEliminar){
            let indice = this.listaDeCompras.findIndex(producto => producto.codigo == productoAEliminar.codigo)
            this.listaDeCompras.splice(indice,1)
    }
    eliminarProducto() {
        this.listaDeCompras.forEach(producto => {
            const btn_ep = document.getElementById(`ep-${producto.codigo}`)
            btn_ep.addEventListener("click",()=>{
                this.eliminar(producto)
                this.mostrarCarrito()
            })
        })
    }
}

class Exhibidor{
    constructor(){
        this.listaDeProductos = []
        this.filtroDeProductos = []
    }
    agregar(producto){
        this.listaDeProductos.push(producto)
    }
    mostrar(){
        let contenedor_productos = document.getElementById("productosAVender")
        let acumuladora_descripcion = ""
        this.listaDeProductos.forEach( producto => {
            acumuladora_descripcion = acumuladora_descripcion + producto.descripcion()
        })
        return acumuladora_descripcion
    }
    elegirProducto() {
        let contenedor = document.getElementById("productosAVender");
        contenedor.innerHTML = gondola.mostrar()
        contenedor.className = "contenedorFotoPlantas"
        this.listaDeProductos.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.codigo}`)
            btn_ap.addEventListener("click",()=>{
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarCarrito()
            })
        })
    }
    validaExistencia(codigo1){
        return this.listaDeProductos.some( producto => producto.codigo === codigo1)
    }
    encuentraProducto(codigo1){
        return this.listaDeProductos.find( producto => producto.codigo === codigo1)
    }
}

const gondola = new Exhibidor();

const p1 = new Producto("1","Plantas","Sedum maceta 40cm","1200","img/sedum.jpeg");
const p2 = new Producto("2","Plantas","Madre Perla maceta 40cm","1050","img/madrePerla.jpeg");
const p3 = new Producto("3","Plantas","Cordón de San José maceta 40cm","1100","img/cordonDeSanJose.jpeg");
const p4 = new Producto("4","Accesorios","Rollo manguera 1/2 pulg, 25m","9000","img/rolloManguera.jpeg");
const p5 = new Producto("5","Accesorios","Fertilizante para cesped"," 3500","img/fertilizante.jpeg");

gondola.agregar(p1);
gondola.agregar(p2);
gondola.agregar(p3);
gondola.agregar(p4);
gondola.agregar(p5);

const carrito = new Carrito();

let cantidadRequerida = 0;
let productosDisponibles = "";
filtro = "";
lista="";

carrito.recuperarStorage()
console.log(carrito.listaDeCompras[0].codigo)
console.log(carrito.listaDeCompras[0].categoria)
console.log(carrito.listaDeCompras[0].nombre)
console.log(carrito.listaDeCompras[0].precio)
console.log(carrito.listaDeCompras[0].cantidad)
console.log(carrito.listaDeCompras[0].imagen)

carrito.mostrarCarrito()
gondola.elegirProducto()
