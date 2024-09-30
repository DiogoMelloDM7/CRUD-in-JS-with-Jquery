$(document).ready(function() {

    let editIndex = null;
    let registros = [];

    function exibeTabela(){
        let tabela = $('#myTable tbody');
        tabela.empty();

        registros.forEach(function(registro, index){
            tabela.append(
                `<tr>
                    <td> ${registro.nome}</td>
                    <td> ${registro.codigo}</td>
                    <td> ${registro.endereco}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
                    </td>
                </tr>
                `
            );
        });
    }

    function resetaForm(){
        $("#myForm")[0].reset();
        $("#btnSubmit").text('Adicionar');
        editIndex = null;
    }

    $("#myForm").submit(function(event){
        event.preventDefault();

        let nome = $("#idNome").val();
        let codigo = $("#idCodigo").val();
        let endereco = $('#idEndereco').val();

        if (editIndex === null){
            registros.push({nome, codigo, endereco})
        }
        else{
            registros[editIndex] = {nome, codigo, endereco}
            editIndex = null;
        }

        resetaForm();
        exibeTabela();
    });

    $(document).on('click', '.edit-btn', function(){
        editIndex = $(this).data('index');
        let registro = registros[editIndex];

        $("#idNome").val(registro.nome);
        $('#idCodigo').val(registro.codigo);
        $("#idEndereco").val(registro.endereco);

        $("#btnSubmit").text('Atualizar')
    });

    $(document).on("click", ".delete-btn", function(){

        let deleteIndex = $(this).data('index');
        registros.splice(deleteIndex, 1);
        exibeTabela();
    })


});