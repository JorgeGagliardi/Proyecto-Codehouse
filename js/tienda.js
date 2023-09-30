// Simulación de una tienda de venta de plantas y accesorios para el jardín
//
class Producto{
    constructor(codigo, categoria, nombre, precio, cantidad, imagen, alt, detalle){
        this.codigo    = codigo
        this.categoria = categoria
        this.nombre    = nombre
        this.precio    = precio
        this.cantidad  = cantidad
        this.imagen    = imagen
        this.alt       = alt
        this.detalle   = detalle
    }
    aumCant(){
        this.cantidad++
    }
    descripcion(){
        return  `<article class="contenedorFotoPlantas_Art">
        <img class="fotoTienda" src= ${this.imagen} alt=${this.alt} />
        <p>${this.nombre}</p><p>$ ${this.precio}</p>
        <button class="botonEliminar" id="d-${this.codigo}">+ INFO</button>
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
            this.cartelProductoEliminado(producto)
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
            this.finalizarCompra()
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
                                                    prod.imagen,
                                                    prod.alt,
                                                    prod.detalle
                                                    )
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
                this.cartelCarritoVacio()           })
    }
    finalizarCompra() {
        const btn_vc = document.getElementById(`finalizarCompra`)
        btn_vc.addEventListener("click",()=>{
            this.vC()
            this.guardarEnStorage()
            this.mostrarCarrito()
            Swal.fire({
                title: '¡Compra realizada exitosamente!',
                icon: 'success',
                timer: 3000,
            })
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
    cartelProductoEliminado(producto){
        Toastify({
            text: `Eliminado del carrito ${producto.nombre}`,
            avatar: `${producto.imagen}`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();
    }
    cartelCarritoVacio(){
        Toastify({
            text: "El carrito está vacío",
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();
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
    async preparar(){
        let listaProductosJSON= await fetch("productosTienda.json")
        let listaProductosJS= await listaProductosJSON.json();
        listaProductosJS.forEach(producto => {
            let nuevoProducto = new Producto(producto.codigo, producto.categoria, producto.nombre, producto.precio, producto.cantidad, producto.imagen, producto.alt, producto.detalle)
            this.agregar(nuevoProducto)
        })
        this.elegirProducto()
    }
    elegirProducto() {
        let contenedor = document.getElementById("productosAVender");
        contenedor.innerHTML = gondola.mostrar()
        contenedor.className = "contenedorFotoPlantas"
        if (this.filtroDeProductos.length > 0){
            this.filtroDeProductos.forEach(producto => {
                const btn_ap = document.getElementById(`ap-${producto.codigo}`)
                btn_ap.addEventListener("click",()=>{
                    carrito.agregar(producto)
                    carrito.guardarEnStorage()
                    carrito.mostrarCarrito()
                    this.cartelProductoAgregado(producto)
                })
            })
        } else {
            this.listaDeProductos.forEach(producto => {
                const btn_ap = document.getElementById(`ap-${producto.codigo}`)
                btn_ap.addEventListener("click",()=>{
                    carrito.agregar(producto)
                    carrito.guardarEnStorage()
                    carrito.mostrarCarrito()
                    this.cartelProductoAgregado(producto)
                })
            })
        }
        if (this.filtroDeProductos.length > 0){
                this.filtroDeProductos.forEach(producto => {
                const btn_d = document.getElementById(`d-${producto.codigo}`)
                btn_d.addEventListener("click",()=>{
                    this.cartelProductoDetalle(producto)
                })
            })
        } else {
            this.listaDeProductos.forEach(producto => {
                const btn_d = document.getElementById(`d-${producto.codigo}`)
                btn_d.addEventListener("click",()=>{
                    this.cartelProductoDetalle(producto)
                })
            })
        }
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
    cartelProductoAgregado(producto){
        Toastify({
            text: `Añadido ${producto.nombre}`,
            avatar: `${producto.imagen}`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();
    }
    cartelProductoDetalle(producto){
        Toastify({
            text: `${producto.detalle}`,
            //avatar: `${producto.imagen}`,
            duration: 6000,
            gravity: "top",
            position: "right",
        }).showToast();
    }
}

const gondola = new Exhibidor();
const carrito = new Carrito();
lista="";

carrito.recuperarStorage()
carrito.mostrarCarrito()

gondola.preparar()