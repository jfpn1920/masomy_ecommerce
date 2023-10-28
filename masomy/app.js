//funcionalidad_nosotros
function mostrarNosotros() {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
        <div class="contenedor_mision">
            <h2 class="mision">mision</h2>
            <p class="parrafo_1"><b>la mision de MASOMY es proporcionar ropa y uniformes de calidad para empresas, para fortalecer la identidad corporativa
            de su negocio. Cada prenda que elijas es cuidadosamente seleccionada para asegurar que te sientas seguro y presentado 
            en cada ocasion.</b></p>
        </div>        
        <div class="contenedor_vision">
            <h2 class="vision">vision</h2>
            <p class="parrafo_2"><b>apira ser tu aliado de confianza de moda coporativa. La mision de MASOMY es ofreser la ampllia variedad
            de opciones de vestimenta que se adapten a tus necesidades unicas y superar expectativas en terminos de calidad y diseño.</b></p>
        </div>
        <div class="contenedor_compromiso">
            <h2 class="compromiso">compromiso</h2>
            <p class="parrafo_3"><b>en MASOMY eres mi prioridad, trabajare contigo directamente para entender tus preferencias
            y adaptar solucines a tus requerimientos especificos. mi compromiso es asegurarme de que estes satisfecho
            con cada aspectos de mi servicio.</b></p>
        </div>
        <div class="contenedor_valores">
            <h2 class="valores">valores</h2>
            <p class="parrafo_4"><b>MASOMY, se enfoca se basa en valores fundamentales, la calidad es el selllo distintivo
            y la satisfacion de mis clientes es mi mayor recompensa cudo cada detalle y donde MASOMY da el esfuerzo por brindarte
            un servicio personalizado, siempre buscando innovar y ofrecerte lo mejor.
            </b></p>
        </div>
        <div class="contenedor_calidad_sin_concesiones">
            <h2 class="calidad_sin_concesiones">calidad sin concesiones</h2>
            <p class="parrafo_5"><b>cada prenda que ofrezco en MASOMY a sido escogido con esmero y con una dedicacion
            total a la calidad. no hago concesiones cuando se trata de asegurarme de que cada producto cumpla con 
            los mas altos estandares.</b></p>
        </div>
        <div class="contenedor_mi_empresa">
            <h2 class="mi_empresa">mi empresa</h2>
            <p class="parrafo_6"><b>mi empresa MASOMY es una empresa de confecciones que utiliza materiales de execelente
            calidad por lo tanto es exclusivo y pensando siempre en solucionar a su cliente a adquirir sus prpendas facilmente
            con buenos precios, forma de pago</b></p>
        </div>
        <footer class="footer_2"></footer>
        
    `;
}
//funcionalidad_contactanos
function mostrarContacto() {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
        <img src="imagen_titulo_masomy.png" alt="" class="imagen_titulo_masomy">
        <footer class=""></footer>
    `;
}
//funcionalidad_del_carrito_de_compras_con_ventana_emergente
const carrito = [];
let cantidadEnCarrito = 0;
function cargarCarritoDesdeAlmacenamientoLocal() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito.length = 0;
        carrito.push(...JSON.parse(carritoGuardado));
        cantidadEnCarrito = carrito.length;
        actualizarVistaCarrito();
        actualizarContadorCarrito();
    }
}
cargarCarritoDesdeAlmacenamientoLocal();
function guardarCarritoEnAlmacenamientoLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarVistaCarrito();
    cantidadEnCarrito++;
    actualizarContadorCarrito();
    guardarCarritoEnAlmacenamientoLocal();
}
function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach((producto) => {
        total += parseFloat(producto.precio);
    });
    return total;
}
function actualizarVistaCarrito() {
    const modalCarrito = document.getElementById("modalCarrito");
    const carritoContenido = document.getElementById("carritoContenido");
    const totalCarrito = document.getElementById("totalCarrito");
    carritoContenido.innerHTML = "";
    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>El carrito está vacío.</p>";
        totalCarrito.innerHTML = "";
    } else {
        carrito.forEach((producto, index) => {
            const productoElemento = document.createElement("div");
            productoElemento.innerHTML = `
            <div class="contenedor_productos">
                <i class="fas fa-trash" onclick="eliminarProductoDelCarrito(${index})"></i>
                <p class="productos_nombre"><b>${producto.nombre}</b></p>
                <p class="productos_precio"><b>$${producto.precio}</b></p>
            </div>
            `;
            carritoContenido.appendChild(productoElemento);
        });
        totalCarrito.innerHTML = `
            <p class="valor_total"><b>Valor Total: $${calcularTotalCarrito().toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}</b></p>
            <div class="contenedor_comprar">
                <button id="comprarBoton" class="boton_finalzar_comprar" onclick="realizarCompra()">Finalizar Compra</button>
            </div>
        `;
    }
}
function mostrarModalCarrito() {
    const modal = document.getElementById("modalCarrito");
    modal.style.display = "block";
    actualizarVistaCarrito();
}
function cerrarModalCarrito() {
    const modal = document.getElementById("modalCarrito");
    modal.style.display = "none";
}
function agregarProductoAlCarrito(nombre, precio) {
    agregarAlCarrito(nombre, precio);
}
function eliminarProductoDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarVistaCarrito();
    cantidadEnCarrito--;
    actualizarContadorCarrito();
    guardarCarritoEnAlmacenamientoLocal();
}
function realizarCompra() {
    alert("Compra realizada con éxito. Gracias por su compra.");
    carrito.length = 0;
    actualizarVistaCarrito();
    cantidadEnCarrito = 0;
    actualizarContadorCarrito();
    guardarCarritoEnAlmacenamientoLocal();
    window.location.href = 'compra_producto.html';
}
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.textContent = cantidadEnCarrito.toString();
}
const iconoCarrito = document.querySelector(".carrito_icono");
iconoCarrito.addEventListener("click", () => {
    mostrarModalCarrito();
});
function configurarBotonesAgregarAlCarrito() {
    const botonesAgregarAlCarrito = document.querySelectorAll(".agregar_carrito");
    botonesAgregarAlCarrito.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-nombre");
            const precio = boton.getAttribute("data-precio");
            agregarProductoAlCarrito(nombre, precio);
        });
    });
}
configurarBotonesAgregarAlCarrito();
//funcionalidad_cuenta
window.addEventListener("load", function() {
    const usuarioAutenticado = document.getElementById("usuario-autenticado");
    const nombreUsuario = document.getElementById("nombre-usuario");
    const cerrarSesionBtn = document.getElementById("cerrar-sesion-btn");
    const iconoCuenta = document.querySelector(".cuenta_icono");
    const urlParams = new URLSearchParams(window.location.search);
    const nombreUsuarioParam = urlParams.get('user');
    if (nombreUsuarioParam) {
        usuarioAutenticado.style.display = "inline";
        nombreUsuario.textContent = nombreUsuarioParam;
        iconoCuenta.style.display = "none"; // Oculta el icono de cuenta
        cerrarSesionBtn.style.display = "inline";
    } else {
        usuarioAutenticado.style.display = "none";
        iconoCuenta.style.display = "block"; // Muestra el icono de cuenta
        cerrarSesionBtn.style.display = "none";
    }
    cerrarSesionBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});
