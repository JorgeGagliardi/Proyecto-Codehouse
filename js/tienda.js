// Simulación de una tienda de venta de plantas y accesorios para el jardín
//
class Producto{
    constructor(codigo, categoria, nombre, precio, cantidad, imagen){
        this.codigo    = codigo
        this.categoria = categoria
        this.nombre    = nombre
        this.precio    = precio
        this.cantidad  = cantidad
        this.imagen    = imagen
    }
    aumCant(){
        this.cantidad++
    }
    descripcion(){
        return  `<article class="contenedorFotoPlantas_Art">
        <img class="fotoTienda" src= ${this.imagen} alt=" " />
        <p>${this.nombre}</p><p>$ ${this.precio}</p>
        <button class="btn btn-primary" id="ap-${this.codigo}">Añadir al carrito</button>
        <div id="cant-${this.codigo}"></div>
        </article>`
    }
    descripcionCarrito(){
        return  `<article>
                    <div class="contenedorCarrito">
                        <div>
                            <img class="fotoCarrito" src= ${this.imagen} alt=" " /></div>
                        <div>
                            <p><strong>${this.nombre}</strong></p>
                            <p><strong>Precio:   $ ${this.precio}</strong></p>
                        <p><button class="botonEliminar" id="dC-${this.codigo}">
                            <i class="fi fi-rr-square-minus"></i>
                        </button>
                        <strong>Cantidad: ${this.cantidad}</strong>
                        <button class="botonEliminar" id="aC-${this.codigo}">
                            <i class="fi fi-rr-square-plus"></i>
                        </button></p>
                        <button class="botonEliminar" id="ep-${this.codigo}">
                            <p><strong>Eliminar</strong></p>
                        </button>
                        <p class="leyendaCarrito"><strong>==========================</strong></p>
                        </div>
                    </div>
                </article>`
    }
    disCant(){
        if(this.cantidad > 1){
            this.cantidad--
        }
    }
}
class Carrito{
    constructor(){
        this.listaDeCompras = []
    }
    agregar(producto){
        this.listaDeCompras.push(producto)
    }
    aumentarCantidad(){
        if (this.listaDeCompras.length>0){
            this.listaDeCompras.forEach(producto => {
                const btn_ac = document.getElementById(`aC-${producto.codigo}`)
                btn_ac.addEventListener("click", ()=>{
                    producto.aumCant()
                    this.guardarEnStorage()
                    this.mostrarCarrito()
                })
            })
        }
    }
    disminuirCantidad(){
        if (this.listaDeCompras.length>0){
            this.listaDeCompras.forEach(producto => {
                const btn_dc = document.getElementById(`dC-${producto.codigo}`)
                btn_dc.addEventListener("click", ()=>{
                    producto.disCant()
                    this.guardarEnStorage()
                    this.mostrarCarrito()
                })
            })
        }
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
            this.guardarEnStorage()
            this.mostrarCarrito()
        })
    })
    }
    guardarEnStorage(){
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras)
        localStorage.setItem("listaDeCompras",listaDeComprasJSON)
    }
    mostrarCarrito(){
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        let acumuladora_descripcion = ""
        if (this.listaDeCompras.length>0){
            this.listaDeCompras.forEach( producto => {
                acumuladora_descripcion = acumuladora_descripcion + producto.descripcionCarrito()
            })
            contenedor_carrito.innerHTML = acumuladora_descripcion + this.valorizarCarrito()
            contenedor_carrito.className = "contenedorFotoPlantas"
            this.aumentarCantidad()
            this.disminuirCantidad()
            this.eliminarProducto()
            this.vaciarCarrito()
        } else {
            contenedor_carrito.innerHTML = `<h3 class="leyendaCarrito"><strong>Sin productos<\strong></h3>`
            contenedor_carrito.className = "contenedorFotoPlantas"
        }
        return
    }
    recuperarStorage(){
        let listaDeComprasJSON=localStorage.getItem("listaDeCompras")
        let listaDeComprasJS=JSON.parse(listaDeComprasJSON)
        let nuevaListaDeCompras =[]
        if (listaDeComprasJS){
            listaDeComprasJS.forEach(prod => {
                const nuevoProducto = new Producto (prod.codigo,
                                                    prod.categoria,
                                                    prod.nombre,
                                                    prod.precio,
                                                    prod.cantidad,
                                                    prod.imagen)
                nuevaListaDeCompras.push(nuevoProducto)
            })
            this.listaDeCompras = nuevaListaDeCompras;
        }
    }
    vaciarCarrito() {
        const btn_vc = document.getElementById(`vaciarCarrito`)
            btn_vc.addEventListener("click",()=>{
                this.vC()
                this.guardarEnStorage()
                this.mostrarCarrito()
            })
    }
    valorizarCarrito(){
        let totalCosto = 0
        this.listaDeCompras.forEach( producto => {
            totalCosto = totalCosto + producto.precio * producto.cantidad
        })
        lista = `<p class="leyendaCarrito"><strong>\nCosto total: $${totalCosto}<\strong></p>` ;
        return lista
    }
    vC(){
        this.listaDeCompras = []
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
        const btn_oc = document.getElementById(`ordenCod`)
        btn_oc.addEventListener("click",()=>{
            this.ordenCodigo()
            gondola.elegirProducto()
        })
        const btn_on = document.getElementById(`ordenNom`)
        btn_on.addEventListener("click",()=>{
            this.ordenDescripcion()
            gondola.elegirProducto()
        })
        const btn_menpr = document.getElementById(`ordMenorPrec`)
        btn_menpr.addEventListener("click",()=>{
            this.ordenPrecioMasBajo()
            gondola.elegirProducto()
        })
        const btn_maypr = document.getElementById(`ordMayorPrec`)
        btn_maypr.addEventListener("click",()=>{
            this.ordenPrecioMasAlto()
            gondola.elegirProducto()
        })
        const btn_filtroPl = document.getElementById(`filtroPl`)
        btn_filtroPl.addEventListener("click",()=>{
            this.filtrarPlantas()
            gondola.elegirProducto()
        })
        const btn_filtroAc = document.getElementById(`filtroAc`)
        btn_filtroAc.addEventListener("click",()=>{
            this.filtrarAccesorios()
            gondola.elegirProducto()
        })
        const btn_filtroQu = document.getElementById(`filtroQu`)
        btn_filtroQu.addEventListener("click",()=>{
            this.quitarFiltro()
            gondola.elegirProducto()
        })
    }
    filtrarPlantas(){
        this.filtroDeProductos = this.listaDeProductos.filter((el) => el.categoria == "Plantas")
    }
    filtrarAccesorios(){
        this.filtroDeProductos = this.listaDeProductos.filter((el) => el.categoria == "Accesorios")
    }
    mostrar(){
        let acumuladora_descripcion = ""
        if (this.filtroDeProductos.length == 0){
            this.listaDeProductos.forEach( producto => {
                acumuladora_descripcion = acumuladora_descripcion + producto.descripcion()
            })
        } else {
            this.filtroDeProductos.forEach( producto => {
                acumuladora_descripcion = acumuladora_descripcion + producto.descripcion()
            })
        }
        return acumuladora_descripcion
    }
    ordenCodigo(){
        if (this.filtroDeProductos.length == 0){
            this.listaDeProductos.sort((a,b)=>a.codigo.localeCompare(b.codigo));
        } else {
            this.filtroDeProductos.sort((a,b)=>a.codigo.localeCompare(b.codigo));
        }
    }
    ordenDescripcion(){
        if (this.filtroDeProductos.length == 0){
            this.listaDeProductos.sort((a,b)=>a.nombre.localeCompare(b.nombre));
        } else {
            this.filtroDeProductos.sort((a,b)=>a.nombre.localeCompare(b.nombre));
        }
    }
    ordenPrecioMasAlto(){
        if (this.filtroDeProductos.length == 0){
            this.listaDeProductos.sort((a,b)=>b.precio.localeCompare(a.precio));
        } else {
            this.filtroDeProductos.sort((a,b)=>b.precio.localeCompare(a.precio));
        }
    }
    ordenPrecioMasBajo(){
        if (this.filtroDeProductos.length == 0){
            this.listaDeProductos.sort((a,b)=>a.precio.localeCompare(b.precio));
        } else {
            this.filtroDeProductos.sort((a,b)=>a.precio.localeCompare(b.precio));
        }
    }
    quitarFiltro(){
        this.filtroDeProductos.splice(0,this.filtroDeProductos.length)       
    }
}

const gondola = new Exhibidor();

const p1 = new Producto("1","Plantas","Sedum maceta 40cm","1200","1","img/sedum.jpeg");
const p2 = new Producto("2","Plantas","Madre Perla maceta 40cm","1050","1","img/madrePerla.jpeg");
const p3 = new Producto("3","Plantas","Cordón de San José maceta 40cm","1100","1","img/cordonDeSanJose.jpeg");
const p4 = new Producto("4","Accesorios","Rollo manguera 1/2 pulg, 25m","9000","1","img/rolloManguera.jpeg");
const p5 = new Producto("5","Accesorios","Fertilizante para cesped","3500","1","img/fertilizante.jpeg");

gondola.agregar(p1);
gondola.agregar(p2);
gondola.agregar(p3);
gondola.agregar(p4);
gondola.agregar(p5);

const carrito = new Carrito();

lista="";

carrito.recuperarStorage()
carrito.mostrarCarrito()
gondola.elegirProducto()