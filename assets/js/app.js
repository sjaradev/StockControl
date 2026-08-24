/* ============================================================
   StockControl - Mockup movil
   Navegacion del prototipo.
   Este archivo solo controla el cambio de pantallas y algunos
   detalles visuales. Todavia no hay logica de negocio ni
   conexion con la base de datos: eso corresponde a la
   siguiente etapa del proyecto.
   ============================================================ */

(function () {
  "use strict";

  // Pantallas que muestran la barra de navegacion inferior
  var CON_TABBAR = ["home", "items", "scan", "history", "profile", "detail", "alerts"];

  // Pantallas que usan barra de estado con texto claro (fondo oscuro)
  var FONDO_OSCURO = ["login", "scan"];

  // Pestanas de la barra inferior que se deben marcar como activas
  var TAB_DE = {
    home: "home",
    items: "items",
    detail: "items",
    scan: "scan",
    history: "history",
    move: "history",
    done: "history",
    profile: "profile",
    alerts: "home"
  };

  var vistaActual = "login";

  var views = document.querySelectorAll(".view");
  var tabbar = document.getElementById("tabbar");
  var statusbar = document.getElementById("statusbar");
  var toast = document.getElementById("toast");
  var toastText = document.getElementById("toastText");
  var toastTimer = null;

  /* ---------- Cambiar de pantalla ---------- */
  function ir(nombre) {
    var destino = document.getElementById("v-" + nombre);
    if (!destino) return;

    views.forEach(function (v) { v.classList.remove("active"); });
    destino.classList.add("active");
    destino.scrollTop = 0;
    vistaActual = nombre;

    // Mostrar u ocultar la barra inferior
    tabbar.style.display = CON_TABBAR.indexOf(nombre) >= 0 ? "grid" : "none";

    // Color de la barra de estado segun el fondo de la pantalla
    statusbar.classList.toggle("on-dark", FONDO_OSCURO.indexOf(nombre) >= 0);

    // Marcar la pestana correspondiente
    var activa = TAB_DE[nombre];
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("on", t.dataset.go === activa);
    });
  }

  /* ---------- Aviso emergente ---------- */
  function avisar(mensaje) {
    if (!mensaje) return;
    toastText.textContent = mensaje;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  /* ---------- Clicks con data-go ---------- */
  document.addEventListener("click", function (e) {
    var destino = e.target.closest("[data-go]");
    if (!destino) return;

    // Si el boton indica un tipo de movimiento, preseleccionarlo
    if (destino.dataset.kind) {
      seleccionarTipo(destino.dataset.kind);
    }

    ir(destino.dataset.go);
    avisar(destino.dataset.toast);
  });

  /* ---------- Chips de filtro ---------- */
  document.querySelectorAll(".chips").forEach(function (grupo) {
    grupo.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      grupo.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
      chip.classList.add("on");
    });
  });

  /* ---------- Selector entrada / salida / traslado ---------- */
  var seg = document.getElementById("seg");
  var tipoActual = "in";

  var NOMBRE_TIPO = { in: "Entrada", out: "Salida", mov: "Traslado" };

  function seleccionarTipo(kind) {
    if (!seg) return;
    tipoActual = kind;
    seg.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.kind === kind);
    });
  }

  if (seg) {
    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) seleccionarTipo(b.dataset.kind);
    });
  }

  /* ---------- Contador de cantidad ---------- */
  var qtyEl = document.getElementById("qty");
  var cantidad = 10;

  function pintarCantidad() {
    if (qtyEl) qtyEl.textContent = cantidad;
  }

  var menos = document.getElementById("minus");
  var mas = document.getElementById("plus");

  if (menos) {
    menos.addEventListener("click", function () {
      if (cantidad > 1) { cantidad--; pintarCantidad(); }
    });
  }

  if (mas) {
    mas.addEventListener("click", function () {
      if (cantidad < 999) { cantidad++; pintarCantidad(); }
    });
  }

  /* ---------- Comprobante de la pantalla de exito ---------- */
  var doneKind = document.getElementById("doneKind");
  var doneQty = document.getElementById("doneQty");
  var doneStock = document.getElementById("doneStock");

  function actualizarComprobante() {
    if (!doneKind) return;
    doneKind.textContent = NOMBRE_TIPO[tipoActual] || "Entrada";
    doneQty.textContent = cantidad + " unidades";

    // Stock de ejemplo: 12 disponibles antes del movimiento
    var base = 12;
    var nuevo = tipoActual === "in" ? base + cantidad
              : tipoActual === "out" ? Math.max(0, base - cantidad)
              : base;
    doneStock.textContent = nuevo + " unidades";
  }

  // Recalcular el comprobante justo antes de mostrar la pantalla de exito
  document.querySelectorAll('[data-go="done"]').forEach(function (b) {
    b.addEventListener("click", actualizarComprobante);
  });

  /* ---------- Codigo de barras decorativo del escaner ---------- */
  var barcode = document.getElementById("barcode");
  if (barcode) {
    var html = "";
    for (var i = 0; i < 34; i++) {
      var alto = 26 + Math.round(Math.random() * 30);
      var ancho = Math.random() > 0.7 ? 5 : 3;
      html += '<i style="height:' + alto + 'px;width:' + ancho + 'px"></i>';
    }
    barcode.innerHTML = html;
  }

  /* ---------- Reloj de la barra de estado ---------- */
  var clock = document.getElementById("clock");

  function pintarHora() {
    if (!clock) return;
    var ahora = new Date();
    var h = ahora.getHours();
    var m = ahora.getMinutes();
    clock.textContent = h + ":" + (m < 10 ? "0" + m : m);
  }

  pintarHora();
  setInterval(pintarHora, 30000);

  /* ---------- Estado inicial ---------- */
  ir("login");
})();
