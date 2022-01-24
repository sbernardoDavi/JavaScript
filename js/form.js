var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obterInfoForm(form);
    console.log(paciente);


    var erros = validarPaciente(paciente);
    if(erros.length > 0){
       exibeMensagensDeErro(erros);

       return;
    }
    
    tabela.appendChild(pacienteTr);

    adicionaPacienteNaTabela(paciente);

    form.reset();
    var ulErro = document.querySelector("#mensagens-erro");
    ulErro.innerHTML = "";
});



function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montarTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}



function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = " ";


    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obterInfoForm(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularImc(form.peso.value, form.peso.value),
    }

    return paciente;
}

function montarTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    
    var nomeTd = montaTd(paciente.nome,"info-nome")
    var pesoTd = montaTd(paciente.peso, "info-peso");
    var alturaTd = montaTd(paciente.altura, "info-altura");
    var gorduraTd = montaTd(paciente.gordura, "info-gordura");
    var imcTd = montaTd(paciente.imc, "info-imc");

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    nomeTd.textContent = paciente.nome;
    pesoTd.textContent = paciente.peso;
    alturaTd.textContent = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent = calcularImc(paciente.peso,paciente.altura);


    return pacienteTr;
  
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;

}

function validarPaciente(paciente){
    var erros = [];

    if(paciente.nome.length ==0){
        erros.push("Nome não pode ser em branco")
    }

    if(paciente.gordura.length == 0){
        erros.push("Gordura nao pode serem branco")
    }

    if(paciente.peso.length == 0){
        erros.push("Peso nao pode ser branco");

    }

    if(paciente.altura.length == 0){
        erros.push("Altura nao pode ser branco");
    }

    if(!validaPeso(paciente.peso)){
         erros.push("Peso é inválido");
    }
    if(!validaAltura(paciente.altura)){
        erros.push("Altura é inválida")
    }
    return erros;
}