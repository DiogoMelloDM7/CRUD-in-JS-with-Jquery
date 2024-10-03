$(document).ready(function() {
    let editIndex = null;

    // Função para salvar os registros no localStorage
    function salvarNoLocalStorage() {
        localStorage.setItem('registros', JSON.stringify(registros));
    }

    // Função para carregar os registros do localStorage
    function carregarDoLocalStorage() {
        const registrosSalvos = localStorage.getItem('registros');
        return registrosSalvos ? JSON.parse(registrosSalvos) : [];
    }

    // Inicializa os registros com os dados do localStorage
    let registros = carregarDoLocalStorage();

    // Função para exibir a tabela com os dados
    function exibeTabela() {
        let tabela = $('#myTable tbody');
        tabela.empty();

        registros.forEach(function(registro, index) {
            tabela.append(
                `<tr>
                    <td>${registro.nome}</td>
                    <td>${registro.codigo}</td>
                    <td>${registro.endereco}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
                    </td>
                </tr>`
            );
        });
    }

    // Função para resetar o formulário
    function resetaForm() {
        $("#myForm")[0].reset();
        $("#btnSubmit").text('Adicionar');
        editIndex = null;
    }

    // Evento de submissão do formulário
    $("#myForm").submit(function(event) {
        event.preventDefault();

        let nome = $("#idNome").val();
        let codigo = $("#idCodigo").val();
        let endereco = $('#idEndereco').val();

        if (editIndex === null) {
            // Adiciona novo registro
            registros.push({ nome, codigo, endereco });
        } else {
            // Atualiza registro existente
            registros[editIndex] = { nome, codigo, endereco };
            editIndex = null;
        }

        // Salva os registros no localStorage e atualiza a tabela
        salvarNoLocalStorage();
        resetaForm();
        exibeTabela();
    });

    // Evento para edição de registro
    $(document).on('click', '.edit-btn', function() {
        editIndex = $(this).data('index');
        let registro = registros[editIndex];

        $("#idNome").val(registro.nome);
        $('#idCodigo').val(registro.codigo);
        $("#idEndereco").val(registro.endereco);

        $("#btnSubmit").text('Atualizar');
    });

    // Evento para exclusão de registro
    $(document).on("click", ".delete-btn", function() {
        let deleteIndex = $(this).data('index');
        registros.splice(deleteIndex, 1);

        // Salva os registros no localStorage e atualiza a tabela
        salvarNoLocalStorage();
        exibeTabela();
    });

    // Exibe a tabela ao carregar a página
    exibeTabela();
});
