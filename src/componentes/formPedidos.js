import { cervezas } from "../bd";

export const Pedidos =  {
    template: 
    `
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
            ${cervezas.map(cerveza => `
                <option value="${cerveza.id}">${cerveza.nombre}</option>
            `).join('')}
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

    script : ()=>{

        document.querySelector('#cerveza')

        cervezas.forEach(cerveza => {

            const option = document.createElement('option')
            option.text = cerveza.nombre
            option.value = cerveza.id

        })
    }
}