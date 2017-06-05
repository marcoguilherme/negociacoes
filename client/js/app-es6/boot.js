import { currentInstance } from './controllers/NegociacaoController';

import {} from './polyfill/fetch';

let negociacaoController = new currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('.importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
document.querySelector('.apagar').onclick = negociacaoController.esvazia.bind(negociacaoController);