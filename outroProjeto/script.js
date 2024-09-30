$(document).ready(function() { // Isso é uma função jQuery que garante que todo o código dentro dela só será executado depois que o documento HTML estiver completamente carregado. Isso evita que o JavaScript tente acessar elementos da página que ainda não foram carregados.

    let registros = []; //  É um array que armazena os objetos que contêm os dados inseridos no formulário (código, nome, endereço).
    let editIndex = null; // Armazena o índice do registro que está sendo editado. Se for null, significa que estamos criando um novo registro, e se tiver um valor, estamos editando um registro existente.

    // Função para renderizar a tabela de registros
    function renderTabela() {
        let tabela = $('#tabelaRegistros tbody'); //Seleciona o corpo (<tbody>) da tabela com o ID #tabelaRegistros usando jQuery.
        tabela.empty(); // Limpa a tabela antes de renderizar novamente

        registros.forEach(function(registro, index) {
            tabela.append(`
                <tr>
                    <td>${registro.codigo}</td>
                    <td>${registro.nome}</td>
                    <td>${registro.endereco}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
                    </td>
                </tr>
            `);
        });
    }

    // Função para redefinir o formulário e o botão
    function resetarFormulario() {
        $('#registroForm')[0].reset(); // Limpa o formulário
        $('#submitButton').text('Adicionar Registro'); // Restaura o texto do botão para "Adicionar"
        editIndex = null; // Limpa o índice de edição
    }

    // Adicionar novo registro ou editar um existente
    $('#registroForm').submit(function(event) {
        event.preventDefault();

        let codigo = $('#idCodigo').val();
        let nome = $('#idNome').val();
        let endereco = $('#idEndereco').val();

        if (editIndex === null) {
            // Adicionar novo registro
            registros.push({ codigo, nome, endereco });
        } else {
            // Editar registro existente
            registros[editIndex] = { codigo, nome, endereco };
            editIndex = null;
        }

        resetarFormulario(); // Limpa o formulário e restaura o botão
        renderTabela(); // Atualizar tabela
    });

    // Editar registro
    $(document).on('click', '.edit-btn', function() {
        editIndex = $(this).data('index');
        let registro = registros[editIndex];

        // Preenche o formulário com os valores do registro a ser editado
        $('#idCodigo').val(registro.codigo);
        $('#idNome').val(registro.nome);
        $('#idEndereco').val(registro.endereco);

        // Altera o texto do botão para "Atualizar"
        $('#submitButton').text('Atualizar Registro');
    });

    // Excluir registro
    $(document).on('click', '.delete-btn', function() {
        let deleteIndex = $(this).data('index');
        registros.splice(deleteIndex, 1); // Remove o registro pelo índice
        renderTabela(); // Atualizar tabela
    });
});
