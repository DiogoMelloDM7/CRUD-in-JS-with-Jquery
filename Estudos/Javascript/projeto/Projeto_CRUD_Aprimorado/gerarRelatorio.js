$(document).ready(function () {
    let vendasSelecionadas = [];

    function carregarListaDeVendasDoLocalStorage() {
        const vendas = JSON.parse(localStorage.getItem("lista_de_vendas"));
        return vendas ? vendas : [];
    }

    let lista_de_vendas = carregarListaDeVendasDoLocalStorage();

    console.log(lista_de_vendas);

    $(document).on('click', '#btnSearch', function () {
        let idInicial = parseInt($('#idInicialPesquisa').val());
        let idFinal = parseInt($('#idFinalPesquisa').val());
        vendasSelecionadas = [];

        // Validação dos IDs
        if (isNaN(idInicial) || isNaN(idFinal) || idInicial < 0 || idFinal < 0) {
            alert("Por favor, insira IDs válidos.");
            return;
        }

        if (idInicial <= idFinal) {
            lista_de_vendas.forEach(function (venda, index) {
                if (index >= idInicial && index <= idFinal) {
                    venda.codigoDaVenda = index;
                    vendasSelecionadas.push(venda);
                }
            });
            console.log(vendasSelecionadas);
            gerarTabelaDeVendas();
        } else {
            alert("O ID inicial deve ser menor ou igual ao ID final.");
        }
    });

    function gerarTabelaDeVendas() {
        let tabelaVendas = $('#tabelaVendas tbody');
        tabelaVendas.empty();

        vendasSelecionadas.forEach(function (venda, index) {
            tabelaVendas.append(`
                <tr>
                    <td>${venda.idVenda}</td>
                    <td>${venda.cliente.nome}</td>
                    <td>${venda.itensVenda.length}</td>
                    <td>${venda[venda.length - 1].valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-expandir-venda" data-index="${index}">
                        Expandir Venda
                        </button>
                    </td>
                </tr>
            `);

            $(document).off('click', '.btn-expandir-venda').on('click', '.btn-expandir-venda', function () {
                let indexExpand = $(this).data('index');
                console.log(vendasSelecionadas[indexExpand]);
                let tabelaDetalhadaHead = $('#tabelaVendasDetalhada thead');
                let tabelaDetalhadaBody = $('#tabelaVendasDetalhada tbody');
                tabelaDetalhadaHead.empty();
                tabelaDetalhadaBody.empty();
    
                tabelaDetalhadaHead.append(`
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Código do Produto</th>
                        <th>Valor do Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Total</th>
                    </tr>
                `);
    
                let vendaSelecionada = vendasSelecionadas[indexExpand];
    
                vendaSelecionada.forEach(function (produto) {
                    if (typeof produto === 'object' && produto.nome) {
                        tabelaDetalhadaBody.append(`
                            <tr>
                                <td>${produto.nome}</td>
                                <td>${produto.codigo}</td>
                                <td>${produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>${produto.quantidadeDoProduto}</td>
                                <td>${produto.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>
                        `);
                    }
                });
            });
        });

        // Mova o evento de clique para fora do loop
        
    }

    gerarTabelaDeVendas();
});
