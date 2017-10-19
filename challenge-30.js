(function(DOM, doc) {
  'use strict';
  var $nomeEmpresa = new DOM('[data-js="nome"]');
  var $telefoneEmpresa = new DOM('[data-js="telefone"]');
  var $formRegistro = new DOM('[data-js="registra-carro"]');
  var $tabela = new DOM('[data-js="tabela"]');
  var $tbody = new DOM('[data-js="tbody"]');
  var $remove = new DOM('[data-js="remove"]');

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
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td'));
          $tbody.get()[0].lastElementChild.childNodes[0].appendChild(doc.createElement('img')).src = $formRegistro.get()[0][0].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][1].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][2].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][3].value;
          $tbody.get()[0].lastElementChild.appendChild(doc.createElement('td')).textContent = $formRegistro.get()[0][4].value;
          $tbody.get()[0].lastElementChild.innerHTML += '<td><button type="submit" data-js="remove" id="btn">Remover</button></td>';


          $remove = new DOM('[data-js="remove"]');
          app().removeRegisterCars($formRegistro.get()[0][3].value);
          app().limpaInput();

        }, false);
      },

      limpaInput: function limpaInput(){
        $formRegistro.get()[0][0].value = '';
        $formRegistro.get()[0][1].value = '';
        $formRegistro.get()[0][2].value = '';
        $formRegistro.get()[0][3].value = '';
        $formRegistro.get()[0][4].value = '';
      },

      removeRegisterCars: function removeRegisterCars(placa){
        $remove.on('click', function(event){
          event.preventDefault();
          for(var contador = 0; contador < $tbody.get()[0].children.length; contador++){
           if($tbody.get()[0].children[contador].childNodes[3].textContent === placa){
            $tbody.get()[0].removeChild($tbody.get()[0].children[contador]);
            event.stopImmediatePropagation();
           }
          }
        });
      }

    };
  }

  app().inicio();

})(window.DOM, document);



console.log('https://github.com/michaelsnogueira/MSN-Carros');
