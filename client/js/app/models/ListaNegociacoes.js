class ListaNegociacoes {

    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    esvazia(){
        this._negociacoes = [];
    }

    get negociacoes(){
        return [].concat(this._negociacoes); //Evita que o array seja alterado diretamente
    }
}