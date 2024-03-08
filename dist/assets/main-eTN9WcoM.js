(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const header = {
  template: `
    <h1 class="d-flex justify-content-center p-5 text-light bg-dark">David Escalona García</h1>
    `,
  script: () => {
  }
};
const cervezas = [
  {
    id: 3,
    nombre: "Mahou Cinco Estrellas",
    tipo: "Lager",
    origen: "Madrid",
    descripcion: "Cerveza rubia, suave y refrescante con un sabor ligeramente amargo.",
    imagen: "https://www.mahou.es/wp-content/themes/mahou_v2/template-contents/mahou-familia/dist/images/Botella_Mahou_5_Estrellas.png"
  },
  {
    id: 22,
    nombre: "Estrella Galicia",
    tipo: "Lager",
    origen: "Galicia",
    descripcion: "Cerveza suave y equilibrada con un sabor ligeramente amargo y aroma a malta.",
    imagen: "https://cdn.shopify.com/s/files/1/0271/8158/0388/products/estrella-galicia-escerveza-3.jpg?v=1648893181"
  },
  {
    id: 33,
    nombre: "Alhambra Reserva 1925",
    tipo: "Lager",
    origen: "Granada",
    descripcion: "Cerveza rubia con un sabor ligeramente dulce y toques de caramelo.",
    imagen: "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202204/04/00118602800916____3__600x600.jpg"
  },
  {
    id: 34,
    nombre: "San Miguel Especial",
    tipo: "Lager",
    origen: "Barcelona",
    descripcion: "Cerveza rubia, suave y refrescante con un sabor ligeramente amargo.",
    imagen: "https://www.sanmiguel.com/es/wp-content/uploads/sites/2/2021/01/san-miguel-gluten-free-4.png"
  },
  {
    id: 35,
    nombre: "Damm Estrella",
    tipo: "Lager",
    origen: "Barcelona",
    descripcion: "Cerveza rubia, suave y refrescante con un sabor ligeramente amargo.",
    imagen: "https://static.damm.com/sites/default/files/config-page/estrella_header_logo/estrella-damm_0.png"
  }
];
const Pedidos = {
  template: `
        <div  class="row">
            <div id="form" class="col-md-6 mb-5">
                <h2 class="mb-5">Ingresa los datos:</h2>
                <form id="formCerveza">
                    <div class="mb-3">
                        <label for="nombreGrupo">Nombre del Grupo:</label>
                        <input type="text" id="nombreGrupo" name="nombreGrupo" class="form-control" required minlength="4" maxlength="10">
                    </div>
                    <div class="mb-3">
                        <label for="mesa">Número de Mesa:</label>
                        <input type="number" id="mesa" name="mesa" class="form-control" required min="1" max="15">
                        <div class="invalid-feedback">El número de mesa debe estar entre 1 y 15.</div>
                    </div>
                    <div class="mb-3">
                        <label for="cerveza">Selecciona una cerveza:</label>
                        <select id="cerveza" name="cerveza">
                            <option value="">Selecciona una opción</option>

                        </select>
                        <div class="invalid-feedback">Selecciona una cerveza.</div>
                    </div>
                    <div class="mb-3">
                        <label for="cantidad">Cantidad de cervezas consumidas:</label>
                        <input type="number" id="cantidad" name="cantidad" class="form-control" required min="1">
                        <div class="invalid-feedback">La cantidad de cervezas debe ser mayor que 0.</div>
                    </div>
                    <button class="btn btn-success" type="button" id="btnAñadir">Añadir Pedido</button>
                </form>
            </div>

            <div id="card" class="col-md-6">
            
                <h2 class="mb-3" id="cardNombre">Nombre:</h2>
                <p class="mb-3" ><strong>Tipo:</strong> <span id="cardTipo"></span></p>
                <p class="mb-3" ><strong>Origen:</strong> <span id="cardOrigen"></span></p>
                <p class="mb-3" ><strong>Precio:</strong> <span id="cardPrecio"></span></p>
                <p class="mb-3" ><strong>Descripción:</strong> <span id="cardDescripcion"></span></p>
                <div style="width: 200px; height: 200px; display: flex; justify-content: center; align-items: center; border: 1px solid black; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);">
                    <img id="cardImagen" src="" alt="Imagen de la cerveza" style="max-width: 90%; max-height: 90%;">
                </div>

            </div>
        </div>
    `,
  script() {
    const cervezaSelect = document.querySelector("#cerveza");
    cervezas.forEach((cerveza) => {
      const option = document.createElement("option");
      option.text = cerveza.nombre;
      option.value = cerveza.id;
      cervezaSelect.appendChild(option);
    });
  }
};
const vistaHome = {
  template: (
    //html
    `

        <div class="container" >
            <h2 class="text-center mb-5">Birras y Tapas</h2>
            <div class="mb-5" id="formularioPedido"></div>
            <div id="tablaPedido"></div>
            <button id="btnEnviar" class="btn btn-primary text-light">ENVIAR</button>
        </div>

    `
  ),
  script: () => {
    document.querySelector("#formularioPedido").innerHTML = Pedidos.template;
    Pedidos.script();
  }
};
document.querySelector("header").innerHTML = header.template;
document.querySelector("main").innerHTML = vistaHome.template;
vistaHome.script();
