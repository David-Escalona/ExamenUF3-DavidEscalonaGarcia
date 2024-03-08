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
    <h1 class="text-center mb-5 ">----- Vista usuario -----</h1>
    <div class="row">
        
        <div class="col-6">
            <h3>Grupo</h3>
            <label for="nombreGrupo" class="label-control">Nombre del grupo:</label>
            <input id="nombreGrupo" type="text" class="form-control mt-2" placeholder="Borrachos de DAW2" minlength="4" maxlength="10">
            <label for="numeroMesa" class="label-control">Mesa numero</label>
            <input id="numeroMesa" type="number" class="form-control mt-2" placeholder ="1" minlength="1" maxlength="15">
            
            <h3 class="mt-5">Haz tu pedido</h3>
            <div class="d-flex gap-3 ">
            <select id="cerveza" name="cerveza">

            <option value="">Selecciona una opción</option>
            ${cervezas.map((cerveza) => `
                <option value="${cerveza.id}">${cerveza.nombre}</option>
            `).join("")}
            </select>
            
                <input id="cantidad" type="number" value="0" class="form-control">
            </div>
            <button id="btnAñadir" class="btn btn-success mt-4 w-100">¡Enviar pedido!</button>
        </div>
        <div class="col-6 border ">
            <div class="p-3 d-flex">
                <div class="w-50">
                    <img id="imagen" src="" alt="" class="w-100" style="max-width: 90%; max-height: 90%;">
                </div>
                <div>
                    <h4 id="nombre" class="">Estrella Galicia</h4>
                    <p id="descripcion">Cerveza suave y equilibrada con un sabor ligeramente amargo y aroma a malta.</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div id="tablaPedidos" class="container mt-5 mb-5 p-5 border shadow-lg ">
      <div class="row">
        <h1 class="text-center mb-5 ">----- Vista camareros -----</h1>
      <h3>Pedidos</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Grupo</th>
            <th>Mesa</th>
            <th>Cerveza</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>        
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Borrachos de DAW2</td>
            <td>1</td>
            <td>Estrella Galicia</td>
            <td>3</td>
            <td>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-warning w-100 btn-sm">Pedido pendiente...</button>
                <button class="btn btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button>
              </div>
              
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cabezones contentos</td>
            <td>1</td>
            <td>Estrella DAM</td>
            <td>2</td>
            <td>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-success w-100 btn-sm">¡Pedido servido!</button>
                <button class="btn btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button>
              </div>       
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
    `,
  script: () => {
    document.querySelector("#cerveza");
    cervezas.forEach((cerveza) => {
      const option = document.createElement("option");
      option.text = cerveza.nombre;
      option.value = cerveza.id;
    });
  }
};
const vistaHome = {
  template: (
    //html
    `

        <div class="container" >
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
