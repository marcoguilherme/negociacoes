export class DateHelper {

    constructor(){

        throw new Error('DateHelper nao pode ser instanciada') //Envia um erro caso seja feita instancia da classe
    }
    static dataParaTexto(data){

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }

    static textoParaData(texto){
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) 
            throw new Error('Deve estar no formato dd/mm/aaaa');
        return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
    }
}