$(document).ready(function() {

    // Variáveis globais minimizadas
    let valorTotalVenda = 0;
    let itensVenda = [];
    let clienteDaVenda = null;
    let RodapeFinalDaTabela = true;

    // Função utilitária para LocalStorage
    function getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Carregar listas de LocalStorage
    let lista_de_vendas = getLocalStorage('lista_de_vendas');
    let lista_de_produtos = getLocalStorage('produtos');
    let lista_de_clientes = getLocalStorage('registros');
    console.log(lista_de_vendas)

    function exibeModalDeProdutos() {
        let tabelaProdutos = $("#tabelaProdutosModal tbody");
        tabelaProdutos.empty();

        lista_de_produtos.forEach(function(produto, index) {
            tabelaProdutos.append(`
                <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.codigo}</td>
                    <td>${produto.valor}</td>
                    <td>
                        <form class="form-add-produto">
                            <input type='number' class="qtde-produto" id="quantidadeDoProduto${index}" style="max-width:100px;">
                        </form>
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm add-btn-produto" data-index="${index}">Adicionar Produto</button>
                    </td>
                </tr>
            `);
        });
    }

    function exibeModalDeClientes() {
        let tabelaClientes = $("#tabelaClientesModal tbody");
        tabelaClientes.empty();

        lista_de_clientes.forEach(function(cliente, index) {
            tabelaClientes.append(`
                <tr>
                    <td>${cliente.nome}</td>
                    <td>${cliente.codigo}</td>
                    <td>${cliente.endereco}</td>
                    <td>
                        <button class="btn btn-success btn-sm add-btn-cliente" data-index="${index}">Selecionar Cliente</button>
                    </td>
                </tr>
            `);
        });
    }

    // Função para construir tabela de vendas
    function construirTabelaDeVendas() {
        let tabelaVendas = $("#tabelaVendas tfoot");
        tabelaVendas.empty();

        itensVenda.forEach(function(item, index) {
            adicionarItemTabela(item, index);
        });

        if (RodapeFinalDaTabela) {
            construirRodapeTabelaDeVendas();
            RodapeFinalDaTabela = null;
        }
    }
    
    $(document).on("click", '.btn-trocar-cliente', function(){
        $('#btnModalCliente').trigger('click');
    })

    function adicionarItemTabela(item, index) {
        $("#tabelaVendas tfoot").append(`
            <tr>
                <td>${item.nome}</td>
                <td>${item.codigo}</td>
                <td>${item.valor}</td>
                <td>${item.quantidadeDoProduto}</td>
                <td>${item.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn-produto" data-index="${index}">Excluir Item</button>
                </td>
            </tr>
        `);
    }

    function construirCabecalhoTabelaDeVendas() {
        $("#tabelaVendas thead").empty().append(`
            <tr>
                <th>Nome do Cliente</th>
                <th>Código do Cliente</th>
                <th colspan="2">Endereço do Cliente</th>
                <th colspan="2">Ações</th>
            </tr>
            <tr>
                <td>${clienteDaVenda.nome}</td>
                <td>${clienteDaVenda.codigo}</td>
                <td colspan="2">${clienteDaVenda.endereco}</td>
                <td colspan="2">
                    <button class="btn btn-success btn-sm btn-trocar-cliente">Trocar Cliente</button>
                </td>
            </tr>
        `);
        
    }

    function construirRodapeTabelaDeVendas() {
        $("#rodapeTabelaVendas").empty().append(`
            <tr>
                <th>Valor Total</th>
                <th id="campoValorTotalVenda">${valorTotalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
            </tr>
        `);
    }

    // Event listeners para adicionar cliente, produto, e finalizar a venda
    $(document).on('click', '.add-btn-cliente', function() {
        let indexCliente = $(this).data('index');
        clienteDaVenda = lista_de_clientes[indexCliente];
        construirCabecalhoTabelaDeVendas();
    });

    $(document).on('click', '.add-btn-produto', function() {
        let indexProduto = $(this).data('index');
        let quantidadeDoProduto = parseInt($(`#quantidadeDoProduto${indexProduto}`).val());
        
        if (quantidadeDoProduto > 0) {
            let itemVenda = lista_de_produtos[indexProduto];
            if (itemVenda.quantidadeDoProduto){
                itemVenda.quantidadeDoProduto += quantidadeDoProduto;
                itemVenda.valorTotal = itemVenda.valorTotal + (quantidadeDoProduto * parseFloat(itemVenda.valor));
                valorTotalVenda = valorTotalVenda + (quantidadeDoProduto * parseFloat(itemVenda.valor));
                let forms = document.querySelectorAll('.form-add-produto');
                forms.forEach(function (form){
                    form.reset();
                })
                $("#campoValorTotalVenda").text(`${valorTotalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
                construirTabelaDeVendas();
            }else{
                itemVenda.quantidadeDoProduto = quantidadeDoProduto;
                itemVenda.valorTotal = quantidadeDoProduto * parseFloat(itemVenda.valor.replace(",", "."));
                valorTotalVenda += itemVenda.valorTotal
                itensVenda.push(itemVenda);
                let forms = document.querySelectorAll('.form-add-produto');
                forms.forEach(function (form){
                    form.reset();
                })
                $("#campoValorTotalVenda").text(`${valorTotalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
                construirTabelaDeVendas();
            }
            console.log(itemVenda);
        }
    });

    $(document).on('click', '.delete-btn-produto', function(){
        let deleteIndex = $(this).data('index');
        let itemIndex = itensVenda[deleteIndex]
        valorTotalVenda -= itemIndex.valorTotal
        itensVenda.splice(deleteIndex, 1);
        $("#campoValorTotalVenda").text(`${valorTotalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        delete itemIndex.valorTotal
        delete itemIndex.quantidadeDoProduto
        construirTabelaDeVendas();

    })

    $(document).on('click', '#btnFinalizaVenda', function() {
        if (itensVenda.length && clienteDaVenda) {
            let array_vendas = getLocalStorage("lista_de_vendas");
            let arrayLength = array_vendas.length
            venda = { idVenda: arrayLength, cliente: clienteDaVenda, itensVenda, valorTotal: valorTotalVenda };
            lista_de_vendas.push(venda);
            setLocalStorage("lista_de_vendas", lista_de_vendas);

            resetarVenda();
            window.location.reload(true);
        }
    });

    function resetarVenda() {
        itensVenda = [];
        valorTotalVenda = 0;
        clienteDaVenda = null;
        $("#rodapeTabelaVendas, #tabelaVendas thead, #tabelaVendas tfoot").empty();
    }

    // Inicialização
    exibeModalDeProdutos();
    exibeModalDeClientes();
    construirTabelaDeVendas();
});
