class NegociacaoController {

    constructor(){
        
        //cria um alias para o querySelector
        let $ = document.querySelector.bind(document);

        //Pega dados digitados no formulario
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
    }

    //Adiciona valores do formulario a negociacao
    adiciona(event) {
        
        event.preventDefault(); //Cancela refresh ao clicar em incluir

        //Adicionar negociacao em uma lista
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        console.log(this._listaNegociacoes._negociacoes);
        
    }

    //Define os parametros que serao passadas para a model Negociacao
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }
    //Limpa campos do formulario apos adicionar
    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = "";

        this._inputData.focus();
    }
}