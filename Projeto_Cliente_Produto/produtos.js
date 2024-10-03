$(document).ready(function(){

    let editIndex = null;

    function salvaProdutoNoLocalStorage(){
        localStorage.setItem('lista_de_produtos', JSON.stringify(listaDeProdutos));
    }

    function carregaProdutosDoLocalStorage(){
        const produtos = JSON.parse(localStorage.getItem('lista_de_produtos'));
        return produtos ? produtos : [];
    }

    listaDeProdutos = carregaProdutosDoLocalStorage();

    function exibirTabelaProdutos(){
        let tabela = $("#tabelaProdutos tbody");
        tabela.empty();

        listaDeProdutos.forEach(function(produto, index) {
            tabela.append(`
                    <tr>
                        <td>${produto.nome}</td>
                        <td>${produto.codigo}</td>
                        <td>${produto.valor}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
                        </td>
                    </tr>
                `);
        });
    }

    function resetaFormProdutos(){
        $("#formProdutos").get(0).reset();
        $("#btnSubmit").text("Adicionar");
        editIndex = null;
    }

    $("#formProdutos").submit(function (event){
        event.preventDefault();

        let nome = $("#idProdutoNome").val();
        let codigo = $("#idCodigoProduto").val();
        let valor = $("#idValorProduto").val();

        if (editIndex === null){
            listaDeProdutos.push({nome, codigo, valor})
        } else{
            listaDeProdutos[editIndex] = {nome, codigo, valor}
            editIndex = null;
        }

        salvaProdutoNoLocalStorage();
        resetaFormProdutos();
        exibirTabelaProdutos();
    })

    $(document).on('click', '.edit-btn', function(){
        editIndex = $(this).data('index');
        let produto = listaDeProdutos[editIndex];

        $("#idProdutoNome").val(produto.nome);
        $('#idCodigoProduto').val(produto.codigo);
        $('#idValorProduto').val(produto.valor);
        $("#btnSubmit").text("Atualizar");
    })

    $(document).on('click', '.delete-btn', function(){
        let deleteIndex = $(this).data('index');
        listaDeProdutos.splice(deleteIndex, 1);
        salvaProdutoNoLocalStorage();
        exibirTabelaProdutos();
    })

    exibirTabelaProdutos();
});