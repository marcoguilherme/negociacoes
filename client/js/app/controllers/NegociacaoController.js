"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        //cria um alias para o querySelector
        var $ = document.querySelector.bind(document);

        //Pega dados digitados no formulario
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            new NegociacaoService().lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (error) {
                console.log(error);_this._mensagem.texto = error;
            });
        }

        //Adiciona valores do formulario a negociacao

    }, {
        key: "adiciona",
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: "importaNegociacoes",
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }

        //Define os parametros que serao passadas para a model Negociacao

    }, {
        key: "_criaNegociacao",
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
        //Limpa campos do formulario apos adicionar

    }, {
        key: "_limpaFormulario",
        value: function _limpaFormulario() {
            this._inputData.value = "";
            this._inputQuantidade.value = 1;
            this._inputValor.value = "";

            this._inputData.focus();
        }

        //Esvazia lista de negociacoes

    }, {
        key: "esvazia",
        value: function esvazia(event) {
            event.preventDefault();

            this._service.apaga().then(function (dao) {
                return dao.apagaTodos();
            });
            this._mensagem.texto = "Negociacoes foram apagadas com sucesso";
            this._listaNegociacoes.esvazia();
        }
    }, {
        key: "ordena",
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map