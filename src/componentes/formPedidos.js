import { cervezas } from "../bd";


export const Pedidos =  {
    template:  //html
    `
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

        const cervezaSelect = document.querySelector('#cerveza')

        cervezas.forEach(cerveza => {

            const option = document.createElement('option')
            option.text = cerveza.nombre
            option.value = cerveza.id
            cervezaSelect.appendChild(option)
        })
    }
}