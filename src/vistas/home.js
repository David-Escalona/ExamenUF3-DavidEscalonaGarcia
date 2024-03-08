import { Pedidos } from '../componentes/formPedidos.js';

export const vistaHome =  {
    template:  //html
    `

        <div class="container" >
            <div class="mb-5" id="formularioPedido"></div>
            <div id="tablaPedido"></div>
        </div>

    `,
    script : ()=>{
        
        document.querySelector('#formularioPedido').innerHTML= Pedidos.template
        Pedidos.script()
        
    }
}