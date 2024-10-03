$(document).ready(function(){
    let editIndex = null;

    // Função para salvar no Local Storage
    function salvaNoLocalStorage(){
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Carregar produtos do Local Storage
    function carregarProdutosDoLocalStorage(){
        const produtosSalvos = JSON.parse(localStorage.getItem('produtos'));
        return produtosSalvos ? produtosSalvos : [];
    }   

    // Inicializar produtos com dados do Local Storage
    let produtos = carregarProdutosDoLocalStorage();

    // Função para exibir produtos na tabela
    function exibeTabela(){
        let tabela = $("#tabelaProdutos tbody");
        tabela.empty();

        produtos.forEach(function(produto, index){
            tabela.append(
                `
                <tr>
                    <td> ${produto.nome} </td>
                    <td> ${produto.codigo} </td>
                    <td> ${produto.valor} </td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
                    </td>
                </tr>
                `
            );
        });
    }

    // Função para resetar o formulário
    function resetaForm(){
        $("#formProdutos")[0].reset();
        $("#btnSubmit").text("Adicionar");
        editIndex = null;
    }

    // Adicionar ou editar produto
    $("#formProdutos").submit(function(event){
        event.preventDefault();

        let nome = $("#idProdutoNome").val();
        let codigo = $("#idCodigoProduto").val();
        let valor = $("#idValorProduto").val();

        if (editIndex === null){
            produtos.push({nome, codigo, valor});
        }
        else{
            produtos[editIndex] = {nome, codigo, valor};
            editIndex = null;
        }

        salvaNoLocalStorage();
        resetaForm();
        exibeTabela();
    });

    // Editar produto
    $(document).on('click', '.edit-btn', function(){
        editIndex = $(this).data('index');
        let produto = produtos[editIndex];

        $("#idProdutoNome").val(produto.nome);
        $('#idCodigoProduto').val(produto.codigo);
        $('#idValorProduto').val(produto.valor);

        $('#btnSubmit').text("Atualizar");
    });

    // Excluir produto
    $(document).on('click', '.delete-btn', function(){
        let deleteIndex = $(this).data('index');
        produtos.splice(deleteIndex, 1);
        salvaNoLocalStorage();
        exibeTabela();
    });

    // Exibir a tabela ao carregar a página
    exibeTabela();
});
