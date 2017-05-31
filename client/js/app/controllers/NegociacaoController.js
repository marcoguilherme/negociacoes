class NegociacaoController {

    constructor(){
        
        //cria um alias para o querySelector
        let $ = document.querySelector.bind(document);

        //Pega dados digitados no formulario
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
    }

    //Adiciona valores do formulario a negociacao
    adiciona(event) {
        
        event.preventDefault(); //Cancela refresh ao clicar em incluir

        //Define os parametros que serao passadas para a model Negociacao
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
        console.log(negociacao);
        //Adicionar negociacao em uma lista
        
    }
}