class NegociacaoController {

    constructor(){
        
        //cria um alias para o querySelector
        let $ = document.querySelector.bind(document);

        //Pega dados digitados no formulario
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem')

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto')

        this._ordemAtual = '';
    }

    //Adiciona valores do formulario a negociacao
    adiciona(event) {
        
        event.preventDefault(); //Cancela refresh ao clicar em incluir

        try{
            //Adicionar negociacao em uma lista
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._limpaFormulario();
            this._mensagem.texto = "Negociacao criada do sucesso!";
        }catch(error){
            this._mensagem.texto = error;
        }
        
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = "Negociacoes importadas com sucesso";
        })
        .catch(error => this._mensagem.texto = error);
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

    //Esvazia lista de negociacoes
    esvazia(event){
        event.preventDefault();
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociacoes apagadas com sucesso";
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }


}