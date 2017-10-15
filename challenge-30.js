(function(DOM, doc) {
  'use strict';
  var $nomeEmpresa = new DOM('[data-js="nome"]');
  var $telefoneEmpresa = new DOM('[data-js="telefone"]');
  var $formRegistro = new DOM('[data-js="registra-carro"]');
  var $tabela = new DOM('[data-js="tabela"]');
  var $tbody = new DOM('[data-js="tbody"]');

  var ajax = new XMLHttpRequest();

  function app(){
    return {
      inicio: function inicio(){
        this.getInformationCompany();
        this.setRegisterCars();
      },

      getInformationCompany: function getInformationCompany(){
        ajax.open('GET', 'company.json');
        ajax.send();
        ajax.addEventListener('readystatechange', this.getDateInformationCompany, false);
      },

      getDateInformationCompany: function getDateInformationCompany(){
        if(app().isRequestOK()){
          var dados = JSON.parse(ajax.responseText);
           $nomeEmpresa.get()[0].textContent = dados.name + ' - ';
           $telefoneEmpresa.get()[0].textContent = dados.phone;
        }
      },

      isRequestOK: function isRequestOK(){
         return ajax.readyState === 4 && ajax.status === 200;
      },

      setRegisterCars: function setRegisterCars(){
        $formRegistro.on('submit', function(event){
          event.preventDefault();
          $tbody.get()[0].appendChild(doc.createElement('tr'));
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td'))
          $tbody.get()[0].lastElementChild.childNodes[0].appendChild(doc.createElement('img')).src = $formRegistro.get()[0][0].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][1].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][2].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][3].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][4].value;

          app().limpaInput();

        }, false);
      },

      limpaInput: function limpaInput(){
        $formRegistro.get()[0][0].value = '';
        $formRegistro.get()[0][1].value = '';
        $formRegistro.get()[0][2].value = '';
        $formRegistro.get()[0][3].value = '';
        $formRegistro.get()[0][4].value = '';
      }

    };
  }

  app().inicio();

})(window.DOM, document);


/*
A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
projeto mesmo.

Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.

Na hora de criar, o GitHub te dá a opção de criar o repositório com um
README. Use essa opção.

Após criar o repositório, clone ele na sua máquina.

Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
desafio da aula anterior para esse novo repositório, nessa branch
`challenge-30`.

Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
O conteúdeo desse arquivo deve ser somente as duas linhas abaixo:

node_modules
npm-debug.log

Faça as melhorias que você achar que são necessárias no seu código, removendo
duplicações, deixando-o o mais legível possível, e então suba essa alteração
para o repositório do seu projeto.

Envie um pull request da branch `challenge-30` para a `master` e cole aqui
nesse arquivo, dentro do `console.log`, o link para o pull request no seu
projeto.
*/

console.log('Link do pull request do seu projeto');
