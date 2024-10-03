$(document).ready(function(){
    let editIndex = null;
    let indexId = 0;
    //let registros = localStorage;
  
    function exibeTabela(){
      let tabela = $("#tabelaRegistros tbody");
      tabela.empty();

      let localKeys = Object.keys(localStorage);
      let registros = []
      for (let i = 0; i < localKeys.length; i++){
        let registroValue = JSON.parse(localStorage.getItem(localKeys[i]));
        registros.push(registroValue)
      }
      console.log(registros)
  
      registros.forEach(function(registro, index){
        tabela.append(
          `
          <tr>
            <td> ${registro.nome} </td>
            <td> ${registro.codigo} </td>
            <td> ${registro.endereco} </td>
            <td>
             <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar ${index}</button>
             <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir ${index}</button>
            </td>
          </tr>
          `
        )
      });
    }
  
    function resetaForm(){
      $("#formRegistro")[0].reset();
      $("#btnSubmit").text("Adicionar");
      editIndex = null;
    }
  
    $("#formRegistro").submit(function(event){
      event.preventDefault();
  
      let nome = $("#idNome").val();
      let codigo = $("#idCodigo").val();
      let endereco = $("#idEndereco").val();
      let objeto = {nome, codigo, endereco};
  
      if (editIndex === null){
        localStorage.setItem(indexId , JSON.stringify(objeto));
        console.log(indexId);
        indexId++;
        
      }
      else{
        localStorage.setItem(editIndex, JSON.stringify(objeto));
        editIndex = null;
        console.log("acessado");
      }
  
      resetaForm();
      exibeTabela();
    });
  
    $(document).on('click', '.edit-btn', function(){
      editIndex = $(this).data('index');
      let registro = JSON.parse(localStorage.getItem(editIndex));
  
      $("#idNome").val(registro.nome);
      $('#idCodigo').val(registro.codigo);
      $('#idEndereco').val(registro.endereco);
  
      $('#btnSubmit').text("Atualizar");
    });
  
    $(document).on('click', '.delete-btn', function(){
      let deleteIndex = $(this).data('index');
      localStorage.removeItem(deleteIndex);
      exibeTabela();
    });
  
    exibeTabela();
  });