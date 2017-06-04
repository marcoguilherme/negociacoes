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

        this._service = new NegociacaoService();

        this._init();
    }

    _init(){
        new NegociacaoService()
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(error => {console.log(error); this._mensagem.texto = error})
    }

    //Adiciona valores do formulario a negociacao
    adiciona(event) {
        
      event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem; 
                this._limpaFormulario();  
            }).catch(erro => this._mensagem.texto = erro);  
    }

    importaNegociacoes() {

       this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    //Define os parametros que serao passadas para a model Negociacao
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
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

        this._service
            .apaga()
            .then(dao => dao.apagaTodos())
                this._mensagem.texto = "Negociacoes foram apagadas com sucesso";
                this._listaNegociacoes.esvazia();
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