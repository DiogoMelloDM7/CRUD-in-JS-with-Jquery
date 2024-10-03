$(document).ready(function(){

    let itemVenda = null;
    let itensVenda = [];
    let venda = null;
    let clienteDaVenda = null;
    let rodapeTabelaVendas = null;
    let valorTotalVenda = 0;
    let RodapeFinalDaTabela = true;

    function carregaListaDeVendaDoLocalStorage(){
        const venda = JSON.parse(localStorage.getItem('lista_de_vendas'));
        return venda ? venda : [];
    }

    function salvaListaDeVendasNoLocalStorage(){
        localStorage.setItem("lista_de_vendas", JSON.stringify(lista_de_vendas));
    }

    function exibeProdutosDoLocalStorage(){
        const listaDeProdutos = JSON.parse(localStorage.getItem('lista_de_produtos'));
        return listaDeProdutos ? listaDeProdutos : [];
        
    }

    function exibeClientesDoLocalStorage(){
        const listaDeClientes = JSON.parse(localStorage.getItem('registros'));
        return listaDeClientes ? listaDeClientes : [];
    }

    let lista_de_vendas = carregaListaDeVendaDoLocalStorage();
    console.log(lista_de_vendas);
    let lista_de_produtos = exibeProdutosDoLocalStorage();
    console.log(lista_de_produtos);
    let lista_de_clientes = exibeClientesDoLocalStorage();
    console.log(lista_de_clientes);

    function exibeModalDeProdutos(){
        let tabelaProdutos = $("#tabelaProdutosModal tbody");
        tabelaProdutos.empty();

        lista_de_produtos.forEach(function(produto, index){
            tabelaProdutos.append(
                `
                    <tr>
                        <td>${produto.nome}</td>
                        <td>${produto.codigo}</td>
                        <td>${produto.valor}</td>
                        <td>
                        <form class="form-add-produto">
                            <input type='number' style="max-width:100px;" class="qtde-produto" id="quantidadeDoProduto${index}">
                        </form>
                         </td>
                        <td>
                            <button class="btn btn-success btn-sm add-btn-produto" data-index="${index}">Adicionar Produto</button>
                        </td>
                    </tr>
                `
            );
        });
    }

    function exibeModalDeClientes(){
        let tabelaClientes = $("#tabelaClientesModal tbody");
        tabelaClientes.empty();

        lista_de_clientes.forEach(function(cliente, index){
            tabelaClientes.append(
                `
                    <tr>
                        <td>${cliente.nome}</td>
                        <td>${cliente.codigo}</td>
                        <td>${cliente.endereco}</td>
                        <td>
                            <button class="btn btn-success btn-sm add-btn-cliente" data-index="${index}">Selecionar Cliente</button>
                        </td>
                    </tr>
                `
            );
        });
    }

    function construirTabelaDeVendas(){
        let tabelaVendas = $("#tabelaVendas tfoot");
        tabelaVendas.empty();
        itensVenda.forEach(function(item, index){
            tabelaVendas.append(
                `
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
                `
            );

        });
        if (rodapeTabelaVendas){
            construirCabecalhoTabelaDeVendas();
        }

        if (RodapeFinalDaTabela){
            insereRodapeFinalDaTabela();
            RodapeFinalDaTabela = null;
        }
    }

    $(document).on("click", '.btn-trocar-cliente', function(){
        $('#btnModalCliente').trigger('click');
    })

    function construirCabecalhoTabelaDeVendas(){
        let tabelaVendas = $("#tabelaVendas thead");
        tabelaVendas.empty();
        tabelaVendas.append(`
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
                    `
        );
        rodapeTabelaVendas = null;  
    }

    $(document).on('click', '.add-btn-produto', function(){
        item = $(this).data('index');
        let quantidadeDoProduto = Math.round($(`#quantidadeDoProduto${item}`).val());
        if (quantidadeDoProduto > 0){

            itemVenda = lista_de_produtos[item];
            if (itemVenda.quantidadeDoProduto){
                itemVenda.quantidadeDoProduto += quantidadeDoProduto;
                itemVenda.valor.replace(",", ".");
                let valorTotalCorrigido = quantidadeDoProduto * parseFloat(itemVenda.valor);
                itemVenda.valorTotal += valorTotalCorrigido
                valorTotalVenda += valorTotalCorrigido
                let forms = document.querySelectorAll('.form-add-produto')
                forms.forEach(function (form){
                    form.reset();
                })
                $("#campoValorTotalVenda").text(`R$ ${valorTotalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
                construirTabelaDeVendas();
                console.log(itemVenda);
            }else{
                itemVenda.quantidadeDoProduto = quantidadeDoProduto
                itemVenda.valor.replace(",", ".");
                itemVenda.valorTotal = quantidadeDoProduto * parseFloat(itemVenda.valor);
                valorTotalVenda += itemVenda.valorTotal
                itensVenda.push(itemVenda);
                let forms = document.querySelectorAll('.form-add-produto')
                forms.forEach(function (form){
                    form.reset();
                })
                $("#campoValorTotalVenda").text(`${valorTotalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
                construirTabelaDeVendas();

                }
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
        console.log(itensVenda)
    });

    $(document).on('click', '.add-btn-cliente', function(){
        let indexCliente = $(this).data('index');
        clienteDaVenda = lista_de_clientes[indexCliente];
        rodapeTabelaVendas = true;
        construirTabelaDeVendas();
    })

    function insereRodapeFinalDaTabela(){
        
        $("#rodapeTabelaVendas").append(
            `<tr>
                <th>Valor Total</th>
                <th id="campoValorTotalVenda">R$ ${valorTotalVenda}</th>
            </tr>`
        )
    }

    $(document).on('click', '#btnFinalizaVenda', function(){
        if(itemVenda !== null && clienteDaVenda !== null){
            console.log(itensVenda.quantidadeDoProduto, itensVenda.valorTotal);
            itensVenda.push(clienteDaVenda, valorTotalVenda)
            itensVenda.cliente = clienteDaVenda
            itensVenda.valorTotal = valorTotalVenda
            console.log(itensVenda);
            venda = itensVenda;
            lista_de_vendas.push(venda);
            salvaListaDeVendasNoLocalStorage();
            itensVenda = [];
            itemVenda = null;
            RodapeFinalDaTabela = true;
            valorTotalVenda = 0;
            clienteDaVenda = null;    
            limpaAtributosExtraDeProduto();
    
            $("#rodapeTabelaVendas").empty();
            $("#tabelaVendas tfoot").empty();
            $("#tabelaVendas thead").empty();

            window.location.reload(true);
        }
    })

    function limpaAtributosExtraDeProduto (){
        lista_de_produtos.forEach(function(produto){
            delete produto.quantidadeDoProduto;
            delete produto.valorTotal;
            console.log(produto);
        })
    }

    exibeModalDeProdutos();
    exibeModalDeClientes();
    construirTabelaDeVendas();
})