//funcionalidad_carrusel
const slides = document.querySelectorAll(".slide");
const buttons = document.querySelectorAll(".carousel-button");
let currentIndex = 0;
function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = "block";
            buttons[i].classList.add("active");
        } else {
            slide.style.display = "none";
            buttons[i].classList.remove("active");
        }
    });
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}
showSlide(currentIndex);
setInterval(nextSlide, 3000);
//funcionalidad_botones_de_paginacion
function mostrarPagina(pagina) {
    const contenido = document.getElementById("contenido");
    if (pagina === 1) {
        window.location.href = "index.html";
    }else if (pagina === 2) {
        contenido.innerHTML = `
            <img src="imagen_titulo_masomy.png" alt="" class="imagen_titulo_masomy">
            <div class="paginaciones">
                <button onclick="mostrarPagina(1)" class="paginacion_1" ><b>1</b></button>
                <button onclick="mostrarPagina(2)" class="paginacion_2"><b>2</b></button>
                <button onclick="mostrarPagina(3)" class="paginacion_3"><b>3</b></button>
                <div class="contenedor_4">
                    <img src="imagen_producto_2.jpg" alt="" class="imagen_producto_2">
                    <p class="vestido_rosa_con_figuras_llamativas_en_blanco"><a href="detalle_de_producto.html?producto=2" class="seleccionar_vestido_rosa_con_figuras_llamativas_en_blanco"><b>vestido rosa con figuras llamativas en blanco</b></a></p>
                    <p class="talla_m"><b>talla: m</b></p>
                    <p class="precio_109_000"><b>Precio: 109.000</b></p>
                    <p class="propiedad_masomy_2"><b>Propiedad: Masomy</b></p>
                    <button onclick="agregarProductoAlCarrito('vestido rosa con figuras llamativas en blanco', '109000')" class="agregar_carrito_2"><b>Agregar al carrito</b></button>
                    <a href="compra_producto.html?producto=2" class="comprar_2"><b>Comprar</b></a> 
                </div>
            </div>
        `;
    } else if (pagina === 3) {
        contenido.innerHTML = `
            <img src="imagen_titulo_masomy.png" alt="" class="imagen_titulo_masomy">
            <div class="paginaciones">
                <button onclick="mostrarPagina(1)" class="paginacion_1" ><b>1</b></button>
                <button onclick="mostrarPagina(2)" class="paginacion_2"><b>2</b></button>
                <button onclick="mostrarPagina(3)" class="paginacion_3"><b>3</b></button>
            <div class="contenedor_4">
                <img src="imagen_producto_3.jpg" alt="" class="imagen_producto_3">
                <p class="blusa_morada_con_pantalon_blanco"><a href="detalle_de_producto.html?producto=3" class="seleccionar_blusa_morada_con_pantalon_blanco"><b>blusa morada con pantalon blanco</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_110_000"><b>Precio: 110.000</b></p>
                <p class="propiedad_masomy_3"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa morada con pantalon blanco', '110000')" class="agregar_carrito_3"><b>Agregar al carrito</b></button>
                <a href="compra_producto.html?producto=3" class="comprar_3"><b>Comprar</b></a>
            </div>
            </div>
            <div class="contenedor_5">
                <img src="imagen_producto_4.jpg" alt="" class="imagen_producto_4">
                <p class="blusa_azul"><a href="detalle_de_producto.html?producto=4" class="seleccionar_blusa_azul"><b>blusa azul</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_101_000"><b>Precio: 101.000</b></p>
                <p class="propiedad_masomy_4"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa azul', '101000')" class="agregar_carrito_4"><b>Agregar al carrito</b></button>
                <a href="compra_producto.html?producto=4" class="comprar_4"><b>Comprar</b></a>
            </div>
            </div>
        `;
    }
    const imagenPrincipal = document.querySelector(".imagen-principal");
    imagenPrincipal.style.display = "block";
}
//funcionalidad_barra_búsqueda
const barraBusqueda = document.getElementById("barraBusqueda");
if (barraBusqueda) {
    barraBusqueda.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            const consulta = barraBusqueda.value.trim().toLowerCase();
            if (consulta === "talla s") {
                window.location.href = `busqueda.html?consulta=talla_s`;
            } else if (consulta === "talla m") {
                window.location.href = `busqueda.html?consulta=talla_m`;
            }
        }
    });
}
//funcionalidad_contenido_talla_s
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const consulta = urlParams.get("consulta");
    const contenidoBusqueda = document.getElementById("contenidoBusqueda");
    if (consulta === "talla_s") {
        contenidoBusqueda.innerHTML = `
            <img src="imagen_talla_s.png" alt="" class="imagen_titulo_talla_s">
            <!--estructurando_producto_5_talla_s-->
            <div class="contenedor_6">
                <img src="imagen_producto_5.jpg" alt="" class="imagen_producto_5">
                <p class="blusa_verde_con_flores_blancas"><a href="detalle_de_producto.html?producto=5" class="seleccionar_blusa_verde_con_flores_blancas"><b>blusa verde con flores blancas</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_130_000"><b>Precio: 130.000</b></p>
                <p class="propiedad_masomy_5"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa verde con flores blancas', '130.000')" class="agregar_carrito_5"><b>Agregar al carrito</b></button>
                <a href="compra_producto.html?producto=5" class="comprar_5"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_6_talla_s-->
            <div class="contenedor_7">
                <img src="imagen_producto_6.jpg" alt="" class="imagen_producto_6">
                <p class="blusa_amarilla"><a href="detalle_de_producto.html?producto=6" class="seleccionar_blusa_amarilla"><b>blusa amarilla</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_110_000"><b>Precio: 110.000</b></p>
                <p class="propiedad_masomy_6"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa_amarilla', '110000')" class="agregar_carrito_6"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=6" class="comprar_6"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_7_talla_s-->
            <div class="contenedor_8">
                <img src="imagen_producto_7.jpg" alt="" class="imagen_producto_7">
                <p class="blusa_rosada"><a href="detalle_de_producto.html?producto=7" class="seleccionar_blusa_rosada"><b>blusa rosada</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_111_000"><b>Precio: 111.000</b></p>
                <p class="propiedad_masomy_7"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa_rosada', '111000')" class="agregar_carrito_7"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=7" class="comprar_7"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_8_talla_s-->
            <div class="contenedor_9">
                <img src="imagen_producto_8.jpg" alt="" class="imagen_producto_8">
                <p class="sueter_blanco"><a href="detalle_de_producto.html?producto=8" class="seleccionar_sueter_blanco"><b>sueter blanco</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_105_000"><b>Precio: 105.000</b></p>
                <p class="propiedad_masomy_8"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('sueter blanco', '105000')" class="agregar_carrito_8"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=8" class="comprar_8"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_9_talla_s-->
            <div class="contenedor_10">
                <img src="imagen_producto_9.jpg" alt="" class="imagen_producto_9">
                <p class="pantalon_bermuda_negro"><a href="detalle_de_producto.html?producto=9" class="seleccionar_pantalon_bermuda_negro"><b>pantalon bermuda negro</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_100_000"><b>Precio: 100.000</b></p>
                <p class="propiedad_masomy_9"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('pantalon_bermuda_negro', '100.000')" class="agregar_carrito_9"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=9" class="comprar_9"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_10_talla_s-->
            <div class="contenedor_11">
                <img src="imagen_producto_10.jpg" alt="" class="imagen_producto_10">
                <p class="camisa_blanca_y_pantaloneta_cafe"><a href="detalle_de_producto.html?producto=10" class="seleccionar_camisa_blanca_y_pantaloneta_cafe"><b>camisa blanca y pantaloneta cafe</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_100_000"><b>Precio: 100.000</b></p>
                <p class="propiedad_masomy_10"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('camisa blanca y pantaloneta cafe', '100000')" class="agregar_carrito_10"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=10" class="comprar_10"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_11_talla_s-->
            <div class="contenedor_12">
                <img src="imagen_producto_11.jpg" alt="" class="imagen_producto_11">
                <p class="pantalon_jean_hombre"><a href="detalle_de_producto.html?producto=11" class="seleccionar_pantalon_jean_hombre"><b>pantalon jean hombre</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_100_000"><b>Precio: 100.000</b></p>
                <p class="propiedad_masomy_11"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('pantalon jean hombre', '100000')" class="agregar_carrito_11"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=11" class="comprar_11"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_12_talla_s-->
            <div class="contenedor_13">
                <img src="imagen_producto_12.jpg" alt="" class="imagen_producto_12">
                <p class="camisa_azul_claro"><a href="detalle_de_producto.html?producto=12" class="seleccionar_camisa_azul_claro"><b>camisa azul claro</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_101_000"><b>Precio: 101.000</b></p>
                <p class="propiedad_masomy_12"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('camisa azul claro', '101000')" class="agregar_carrito_12"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=12" class="comprar_12"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_13_talla_s-->
            <div class="contenedor_14">
                <img src="imagen_producto_13.jpg" alt="" class="imagen_producto_13">
                <p class="bermuda_color_blanco"><a href="detalle_de_producto.html?producto=13" class="seleccionar_bermuda_color_blanco"><b>bermuda color blanco</b></a></p>
                <p class="talla_s"><b>talla: s</b></a></p>
                <p class="precio_101_000"><b>Precio: 101.000</b></p>
                <p class="propiedad_masomy_13"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('bermuda color blanco', '101000')" class="agregar_carrito_13"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=13" class="comprar_13"><b>Comprar</b></a>
            </div>
            <button class="ver_mas" onclick="mostrarMasProductosTallaS()">Ver Más</button>
            <div id="productosAdicionalesTallaS" style="display: none;"></div>
        `;
//funcionalidad_contenido_talla_m
    } else if (consulta === "talla_m") {
        contenidoBusqueda.innerHTML = `
        <img src="imagen_talla_m.png" alt="" class="imagen_titulo_talla_m">
        <!--estructurando_producto_21_talla_m-->
            <div class="contenedor_24">
                <img src="imagen_producto_21.jpg" alt="" class="imagen_producto_21">
                <p class="blusa_y_pantalon_verde"><a href="detalle_de_producto.html?producto=21" class="seleccionar_blusa_y_pantalon_verde"><b>blusa y pantalon verde</b></a></p>
                <p class="talla_m"><b>talla: m</b></a></p>
                <p class="precio_160_000"><b>Precio: 160.000</b></p>
                <p class="propiedad_masomy_21"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa y pantalon verde', '160000')" class="agregar_carrito_21"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=21" class="comprar_21"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_22_talla_m-->
            <div class="contenedor_25">
                <img src="imagen_producto_22.jpg" alt="" class="imagen_producto_22">
                <p class="vestido_azul_claro"><a href="detalle_de_producto.html?producto=22" class="seleccionar_vestido_azul_claro"><b>vestido azul claro</b></a></p>
                <p class="talla_m"><b>talla: m</b></a></p>
                <p class="precio_110_000"><b>Precio: 110.000</b></p>
                <p class="propiedad_masomy_22"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('vestido azul claro', '110000')" class="agregar_carrito_22"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=22" class="comprar_22"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_23_talla_m-->
            <div class="contenedor_26">
                <img src="imagen_producto_23.jpg" alt="" class="imagen_producto_23">
                <p class="vestido_color_negro"><a href="detalle_de_producto.html?producto=23" class="seleccionar_vestido_color_negro"><b>vestido color negro</b></a></p>
                <p class="talla_m"><b>talla: m</b></a></p>
                <p class="precio_111_000"><b>Precio: 111.000</b></p>
                <p class="propiedad_masomy_23"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('vestido color negro', '111000')" class="agregar_carrito_23"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=23" class="comprar_23"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_24_talla_m-->
            <div class="contenedor_27">
                <img src="imagen_producto_24.jpg" alt="" class="imagen_producto_24">
                <p class="blusa_blanca"><a href="detalle_de_producto.html?producto=24" class="seleccionar_blusa_blanca"><b>blusa blanca</b></a></p>
                <p class="talla_m"><b>talla: m</b></a></p>
                <p class="precio_101_000"><b>Precio: 101.000</b></p>
                <p class="propiedad_masomy_24"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('blusa blanca', '101000')" class="agregar_carrito_24"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=24" class="comprar_24"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_25_talla_m-->
            <div class="contenedor_28">
                <img src="imagen_producto_25.jpg" alt="" class="imagen_producto_25">
                <p class="vestido_amarillo"><a href="detalle_de_producto.html?producto=25" class="seleccionar_vestido_amarillo"><b>vestido amarillo</b></a></p>
                <p class="talla_m"><b>talla: m</b></a></p>
                <p class="precio_103_000"><b>Precio: 103.000</b></p>
                <p class="propiedad_masomy_25"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('vestido_amarillo', '103000')" class="agregar_carrito_25"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=25" class="comprar_25"><b>Comprar</b></a>
            </div>
            <!--estructurando_producto_26_talla_m-->
            <div class="contenedor_29">
                <img src="imagen_producto_26.jpg" alt="" class="imagen_producto_26">
                <p class="vestido_rosa"><a href="detalle_de_producto.html?producto=26" class="seleccionar_vestido_rosa"><b>vestido rosa</b></a></p>
                <p class="talla_m"><b>talla: m</b></a></p>
                <p class="precio_112_000"><b>Precio: 112.000</b></p>
                <p class="propiedad_masomy_26"><b>Propiedad: Masomy</b></p>
                <button onclick="agregarProductoAlCarrito('vestido rosa', '112000')" class="agregar_carrito_26"><b>agregar al carrito</b></button>
                <a href="compra_producto.html?producto=26" class="comprar_26"><b>Comprar</b></a>
            </div>
            <button class="ver_mas" onclick="mostrarMasProductosTallaM()">Ver Más</button>
            <div id="productosAdicionalesTallaM" style="display: none;"></div>
        `;
    } else {
        contenidoBusqueda.innerHTML = "<p>No se encontraron resultados para la consulta.</p>";
    }
});
//funcionamiento_ver_mas_y_ver_menos_en_talla_s
function mostrarMasProductosTallaS() {
    const productosAdicionalesTallaS = document.getElementById("productosAdicionalesTallaS");
    const botonVerMasTallaS = document.querySelector(".ver_mas_talla_s");
    if (productosAdicionalesTallaS.style.display === "none" || productosAdicionalesTallaS.style.display === "") {
        productosAdicionalesTallaS.innerHTML = `
        <!--estructurando_producto_14_talla_s-->
        <div class="contenedor_15">
            <img src="imagen_producto_14.jpg" alt="" class="imagen_producto_14">
            <p class="sueter_color_turquesa"><a href="detalle_de_producto.html?producto=14" class="seleccionar_sueter_color_turquesa"><b>sueter color turquesa</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_160_000"><b>Precio: 160.000</b></p>
            <p class="propiedad_masomy_14"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('sueter color turquesa', '160000')" class="agregar_carrito_14"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=14" class="comprar_14"><b>Comprar</b></a>
        </div>
        <!--estructurando_producto_15_talla_s-->
        <div class="contenedor_16">
            <img src="imagen_producto_15.jpg" alt="" class="imagen_producto_15">
            <p class="vestido_rosa"><a href="detalle_de_producto.html?producto=15" class="seleccionar_vestido_rosa"><b>vestido rosa</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_160_000"><b>Precio: 160.000</b></p>
            <p class="propiedad_masomy_15"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('vestido rosa', '160000')" class="agregar_carrito_15"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=15" class="comprar_15"><b>Comprar</b></a>
        </div>
        <!--estructurando_producto_16_talla_s-->
        <div class="contenedor_17">
            <img src="imagen_producto_16.jpg" alt="" class="imagen_producto_16">
            <p class="vestido_negro"><a href="detalle_de_producto.html?producto=16" class="seleccionar_vestido_negro"><b>vestido negro</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_140_000"><b>Precio: 140.000</b></p>
            <p class="propiedad_masomy_16"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('vestido negro', '140000')" class="agregar_carrito_16"><b>agregar al carrito</b></>
            <a href="compra_producto.html?producto=16" class="comprar_16"><b>Comprar</b></a>
        </div>
        <!--estructurando_producto_17_talla_s-->
        <div class="contenedor_18">
            <img src="imagen_producto_17.jpg" alt="" class="imagen_producto_17">
            <p class="vestido_estilo_niña"><a href="detalle_de_producto.html?producto=17" class="seleccionar_vestido_estilo_niña"><b>vestido estilo niña</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_140_000"><b>Precio: 140.000</b></p>
            <p class="propiedad_masomy_17"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('vestido estilo niña', '140000')" class="agregar_carrito_17"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=17" class="comprar_17"><b>Comprar</b></a>
        </div>
        <!--estructurando_producto_18_talla_s-->
        <div class="contenedor_19">
            <img src="imagen_producto_18.jpg" alt="" class="imagen_producto_18">
            <p class="blusa_estilo_acuario"><a href="detalle_de_producto.html?producto=18" class="seleccionar_blusa_estilo_acuario"><b>blusa estilo acuario</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_145_000"><b>Precio: 145.000</b></p>
            <p class="propiedad_masomy_18"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('blusa estilo acuario', '145000')" class="agregar_carrito_18"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=18" class="comprar_18"><b>Comprar</b></a>
        </div>
        <!--estructurando_producto_19_talla_s-->
        <div class="contenedor_20">
            <img src="imagen_producto_19.jpg" alt="" class="imagen_producto_19">
            <p class="vestido_con_petalos_llamativos"><a href="detalle_de_producto.html?producto=19" class="seleccionar_vestido_con_petalos_llamativos"><b>vestido con petalos llamativos</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_116_000"><b>Precio: 116.000</b></p>
            <p class="propiedad_masomy_19"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('vestido con petalos llamativos', '116000')" class="agregar_carrito_19"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=19" class="comprar_19"><b>Comprar</b></a>
        </div>
        <!--estructurando_producto_20_talla_s-->
        <div class="contenedor_21">
            <img src="imagen_producto_20.jpg" alt="" class="imagen_producto_20">
            <p class="bermuda_rosa"><a href="detalle_de_producto.html?producto=20" class="seleccionar_bermuda_rosa"><b>bermuda rosa</b></a></p>
            <p class="talla_s"><b>talla: s</b></a></p>
            <p class="precio_120_000"><b>Precio: 120.000</b></p>
            <p class="propiedad_masomy_20"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('bermuda rosa', '120000')" class="agregar_carrito_20"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=20" class="comprar_20"><b>Comprar</b></a>
        </div>
        `;
        productosAdicionalesTallaS.style.display = "block";
        botonVerMasTallaS.textContent = "Ver Menos (Talla S)";
    } else {
        productosAdicionalesTallaS.innerHTML = "";
        productosAdicionalesTallaS.style.display = "none";
        botonVerMasTallaS.textContent = "Ver Más (Talla S)";
    }
}
//funcionamiento_ver_mas_y_ver_menos_en_talla_m
function mostrarMasProductosTallaM() {
    const productosAdicionalesTallaM = document.getElementById("productosAdicionalesTallaM");
    const botonVerMasTallaM = document.querySelector(".ver_mas_talla_m");
    if (productosAdicionalesTallaM.style.display === "none" || productosAdicionalesTallaM.style.display === "") {
        productosAdicionalesTallaM.innerHTML = `
        <!--estructurando_producto_27_talla_m-->
        <div class="contenedor_30">
            <img src="imagen_producto_27.jpg" alt="" class="imagen_producto_27">
            <p class="vestido_morado_claro"><a href="detalle_de_producto.html?producto=27" class="seleccionar_vestido_morado_claro"><b>vestido morado claro</b></a></p>
            <p class="talla_m"><b>talla: m</b></a></p>
            <p class="precio_180_000"><b>Precio: 180.000</b></p>
            <p class="propiedad_masomy_27"><b>Propiedad: Masomy</b></p>
            <button onclick="agregarProductoAlCarrito('vestido morado claro', '180000')" class="agregar_carrito_27"><b>agregar al carrito</b></button>
            <a href="compra_producto.html?producto=27" class="comprar_27"><b>Comprar</b></a>
        </div>
        `;
        productosAdicionalesTallaM.style.display = "block";
        botonVerMasTallaM.textContent = "Ver Menos (Talla M)";
    } else {
        productosAdicionalesTallaM.innerHTML = "";
        productosAdicionalesTallaM.style.display = "none";
        botonVerMasTallaM.textContent = "Ver Más (Talla M)";
    }
}
//funcionalidad_detalle_del_producto
const imagenCarrusel = document.getElementById("imagenCarrusel");
function mostrarDetalleDeProducto(numeroProducto) {
    const productosDetalles = [
        {
            nombre: "Vestido Blanco",
            talla: "Talla L",
            precio: "120.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_1.jpg"
        },
        {
            nombre: "Vestido Rosa con Figuras Llamativas en Blanco",
            talla: "Talla M",
            precio: "109.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_2.jpg"
        },
        {
            nombre: "blusa morada con pantalon blanco",
            talla: "Talla S",
            precio: "110.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_3.jpg"
        },
        {
            nombre: "blusa azul",
            talla: "Talla S",
            precio: "101.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_4.jpg"
        },
        {
            nombre: "blusa verde con flores blancas",
            talla: "Talla S",
            precio: "130.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_5.jpg"
        },
        {
            nombre: "blusa amarilla",
            talla: "Talla S",
            precio: "110.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_6.jpg"
        },
        {
            nombre: "blusa rosada",
            talla: "Talla S",
            precio: "111.000",
            propiedad: "Masomy",
            imagenes: ["imagen_producto_7.jpg", "imagen_producto_7_parte_2.jpg"]
        },
        {
            nombre: "sueter blanco",
            talla: "Talla S",
            precio: "105.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_8.jpg"
        },
        {
            nombre: "pantalon bermuda negro",
            talla: "Talla S",
            precio: "100.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_9.jpg"
        },
        {
            nombre: "camisa blanca y pantaloneta cafe",
            talla: "Talla S",
            precio: "100.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_10.jpg"
        },
        {
            nombre: "pantalon jean hombre",
            talla: "Talla S",
            precio: "100.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_11.jpg"
        },
        {
            nombre: "camisa azul claro",
            talla: "Talla S",
            precio: "101.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_12.jpg"
        },
        {
            nombre: "bermuda color blanco",
            talla: "Talla S",
            precio: "101.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_13.jpg"
        },
        {
            nombre: "sueter color turquesa",
            talla: "Talla S",
            precio: "160.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_14.jpg"
        },
        {
            nombre: "vestido rosa",
            talla: "Talla S",
            precio: "160.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_15.jpg"
        },
        {
            nombre: "vestido negro",
            talla: "Talla S",
            precio: "140.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_16.jpg"
        },
        {
            nombre: "vestido estilo niña",
            talla: "Talla S",
            precio: "140.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_17.jpg"
        },
        {
            nombre: "blusa estilo acuario",
            talla: "Talla S",
            precio: "145.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_18.jpg"
        },
        {
            nombre: "vestido con petalos llamativos",
            talla: "Talla S",
            precio: "116.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_19.jpg"
        },
        {
            nombre: "bermuda rosa",
            talla: "Talla S",
            precio: "120.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_20.jpg"
        },
        {
            nombre: "blusa y pantalon verde",
            talla: "Talla M",
            precio: "160.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_21.jpg"
        },
        {
            nombre: "vestido azul claro",
            talla: "Talla M",
            precio: "110.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_22.jpg"
        },
        {
            nombre: "vestido color negro",
            talla: "Talla M",
            precio: "111.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_23.jpg"
        },
        {
            nombre: "blusa blanca",
            talla: "Talla M",
            precio: "101.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_24.jpg"
        },
        {
            nombre: "vestido amarillo",
            talla: "Talla M",
            precio: "103.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_25.jpg"
        },
        {
            nombre: "vestido rosa",
            talla: "Talla M",
            precio: "112.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_26.jpg"
        },
        {
            nombre: "vestido morado claro",
            talla: "Talla M",
            precio: "180.000",
            propiedad: "Masomy",
            imagen: "imagen_producto_27.jpg"
        }
    ];
    if (numeroProducto >= 1 && numeroProducto <= productosDetalles.length) {
        const productoDetalle = productosDetalles[numeroProducto - 1];
        const imagenesProducto = productoDetalle.imagenes || [productoDetalle.imagen];
        let imagenActualIndex = 0;
        function mostrarImagenActual() {
            const imagenActual = imagenesProducto[imagenActualIndex];
            const imagenElement = document.querySelector(".imagen_producto_detalles");
            imagenElement.src = imagenActual;
        }
        const contenidoProducto = `
            <div class="contenedor_22">
                <div id="imagenCarrusel" class="imagen_carrusel">
                    <img src="" alt="Imagen del producto" class="imagen_producto_detalles">
                </div>
                <div class="contenedor_23">
                    <p class="detalles"><b>Detalles</b></p>
                    <p class="producto_detalle"><b>Producto: ${productoDetalle.nombre}</b></p>
                    <p class="talla_detalle"><b>Talla: ${productoDetalle.talla}</b></p>
                    <p class="precio_detalle"><b>Precio: ${productoDetalle.precio}</b></p>
                    <p class="propiedad_detalle"><b>Propiedad: ${productoDetalle.propiedad}</b></p>
                </div>
            </div>
        `;
        const detalleProductoElement = document.getElementById("detalleProducto");
        detalleProductoElement.innerHTML = contenidoProducto;
        mostrarImagenActual();
        const botonSiguiente = document.createElement("button");
        botonSiguiente.textContent = "Siguiente";
        botonSiguiente.className = "boton_siguiente";
        botonSiguiente.addEventListener("click", () => {
            if (imagenActualIndex < imagenesProducto.length - 1) {
                imagenActualIndex++;
            } else {
                imagenActualIndex = 0;
            }
            mostrarImagenActual();
        });
        const botonAnterior = document.createElement("button");
        botonAnterior.textContent = "Anterior";
        botonAnterior.className = "boton_anterior";
        botonAnterior.addEventListener("click", () => {
            if (imagenActualIndex > 0) {
                imagenActualIndex--;
            } else {
                imagenActualIndex = imagenesProducto.length - 1;
            }
            mostrarImagenActual();
        });
        const contenedorBotones = document.createElement("div");
        contenedorBotones.className = "contenedor_botones";
        contenedorBotones.appendChild(botonAnterior);
        contenedorBotones.appendChild(botonSiguiente);
        detalleProductoElement.appendChild(contenedorBotones);
    } else {
        const detalleProductoElement = document.getElementById("detalleProducto");
        detalleProductoElement.innerHTML = "<p>No se encontró el producto solicitado.</p>";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const producto = urlParams.get("producto");
    if (producto && !isNaN(producto)) {
        mostrarDetalleDeProducto(producto);
    } else {
        const detalleProductoElement = document.getElementById("detalleProducto");
        detalleProductoElement.innerHTML = "<p>No se encontró el producto solicitado.</p>";
    }
});
//funcionalidad_de_calificacion_producto
const comentarios = [];
const calificacionesProductos = {};
function mostrarComentarios() {
    const listaComentariosElement = document.getElementById('listaComentarios');
    listaComentariosElement.innerHTML = '';
    comentarios.forEach((comentario, index) => {
        const comentarioElement = document.createElement('div');
        comentarioElement.className = 'comentario-item';
        const commentContainer = document.createElement('div');
        commentContainer.className = 'comment-container';
        commentContainer.textContent = comentario;
        const likeButton = document.createElement('button');
        likeButton.className = 'like-button';
        likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        const dislikeButton = document.createElement('button');
        dislikeButton.className = 'dislike-button';
        dislikeButton.innerHTML = '<i class="fas fa-thumbs-down"></i>';
        const likeCount = document.createElement('span');
        likeCount.className = 'like-count';
        likeCount.textContent = '0';
        const dislikeCount = document.createElement('span');
        dislikeCount.className = 'dislike-count';
        dislikeCount.textContent = '0';
        const likeDislikeContainer = document.createElement('div');
        likeDislikeContainer.className = 'like-dislike-container';
        likeDislikeContainer.appendChild(likeButton);
        likeDislikeContainer.appendChild(likeCount);
        likeDislikeContainer.appendChild(dislikeButton);
        likeDislikeContainer.appendChild(dislikeCount);
        comentarioElement.appendChild(commentContainer);
        comentarioElement.appendChild(likeDislikeContainer);
        listaComentariosElement.appendChild(comentarioElement);
        const hrElement = document.createElement('hr');
        hrElement.className = 'hr-comentario';
        listaComentariosElement.appendChild(hrElement);
    });
    
}
function agregarEventosLikesDislikes() {
    const likeButtons = document.querySelectorAll('.like-button');
    const dislikeButtons = document.querySelectorAll('.dislike-button');
    likeButtons.forEach((likeButton, index) => {
        const dislikeButton = dislikeButtons[index];
        const likeCount = document.querySelectorAll('.like-count')[index];
        const dislikeCount = document.querySelectorAll('.dislike-count')[index];
        likeButton.addEventListener('click', () => {
            if (!likeButton.classList.contains('liked')) {
                likeButton.classList.add('liked');
                dislikeButton.classList.remove('disliked');
                likeCount.textContent = '1';
                dislikeCount.textContent = '0';
            } else {
                likeButton.classList.remove('liked');
                likeCount.textContent = '0';
            }
        });
        dislikeButton.addEventListener('click', () => {
            if (!dislikeButton.classList.contains('disliked')) {
                dislikeButton.classList.add('disliked');
                likeButton.classList.remove('liked');
                dislikeCount.textContent = '1';
                likeCount.textContent = '0';
            } else {
                dislikeButton.classList.remove('disliked');
                dislikeCount.textContent = '0';
            }
        });
    });
}
function contarLikesDislikes() {
    // Esta función ya no es necesaria, ya que los botones gestionan los conteos individualmente.
}
function calificarProducto(event) {
    const valor = parseInt(event.target.getAttribute('data-valor'));
    const productoId = obtenerParametroURL('producto');
    calificacionesProductos[productoId] = valor;
    const estrellas = document.querySelectorAll('.estrella[data-valor]');
    estrellas.forEach((estrella, index) => {
        if (index < valor) {
            estrella.classList.add('selected');
        } else {
            estrella.classList.remove('selected');
        }
    });
    mostrarCalificacionProducto(productoId);
    iniciarAnimacionCalificacion();
}
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}
function mostrarCalificacionProducto(productoId) {
    const calificacionActual = calificacionesProductos[productoId];
    const estrellas = document.querySelectorAll('.estrella[data-valor]');
    const mensajeCalificacion = document.getElementById('mensajeCalificacion');
    if (calificacionActual) {
        estrellas[calificacionActual - 1].classList.add('resaltada');
        mensajeCalificacion.textContent = `Calificación fue de ${calificacionActual} estrellas.`;
    } else {
        mensajeCalificacion.textContent = "Se está calificando...";
    }
}
function iniciarAnimacionCalificacion() {
    const mensajeCalificacion = document.getElementById('mensajeCalificacion');
    mensajeCalificacion.classList.add('calificando');
}
function inicializar() {
    const productoId = obtenerParametroURL('producto');
    mostrarCalificacionProducto(productoId);
    const estrellas = document.querySelectorAll('.estrella[data-valor]');
    estrellas.forEach(estrella => {
        estrella.addEventListener('click', calificarProducto);
    });
    const enviarComentarioButton = document.getElementById('enviarComentario');
    const nuevoComentarioInput = document.getElementById('nuevoComentario');
    enviarComentarioButton.addEventListener('click', () => {
        const nuevoComentario = nuevoComentarioInput.value.trim();
        if (nuevoComentario) {
            comentarios.push(nuevoComentario);
            nuevoComentarioInput.value = '';
            mostrarComentarios();
            agregarEventosLikesDislikes();
        }
    });
    mostrarComentarios();
}
window.addEventListener('DOMContentLoaded', inicializar);
//funcionalidad_compra_de_producto
document.addEventListener('DOMContentLoaded', function () {
    const botonesComprar = document.querySelectorAll('.comprar');
    botonesComprar.forEach(function (boton) {
        boton.addEventListener('click', function () {
            const productoId = boton.getAttribute('data-producto');
            window.location.href = `compra_producto.html?producto=${productoId}`;
        });
    });
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('producto');
    const producto = obtenerInformacionDelProducto(productoId);
    if (producto) {
        document.getElementById('nombreProducto').textContent = producto.nombre;
        document.getElementById('descripcionProducto').textContent = producto.descripcion;
        document.getElementById('precioProducto').textContent = `Precio: $${producto.precio}`;
        document.getElementById('imagenProducto').src = producto.imagen;
        document.getElementById('tallaProducto').textContent = `Talla: ${producto.talla}`;
        document.getElementById('propiedadProducto').textContent = `propiedad: ${producto.propiedad}`;
    } else {
        console.log('Producto no encontrado');
    }
});
function obtenerInformacionDelProducto(productoId) {
    if (productoId === '1') {
        return {
            nombre: 'Vestido Blanco',
            descripcion: 'Referencia luna color blanco, talla disponible tallas disponibles XS-XL.',
            precio: 120.00,
            imagen: 'imagen_producto_1.jpg',
            talla: 'L',
            propiedad: 'masomy',
        };
    } else if (productoId === '2') {
        return {
            nombre: 'Vestido Rosa con Figuras Llamativas en Blanco',
            descripcion: 'Descripción del Vestido Rosa con Figuras Llamativas en Blanco.',
            precio: 109.00,
            imagen: 'imagen_producto_2.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '3') {
        return {
            nombre: 'blusa morada con pantalon blanco',
            descripcion: 'Descripción del .',
            precio: 110.00,
            imagen: 'imagen_producto_3.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '4') {
        return {
            nombre: 'blusa morada con pantalon blanco',
            descripcion: 'Descripción del producto 4 .',
            precio: 101.00,
            imagen: 'imagen_producto_4.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '5') {
        return {
            nombre: 'blusa verde con flores blancas',
            descripcion: 'Descripción del producto 5 .',
            precio: 130.00,
            imagen: 'imagen_producto_5.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '6') {
        return {
            nombre: 'blusa amarilla',
            descripcion: 'Descripción del producto 6 .',
            precio: 110.00,
            imagen: 'imagen_producto_6.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '7') {
        return {
            nombre: 'blusa rosada',
            descripcion: 'Descripción del producto 7 .',
            precio: 111.00,
            imagen: 'imagen_producto_7.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '8') {
        return {
            nombre: 'sueter blanco',
            descripcion: 'Descripción del producto 8 .',
            precio: 105.00,
            imagen: 'imagen_producto_8.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '9') {
        return {
            nombre: 'pantalon bermuda negro',
            descripcion: 'Descripción del producto 9 .',
            precio: 100.00,
            imagen: 'imagen_producto_9.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '10') {
        return {
            nombre: 'camisa blanca y pantaloneta cafe',
            descripcion: 'Descripción del producto 10 .',
            precio: 100.00,
            imagen: 'imagen_producto_10.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '11') {
        return {
            nombre: '',
            descripcion: 'Descripción del producto 11 .',
            precio: .00,
            imagen: 'imagen_producto_11.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '12') {
        return {
            nombre: 'camisa_azul_claro',
            descripcion: 'Descripción del producto 12 .',
            precio: 101.00,
            imagen: 'imagen_producto_12.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '13') {
        return {
            nombre: 'bermuda color blanco',
            descripcion: 'Descripción del producto 13 .',
            precio: 101.00,
            imagen: 'imagen_producto_13.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '14') {
        return {
            nombre: 'blusa y pantalon verde',
            descripcion: 'Descripción del producto 14 .',
            precio: 160.00,
            imagen: 'imagen_producto_14.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '15') {
        return {
            nombre: 'vestido rosa',
            descripcion: 'Descripción del producto 15 .',
            precio: 160.00,
            imagen: 'imagen_producto_15.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '16') {
        return {
            nombre: 'vestido negro',
            descripcion: 'Descripción del producto 16 .',
            precio: 120.00,
            imagen: 'imagen_producto_16.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '17') {
        return {
            nombre: 'vestido estilo niña',
            descripcion: 'Descripción del producto 17 .',
            precio: 140.00,
            imagen: 'imagen_producto_17.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '18') {
        return {
            nombre: 'blusa estilo acuario',
            descripcion: 'Descripción del producto 18 .',
            precio: 145.00,
            imagen: 'imagen_producto_18.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '19') {
        return {
            nombre: 'vestido con petalos llamativos',
            descripcion: 'Descripción del producto 19 .',
            precio: 116.00,
            imagen: 'imagen_producto_19.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '20') {
        return {
            nombre: 'bermuda rosa',
            descripcion: 'Descripción del producto 20 .',
            precio: 120.00,
            imagen: 'imagen_producto_20.jpg',
            talla: 'S',
            propiedad: 'masomy',
        };
    } else if (productoId === '21') {
        return {
            nombre: 'blusa y pantalon verde',
            descripcion: 'Descripción del producto 21 .',
            precio: 160.00,
            imagen: 'imagen_producto_21.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '22') {
        return {
            nombre: 'vestido azul claro',
            descripcion: 'Descripción del producto 22 .',
            precio: 110.00,
            imagen: 'imagen_producto_22.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '23') {
        return {
            nombre: 'vestido color negro',
            descripcion: 'Descripción del producto 23 .',
            precio: 111.00,
            imagen: 'imagen_producto_23.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '24') {
        return {
            nombre: 'blusa blanca',
            descripcion: 'Descripción del producto 24 .',
            precio: 101.00,
            imagen: 'imagen_producto_24.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '25') {
        return {
            nombre: 'vestido amarillo',
            descripcion: 'Descripción del producto 25 .',
            precio: 103.00,
            imagen: 'imagen_producto_25.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '26') {
        return {
            nombre: 'vestido rosa',
            descripcion: 'Descripción del producto 26 .',
            precio: 112.00,
            imagen: 'imagen_producto_26.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    } else if (productoId === '27') {
        return {
            nombre: 'vestido morado claro',
            descripcion: 'Descripción del producto 27 .',
            precio: 180.00,
            imagen: 'imagen_producto_27.jpg',
            talla: 'M',
            propiedad: 'masomy',
        };
    }    
    return null;
}
document.addEventListener("DOMContentLoaded", function () {
    const guardarDatosBtn = document.getElementById("guardarDatos");
    guardarDatosBtn.addEventListener("click", mostrarDatos);
});
function mostrarDatos() {
    const contenedorDatos = document.getElementById("contenedorDatos");
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const genero = document.getElementById("genero").value;
    const ciudad = document.getElementById("ciudad").value;
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const numeroCedula = document.getElementById("numeroCedula").value;
    const tarjetaBancaria = document.getElementById("tarjetaBancaria").value;
    document.getElementById("nombreMostrado").textContent = nombre;
    document.getElementById("apellidoMostrado").textContent = apellido;
    document.getElementById("generoMostrado").textContent = genero;
    document.getElementById("ciudadMostrada").textContent = ciudad;
    document.getElementById("tipoDocumentoMostrado").textContent = tipoDocumento;
    document.getElementById("numeroCedulaMostrado").textContent = numeroCedula;
    document.getElementById("tarjetaBancariaMostrada").textContent = tarjetaBancaria;
    contenedorDatos.style.display = "block";
}
function irAConfirmacionCompra() {
    const productosEnCarritoElement = document.getElementById("productosEnCarrito");
    carrito.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.innerHTML = `
            <p><b>${producto.nombre}</b> - $${producto.precio}</p>
        `;
        productosEnCarritoElement.appendChild(productoElemento);
    });
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const genero = document.getElementById("genero").value;
    const ciudad = document.getElementById("ciudad").value;
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const numeroCedula = document.getElementById("numeroCedula").value;
    const tarjetaBancaria = document.getElementById("tarjetaBancaria").value;
    const parametros = `?nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}&genero=${encodeURIComponent(genero)}&ciudad=${encodeURIComponent(ciudad)}&tipoDocumento=${encodeURIComponent(tipoDocumento)}&numeroCedula=${encodeURIComponent(numeroCedula)}&tarjetaBancaria=${encodeURIComponent(tarjetaBancaria)}`;
    window.location.href = `confirmacion_compra.html${parametros}`;
}
function regresarAInicio() {
    window.location.href = 'index.html';
}