$(document).ready(function () { //Certo
    let editMode = false;
    let currentItem;

    // Função de submit do formulário
    $('#myForm').submit(function(event){
        event.preventDefault();

        const name = $('#idName').val();
        const code = $('#idCode').val();
        const address = $('#idAddress').val();

        // Verifica se os três campos estão preenchidos
        if(name !== '' && code !== '' && address !== '') {
            if (editMode) {
                // Atualiza o conteúdo de texto do item no modo de edição, sem afetar os botões
                currentItem.contents().first().replaceWith(`Nome: ${name} ---- Código: ${code} ----- Endereço: ${address} `);

                $('#btnSubmit').text("Adicionar");  // Volta o texto do botão para "Adicionar"
                editMode = false;  // Sai do modo de edição
                currentItem = null;  // Limpa o item atual
            } else {
                // Cria um novo item no modo de adição
                const li = $('<li></li>').text(`Nome: ${name} ---- Código: ${code} ----- Endereço: ${address} `);
                const btnDelete = $('<button></button>').text('Excluir').addClass('btn-danger');
                const btnEdit = $('<button></button>').text('Editar').addClass('btn-primary');

                li.append(btnDelete, btnEdit);  // Adiciona os botões ao item da lista
                $('#myList').append(li);  // Adiciona o item à lista
            }

            // Limpa os campos de input
            $('#idName').val('');
            $('#idCode').val('');
            $('#idAddress').val('');
        }
    });

    // Função para deletar item
    $('#myList').on('click', '.btn-danger', function(){
        $(this).parent().remove();
    });

    // Função para editar item
    $('#myList').on('click', '.btn-primary', function(){
        const li = $(this).parent();
        const currentText = li.contents().first().text().trim();  // Pega apenas o texto, ignorando os botões

        // Usa regex para extrair os valores de nome, código e endereço
        const nameMatch = currentText.match(/Nome: (.+?) ----/);
        const codeMatch = currentText.match(/Código: (.+?) -----/);
        const addressMatch = currentText.match(/Endereço: (.+)$/);

        // Preenche os campos do formulário com os valores do item, tratando valores ausentes
        $('#idName').val(nameMatch ? nameMatch[1].trim() : '');
        $('#idCode').val(codeMatch ? codeMatch[1].trim() : '');
        $('#idAddress').val(addressMatch ? addressMatch[1].trim() : '');

        $('#btnSubmit').text('Atualizar');  // Muda o texto do botão para "Atualizar"
        
        editMode = true;  // Ativa o modo de edição
        currentItem = li;  // Armazena o item atual que está sendo editado
    });
});
