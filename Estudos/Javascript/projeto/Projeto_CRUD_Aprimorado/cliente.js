$(document).ready(function(){
    let editIndex = null;
    
    function salvaNoLocalStorage(){
        localStorage.setItem('registros', JSON.stringify(registros));
    }

    function carregarRegistrosDoLocalStorage(){
        const registrosSalvos = JSON.parse(localStorage.getItem('registros'));
        return registrosSalvos ? registrosSalvos : [];
    }   

    let registros = carregarRegistrosDoLocalStorage();
  
    function exibeTabela(){
      let tabela = $("#tabelaRegistros tbody");
      tabela.empty();
  
      registros.forEach(function(registro, index){
        tabela.append(
          `
          <tr>
            <td> ${registro.nome} </td>
            <td> ${registro.codigo} </td>
            <td> ${registro.endereco} </td>
            <td>
             <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
             <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
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
  
      if (editIndex === null){
        registros.push({nome, codigo, endereco});
      }
      else{
        registros[editIndex] = {nome,codigo, endereco};
        editIndex = null;
      }
      
      salvaNoLocalStorage();
      resetaForm();
      exibeTabela();
    });
  
    $(document).on('click', '.edit-btn', function(){
      editIndex = $(this).data('index');
      let registro = registros[editIndex];
  
      $("#idNome").val(registro.nome);
      $('#idCodigo').val(registro.codigo);
      $('#idEndereco').val(registro.endereco);
  
      $('#btnSubmit').text("Atualizar");
    });
  
    $(document).on('click', '.delete-btn', function(){
      let deleteIndex = $(this).data('index');
      registros.splice(deleteIndex, 1);
      salvaNoLocalStorage();
      exibeTabela();
    });
  
    exibeTabela();
  });