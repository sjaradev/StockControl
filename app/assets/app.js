/* ============================================================
   StockControl — aplicación móvil
   Lógica de navegación del prototipo.

   Los datos son de ejemplo y viven en este archivo. Cuando la
   API esté construida, estas listas se reemplazan por llamadas
   con fetch a los mismos nombres de campo.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Datos de ejemplo ---------------- */

  var articulos = [
    { nombre: "Taladro percutor 750W", codigo: "7801234567890", categoria: "Herramientas",
      ubicacion: "Bodega A · Estante 3", stock: 12, minimo: 5, unidad: "unidades" },
    { nombre: "Guantes de nitrilo talla M", codigo: "7809988776655", categoria: "Insumos",
      ubicacion: "Bodega B · Estante 1", stock: 340, minimo: 100, unidad: "pares" },
    { nombre: "Casco de seguridad blanco", codigo: "7801122334455", categoria: "Seguridad",
      ubicacion: "Bodega A · Estante 7", stock: 8, minimo: 15, unidad: "unidades" },
    { nombre: "Cinta de embalaje 48mm", codigo: "7805566778899", categoria: "Insumos",
      ubicacion: "Bodega C · Estante 2", stock: 0, minimo: 25, unidad: "rollos" },
    { nombre: "Tornillo 3/8 (caja 100)", codigo: "7804433221100", categoria: "Herramientas",
      ubicacion: "Bodega B · Estante 5", stock: 27, minimo: 10, unidad: "cajas" },
    { nombre: "Mascarilla N95", codigo: "7807766554433", categoria: "Seguridad",
      ubicacion: "Bodega B · Estante 1", stock: 15, minimo: 20, unidad: "cajas" }
  ];

  var movimientos = [
    { hora: "09:48", articulo: "Guantes de nitrilo talla M", tipo: "entrada", cantidad: 120, usuario: "F. Flores" },
    { hora: "09:22", articulo: "Taladro percutor 750W", tipo: "salida", cantidad: 2, usuario: "S. Jara" },
    { hora: "08:55", articulo: "Casco de seguridad blanco", tipo: "traslado", cantidad: 15, usuario: "R. Rivas" },
    { hora: "08:30", articulo: "Cinta de embalaje 48mm", tipo: "entrada", cantidad: 60, usuario: "R. Rivas" },
    { hora: "08:12", articulo: "Mascarilla N95", tipo: "salida", cantidad: 5, usuario: "F. Flores" },
    { hora: "07:58", articulo: "Tornillo 3/8 (caja 100)", tipo: "entrada", cantidad: 30, usuario: "S. Jara" }
  ];

  /* ---------------- Estado de la aplicación ---------------- */

  var USUARIO_DEMO = "demo";
  var CLAVE_DEMO = "demo";

  var pantallaActual = "login";
  var articuloElegido = articulos[0];
  var tipoMovimiento = "entrada";
  var cantidad = 10;
  var eventoInstalacion = null;

  // Pantallas que muestran la barra de pestañas
  var CON_PESTANAS = ["inicio", "articulos", "detalle", "escaner", "historial", "alertas", "perfil"];

  // Qué pestaña se marca en cada pantalla
  var PESTANA_DE = {
    inicio: "inicio", articulos: "articulos", detalle: "articulos",
    escaner: "escaner", movimiento: "historial", listo: "historial",
    historial: "historial", alertas: "inicio", perfil: "perfil"
  };

  var NOMBRE_TIPO = { entrada: "Entrada", salida: "Salida", traslado: "Traslado" };

  /* ---------------- Utilidades ---------------- */

  function $(selector) { return document.querySelector(selector); }

  function iniciales(texto) {
    return texto.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ ]/g, "").trim().slice(0, 2).toUpperCase();
  }

  function estadoDeStock(articulo) {
    if (articulo.stock === 0) return { clase: "sin", texto: "Sin stock" };
    if (articulo.stock < articulo.minimo) return { clase: "bajo", texto: "Bajo mínimo" };
    return { clase: "ok", texto: "Disponible" };
  }

  async function avisar(mensaje, color) {
    var toast = document.createElement("ion-toast");
    toast.message = mensaje;
    toast.duration = 2600;
    toast.position = "top";
    toast.color = color || "dark";
    document.body.appendChild(toast);
    await toast.present();
  }

  /* ---------------- Navegación ---------------- */

  function ir(nombre) {
    var destino = document.getElementById("pantalla-" + nombre);
    if (!destino) return;

    document.querySelectorAll(".pantalla").forEach(function (p) {
      p.classList.remove("activa");
    });
    destino.classList.add("activa");
    pantallaActual = nombre;

    // El contenido con scroll es el ion-content de cada pantalla
    var contenido = destino.querySelector("ion-content");
    if (contenido && contenido.scrollToTop) {
      contenido.scrollToTop(0);
    }

    var barra = $("#barra-pestanas");
    barra.style.display = CON_PESTANAS.indexOf(nombre) >= 0 ? "flex" : "none";

    var activa = PESTANA_DE[nombre];
    document.querySelectorAll("ion-tab-button").forEach(function (b) {
      b.classList.toggle("seleccionada", b.dataset.ir === activa);
    });
  }

  /* ---------------- Pintar las listas ---------------- */

  var categoriaActiva = "todos";
  var textoBusqueda = "";

  function pintarArticulos() {
    var lista = $("#lista-articulos");
    var texto = textoBusqueda.toLowerCase();

    var visibles = articulos.filter(function (a) {
      var coincideTexto = !texto ||
             a.nombre.toLowerCase().indexOf(texto) >= 0 ||
             a.codigo.indexOf(texto) >= 0;
      var coincideCategoria = categoriaActiva === "todos" ||
             a.categoria === categoriaActiva;
      return coincideTexto && coincideCategoria;
    });

    if (!visibles.length) {
      lista.innerHTML = '<ion-item lines="none"><ion-label class="ion-text-center">' +
                        '<p>No se encontraron artículos.</p></ion-label></ion-item>';
      return;
    }

    lista.innerHTML = visibles.map(function (a) {
      var estado = estadoDeStock(a);
      return '<ion-item button data-codigo="' + a.codigo + '">' +
             '  <div slot="start" class="cuadro-inicial">' + iniciales(a.nombre) + '</div>' +
             '  <ion-label>' +
             '    <h4>' + a.nombre + '</h4>' +
             '    <p>' + a.codigo + '</p>' +
             '    <p>' + a.ubicacion + '</p>' +
             '    <span class="estado ' + estado.clase + '">' + estado.texto + '</span>' +
             '  </ion-label>' +
             '  <ion-note slot="end">' + a.stock + '<br>' +
             '    <small style="font-weight:400;font-size:10.5px">' + a.unidad + '</small>' +
             '  </ion-note>' +
             '</ion-item>';
    }).join("");
  }

  function pintarHistorial() {
    var iconos = {
      entrada: { icono: "arrow-down-circle", color: "success", signo: "+" },
      salida: { icono: "arrow-up-circle", color: "danger", signo: "-" },
      traslado: { icono: "swap-horizontal", color: "primary", signo: "" }
    };

    $("#lista-historial").innerHTML = movimientos.map(function (m) {
      var e = iconos[m.tipo];
      return '<ion-item>' +
             '  <ion-icon slot="start" name="' + e.icono + '" color="' + e.color + '"></ion-icon>' +
             '  <ion-label>' +
             '    <h4>' + m.articulo + '</h4>' +
             '    <p>' + m.hora + ' · ' + NOMBRE_TIPO[m.tipo] + ' · ' + m.usuario + '</p>' +
             '  </ion-label>' +
             '  <ion-note slot="end" color="' + e.color + '">' + e.signo + m.cantidad + '</ion-note>' +
             '</ion-item>';
    }).join("");
  }

  function pintarAlertas() {
    var criticos = articulos.filter(function (a) { return a.stock < a.minimo; });

    $("#lista-alertas").innerHTML = criticos.map(function (a) {
      var estado = estadoDeStock(a);
      var falta = a.minimo - a.stock;
      return '<ion-item button data-codigo="' + a.codigo + '">' +
             '  <div slot="start" class="cuadro-inicial">' + iniciales(a.nombre) + '</div>' +
             '  <ion-label>' +
             '    <h4>' + a.nombre + '</h4>' +
             '    <p>Mínimo requerido: ' + a.minimo + ' · faltan ' + falta + '</p>' +
             '    <span class="estado ' + estado.clase + '">' + estado.texto + '</span>' +
             '  </ion-label>' +
             '  <ion-note slot="end" color="' + (a.stock ? "warning" : "danger") + '">' + a.stock + '</ion-note>' +
             '</ion-item>';
    }).join("");
  }

  function abrirDetalle(codigo) {
    var encontrado = articulos.filter(function (a) { return a.codigo === codigo; })[0];
    if (encontrado) articuloElegido = encontrado;

    $("#detalle-nombre").textContent = articuloElegido.nombre;
    $("#detalle-codigo").textContent = articuloElegido.codigo;
    $("#detalle-stock").textContent = articuloElegido.stock;
    $("#detalle-categoria").textContent = articuloElegido.categoria;
    $("#detalle-ubicacion").textContent = articuloElegido.ubicacion;
    $("#mov-articulo").textContent = articuloElegido.nombre;
    ir("detalle");
  }

  /* ---------------- Inicio de sesión ---------------- */

  async function validarAcceso() {
    var usuario = (await $("#usuario").getInputElement()).value.trim();
    var clave = (await $("#clave").getInputElement()).value;
    var error = $("#error-login");

    if (!usuario || !clave) {
      error.textContent = "Completa el usuario y la contraseña.";
      error.classList.add("visible");
      return;
    }
    if (usuario !== USUARIO_DEMO || clave !== CLAVE_DEMO) {
      error.textContent = "Usuario o contraseña incorrecta. Usa demo / demo.";
      error.classList.add("visible");
      return;
    }

    error.classList.remove("visible");
    $("#pantalla-login").classList.remove("activa");
    $("#app-interna").classList.remove("oculto");
    ir("inicio");
    avisar("Sesión iniciada. Datos sincronizados con la plataforma web.", "success");
  }

  function cerrarSesion() {
    $("#app-interna").classList.add("oculto");
    document.querySelectorAll(".pantalla").forEach(function (p) {
      p.classList.remove("activa");
    });
    $("#pantalla-login").classList.add("activa");
    pantallaActual = "login";
    avisar("Sesión cerrada");
  }

  /* ---------------- Estilo de interfaz iOS / Android ---------------- */

  function modoActual() {
    return localStorage.getItem("sc_modo") === "android" ? "android" : "ios";
  }

  function pintarModo() {
    var texto = modoActual() === "android" ? "Android" : "iOS";
    var enLogin = $("#modo-actual");
    var enPerfil = $("#modo-perfil");
    var enInicio = $("#modo-inicio");
    if (enLogin) enLogin.textContent = texto;
    if (enPerfil) enPerfil.textContent = texto;
    if (enInicio) enInicio.textContent = texto;
  }

  function aplicarModo(nuevo) {
    localStorage.setItem("sc_modo", nuevo);
    // Ionic define el estilo al cargar, por eso se recarga la página.
    location.search = "?modo=" + nuevo;
  }

  function cambiarModo() {
    aplicarModo(modoActual() === "android" ? "ios" : "android");
  }

  /* ---------------- Instalación como aplicación ---------------- */

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    eventoInstalacion = e;
    var estado = $("#estado-instalacion");
    if (estado) estado.textContent = "Disponible";
  });

  async function instalar() {
    if (!eventoInstalacion) {
      avisar("Usa el menú del navegador y elige «Agregar a pantalla de inicio».");
      return;
    }
    eventoInstalacion.prompt();
    var resultado = await eventoInstalacion.userChoice;
    if (resultado.outcome === "accepted") {
      $("#estado-instalacion").textContent = "Instalada";
      avisar("Aplicación instalada en el dispositivo.", "success");
    }
    eventoInstalacion = null;
  }

  /* ---------------- Movimiento ---------------- */

  function pintarCantidad() {
    $("#cantidad").textContent = cantidad;
  }

  function seleccionarTipo(tipo) {
    tipoMovimiento = tipo;
    var segmento = $("#tipo-movimiento");
    if (segmento) segmento.value = tipo;
  }

  // Ionic dibuja este cuadro con el aspecto de cada sistema: en iOS
  // aparece centrado y redondeado, y en Android con el estilo Material.
  async function preguntarAntesDeGuardar() {
    var alerta = document.createElement("ion-alert");
    alerta.header = "Confirmar " + NOMBRE_TIPO[tipoMovimiento].toLowerCase();
    alerta.message = cantidad + " " + articuloElegido.unidad + " de " +
                     articuloElegido.nombre + ".";
    alerta.buttons = [
      { text: "Cancelar", role: "cancel" },
      { text: "Confirmar", role: "confirm", handler: function () { confirmarMovimiento(); } }
    ];
    document.body.appendChild(alerta);
    await alerta.present();
  }

  // Hoja de acciones para elegir el estilo de interfaz. En iOS sube desde
  // abajo con esquinas redondeadas; en Android es una lista Material.
  async function elegirEstilo() {
    var hoja = document.createElement("ion-action-sheet");
    hoja.header = "Estilo de interfaz";
    hoja.subHeader = "El mismo código, dibujado por Ionic según la plataforma";
    hoja.buttons = [
      { text: "iOS", icon: "logo-apple", data: "ios" },
      { text: "Android", icon: "logo-android", data: "android" },
      { text: "Cancelar", role: "cancel" }
    ];
    document.body.appendChild(hoja);
    await hoja.present();
    var elegido = await hoja.onDidDismiss();
    if (elegido.data && elegido.data !== modoActual()) {
      aplicarModo(elegido.data);
    }
  }

  function confirmarMovimiento() {
    var stockPrevio = articuloElegido.stock;
    var nuevo = tipoMovimiento === "entrada" ? stockPrevio + cantidad
              : tipoMovimiento === "salida" ? Math.max(0, stockPrevio - cantidad)
              : stockPrevio;

    // El prototipo actualiza el dato en memoria para que el cambio
    // se note al volver al listado.
    articuloElegido.stock = nuevo;

    movimientos.unshift({
      hora: new Date().toTimeString().slice(0, 5),
      articulo: articuloElegido.nombre,
      tipo: tipoMovimiento,
      cantidad: cantidad,
      usuario: "R. Rivas"
    });

    $("#listo-tipo").textContent = NOMBRE_TIPO[tipoMovimiento];
    $("#listo-cantidad").textContent = cantidad + " " + articuloElegido.unidad;
    $("#listo-stock").textContent = nuevo + " " + articuloElegido.unidad;

    pintarArticulos();
    pintarHistorial();
    pintarAlertas();
    ir("listo");
  }

  /* ---------------- Código de barras decorativo ---------------- */

  function dibujarCodigoBarras() {
    var contenedor = $("#codigo-barras");
    if (!contenedor) return;
    var html = "";
    for (var i = 0; i < 32; i++) {
      var alto = 24 + Math.round(Math.random() * 30);
      var ancho = Math.random() > 0.7 ? 5 : 3;
      html += '<i style="height:' + alto + 'px;width:' + ancho + 'px"></i>';
    }
    contenedor.innerHTML = html;
  }

  /* ---------------- Eventos ---------------- */

  document.addEventListener("click", function (e) {
    // Ir a una pantalla
    var destino = e.target.closest("[data-ir]");
    if (destino) {
      if (destino.dataset.tipo) seleccionarTipo(destino.dataset.tipo);
      ir(destino.dataset.ir);
      return;
    }

    // Abrir el detalle de un artículo
    var fila = e.target.closest("ion-item[data-codigo]");
    if (fila) {
      abrirDetalle(fila.dataset.codigo);
      return;
    }

  });

  document.addEventListener("DOMContentLoaded", function () {
    pintarArticulos();
    pintarHistorial();
    pintarAlertas();
    pintarCantidad();
    pintarModo();
    dibujarCodigoBarras();
    ir("login");

    $("#boton-entrar").addEventListener("click", validarAcceso);
    $("#cerrar-sesion").addEventListener("click", cerrarSesion);
    $("#chip-modo").addEventListener("click", cambiarModo);
    $("#item-modo").addEventListener("click", elegirEstilo);
    $("#tarjeta-modo").addEventListener("click", elegirEstilo);
    $("#boton-modo-barra").addEventListener("click", elegirEstilo);
    $("#item-instalar").addEventListener("click", instalar);

    $("#menos").addEventListener("click", function () {
      if (cantidad > 1) { cantidad--; pintarCantidad(); }
    });
    $("#mas").addEventListener("click", function () {
      if (cantidad < 999) { cantidad++; pintarCantidad(); }
    });

    $("#tipo-movimiento").addEventListener("ionChange", function (e) {
      tipoMovimiento = e.detail.value;
    });

    $("#confirmar-movimiento").addEventListener("click", preguntarAntesDeGuardar);

    $("#boton-escanear").addEventListener("click", function () {
      var azar = articulos[Math.floor(Math.random() * articulos.length)];
      avisar("Artículo identificado: " + azar.nombre, "success");
      abrirDetalle(azar.codigo);
    });

    $("#buscador").addEventListener("ionInput", function (e) {
      textoBusqueda = e.detail.value || "";
      pintarArticulos();
    });

    $("#filtro-categoria").addEventListener("ionChange", function (e) {
      categoriaActiva = e.detail.value;
      pintarArticulos();
    });

    // El botón de volver de Ionic no navega solo en este prototipo,
    // porque no usamos el enrutador del framework.
    document.querySelectorAll("ion-back-button[data-ir]").forEach(function (b) {
      b.addEventListener("click", function (ev) {
        ev.preventDefault();
        ir(b.dataset.ir);
      });
    });

    // Los campos del login también responden a la tecla Enter
    ["#usuario", "#clave"].forEach(function (sel) {
      $(sel).addEventListener("keydown", function (e) {
        if (e.key === "Enter") validarAcceso();
      });
      $(sel).addEventListener("ionInput", function () {
        $("#error-login").classList.remove("visible");
      });
    });
  });

  /* ---------------- Registro del service worker ---------------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        // Si el registro falla la aplicación igual funciona, solo
        // pierde la posibilidad de abrirse sin conexión.
      });
    });
  }
})();
