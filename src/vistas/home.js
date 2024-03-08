import { Pedidos } from '../componentes/formPedidos.js';

export const vistaHome =  {
    template:  //html
    `

        <div class="container" >
            <h2 class="text-center mb-5">Birras y Tapas</h2>
            <div class="mb-5" id="formularioPedido"></div>
            <div id="tablaPedido"></div>
            <button id="btnEnviar" class="btn btn-primary text-light">ENVIAR</button>
        </div>

    `,
    script : ()=>{
        
        document.querySelector('#formularioPedido').innerHTML= Pedidos.template
        Pedidos.script()
    }
}