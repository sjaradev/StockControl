/* ============================================================
   StockControl - Mockup de la plataforma web
   Navegacion del prototipo. No hay logica de negocio todavia:
   los datos son de ejemplo y sirven para validar el diseno.
   ============================================================ */

(function () {
  "use strict";

  var USUARIO = "demo";
  var CLAVE = "demo";

  var TITULOS = {
    dash:   ["Panel principal", "Resumen del inventario de Bodega Central"],
    items:  ["Articulos", "Catalogo de articulos del inventario"],
    detail: ["Detalle del articulo", "Informacion e historial de movimientos"],
    moves:  ["Movimientos", "Entradas, salidas y traslados registrados"],
    alerts: ["Alertas", "Articulos bajo el minimo o sin stock"],
    users:  ["Usuarios", "Cuentas con acceso a la plataforma y a la app movil"]
  };

  // Que boton del menu se marca para cada pagina
  var MENU_DE = {
    dash: "dash", items: "items", detail: "items",
    moves: "moves", alerts: "alerts", users: "users"
  };

  var login = document.getElementById("login");
  var panel = document.getElementById("panel");
  var titulo = document.getElementById("ptitle");
  var subtitulo = document.getElementById("psub");
  var toast = document.getElementById("toast");
  var toastText = document.getElementById("toastText");
  var temporizador = null;

  /* ---------- Aviso emergente ---------- */
  function avisar(mensaje) {
    if (!mensaje) return;
    toastText.textContent = mensaje;
    toast.classList.add("show");
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  }

  /* ---------- Cambio de pagina ---------- */
  function abrir(nombre) {
    var destino = document.getElementById("pg-" + nombre);
    if (!destino) return;

    document.querySelectorAll(".page").forEach(function (p) {
      p.classList.remove("on");
    });
    destino.classList.add("on");

    var t = TITULOS[nombre];
    if (t) {
      titulo.textContent = t[0];
      subtitulo.textContent = t[1];
    }

    var activo = MENU_DE[nombre];
    document.querySelectorAll(".nav-item").forEach(function (b) {
      b.classList.toggle("on", b.dataset.page === activo);
    });

    document.querySelector(".content").scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Inicio de sesion ---------- */
  var entrar = document.getElementById("wenter");
  var campoUsuario = document.getElementById("wuser");
  var campoClave = document.getElementById("wpass");
  var error = document.getElementById("werr");

  function validar() {
    var u = campoUsuario.value.trim();
    var c = campoClave.value;

    if (!u || !c) {
      error.textContent = "Completa el usuario y la contrasena.";
      error.style.display = "block";
      return;
    }
    if (u !== USUARIO || c !== CLAVE) {
      error.textContent = "Usuario o contrasena incorrecta. Usa demo / demo.";
      error.style.display = "block";
      return;
    }

    error.style.display = "none";
    login.style.display = "none";
    panel.style.display = "flex";
    abrir("dash");
    avisar("Sesion iniciada. Los movimientos de la app movil ya estan sincronizados.");
  }

  if (entrar) {
    entrar.addEventListener("click", validar);
  }

  // Limpiar el mensaje de error al escribir
  [campoUsuario, campoClave].forEach(function (campo) {
    if (!campo) return;
    campo.addEventListener("input", function () {
      error.style.display = "none";
    });
    campo.addEventListener("keydown", function (e) {
      if (e.key === "Enter") validar();
    });
  });

  /* ---------- Clicks con data-page y data-toast ---------- */
  document.addEventListener("click", function (e) {
    var destino = e.target.closest("[data-page]");
    if (destino) {
      abrir(destino.dataset.page);
      return;
    }
    var aviso = e.target.closest("[data-toast]");
    if (aviso) {
      avisar(aviso.dataset.toast);
    }
  });

  /* ---------- Filtros ---------- */
  document.querySelectorAll(".filters").forEach(function (grupo) {
    grupo.addEventListener("click", function (e) {
      var p = e.target.closest(".pill");
      if (!p) return;
      grupo.querySelectorAll(".pill").forEach(function (o) { o.classList.remove("on"); });
      p.classList.add("on");
    });
  });
})();
