$(document).ready(function(){

    let vendasSelecionadas = []

    function carregarListaDeVendasDoLocalStorage() {
        const vendas = JSON.parse(localStorage.getItem("lista_de_vendas"));
        return vendas ? vendas : [];
    }

    let lista_de_vendas = carregarListaDeVendasDoLocalStorage();

    console.log(lista_de_vendas)

    $(document).on('click', '#btnSearch', function(){
        let idInicial = $('#idInicialPesquisa').val();
        let idFinal = $('#idFinalPesquisa').val();
        vendasSelecionadas = []
        if(idInicial <= idFinal)
            {
            lista_de_vendas.forEach(function(venda, index){
                if(index >= idInicial && index <= idFinal){
                    venda.codigoDaVenda = index;
                    vendasSelecionadas.push(venda);
                }
            });
            console.log(vendasSelecionadas);
            
            };
        gerarTabelaDeVendas();
    })

        
    

    function gerarTabelaDeVendas(){
        let tabelaVendas = $('#tabelaVendas tbody');
        tabelaVendas.empty();

        vendasSelecionadas.forEach(function(venda, index){
            let quantidadeDeProdutosPorVenda = (venda.length) - 2;
            let nomeCliente = venda[venda.length-2].nome
            tabelaVendas.append(`
                <tr>
                    <td>${venda.codigoDaVenda}</td>
                    <td>${nomeCliente}</td>
                    <td>${quantidadeDeProdutosPorVenda}</td>
                    <td>${venda[venda.length-1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-expandir-venda" data-index="${index}">
                        Expandir Venda
                        </button>
                    </td>
                </tr>
            `);

            $(document).on('click', '.btn-expandir-venda', function(){
                indexExpand = $(this).data('index');
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

                
                
                vendasSelecionadas.forEach(function (vendafechada, index){
                    vendafechada.forEach(function (produto){
                        if(indexExpand === index){
                            
                            tabelaDetalhadaBody.append(`
                                <tr>
                                    <td>${produto.nome}</td>
                                    <td>${produto.codigo}</td>
                                    <td>${produto.valor}</td>
                                    <td>${produto.quantidadeDoProduto}</td>
                                    <td>${produto.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                                `);
                            

                            
                        }
                    })
                    
                })
                
            })
        });


       


        
    }

    gerarTabelaDeVendas();

})