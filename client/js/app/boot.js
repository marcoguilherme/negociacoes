'use strict';

System.register(['./controllers/NegociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = new currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('.importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
      document.querySelector('.apagar').onclick = negociacaoController.esvazia.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map