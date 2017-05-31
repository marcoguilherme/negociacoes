//Documento criado somente para introducao.


//Pega campos do formulario
var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
]

//Exibe log dos campos
console.log(campos);
//Pega tbody do formulario
var tbody = document.querySelector("table tbody");
//Executa comando ao clicar em incluir
document.querySelector(".form").addEventListener('submit', (event) => {
    event.preventDefault(); //Cancela refresh ao clicar em incluir
    var tr  = document.createElement('tr'); //Cria um novo tr
    
    campos.forEach((campo)=>{ //Faz um laco no array campos para pegar os valores
        var td = document.createElement("td"); //Cria uma nova coluna
        td.textContent = campo.value; //Insere o dado retornado na coluna
        tr.appendChild(td); //Adiciona coluna na linha
    });

    var tdVolume = document.createElement('td'); //Cria uma nova coluna para armazenar volumes 
    tdVolume.textContent = campos[1].value * campos[2].value; //Executa calculo do volume e armazena

    tr.appendChild(tdVolume); //Adiciona voluma a linha
    tbody.appendChild(tr); //Adiciona linha ao tbody

    //Limpa campos e define 1 como valor padrao em quantidade
    campos[0].value = "";
    campos[1].value = 1;
    campos[2].value = "";

    campos[0].focus(); //Adiciona auto-foco ao campo data
})