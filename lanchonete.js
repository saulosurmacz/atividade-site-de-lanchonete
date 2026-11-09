
var nomesProdutos = [], precosProdutos = [], totaisVendas =[]

function cadastrarProduto(){
    var nome, preco 

    nome = prompt("digite o nome do produto a cadastrar: ")
    if(nome==null){
        return;
    }

    while (nome.trim()==""){
        nome = prompt("digite o nome do produto a cadastrar: ")
        if(nome==null){
            return;
        }
    }

    preco = parseFloat(prompt("Digite o preço do produto a cadastrar"))
    while(isNaN(preco) || preco<=0){
        preco = parseFloat(prompt("Digite o preço do produto a cadastrar"))
    }

    var ja_existe = 0 
    for(var i = 0; i<nomesProdutos.length; i++){
        if(nomesProdutos[i]==nome){
            alert("Não é possível cadastrar, produto já existe");
            ja_existe = 1
            break
        }
    }
    if(ja_existe ==0){        
        nomesProdutos.push(nome)
        precosProdutos.push(preco)
    }

}


function listarProdutos(){
    if(nomesProdutos.length==0){
        alert("Não existem produtos cadastrados");
        return;
    }

    var mensagem = "produtos: "
    for(var i =0; i<nomesProdutos.length; i++){
        mensagem+= "\n" + (i+1) + " - Produto: " + nomesProdutos[i] + " - Valor: R$ " + precosProdutos[i].toFixed(2);
    }
    alert(mensagem)
}


function calcularTotalVenda(preco, quantidade){
    return quantidade * preco
}

function calcularDesconto(total){
    if(total>50){
        return total*0.1
    }
    return 0
}

function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto, total){
    alert("Nome: "+ nome+ "\nPreco: R$" + preco.toFixed(2) + "\nQuantidade: " + quantidade + "\nSubtotal: R$" + subtotal.toFixed(2) + "\nDesconto: R$" + desconto.toFixed(2) + "\nTotal: R$" + total.toFixed(2))
}

function obterTotalVendasDia(){
    var soma = 0
    for(var i = 0; i< totaisVendas.length; i++){
       soma+=parseFloat(totaisVendas[i]) 
    }
    return soma;
}

function exibirTotalVendasDia(){
    if(totaisVendas.length==0){
        alert("Não existem vendas registradas");
        return;
    }
    alert("Quantidade de vendas: " + totaisVendas.length + "\nTotal de vendas: R$" + obterTotalVendasDia().toFixed(2))
}

function realizarVenda(){

    if(nomesProdutos.length==0){
        alert("Não existem produtos cadastrados");
        return;
    }

    var produto = 0, quantidade=0, confirmacao=0
    var mensagem = "produtos a venda: "
    for(var i =0; i<nomesProdutos.length; i++){
        mensagem+= "\n" + (i+1) + " - Produto: " + nomesProdutos[i] + " - Valor: R$ " + precosProdutos[i].toFixed(2);
    }

    while(isNaN(produto) || produto <1 || produto >nomesProdutos.length){
        produto = parseInt(prompt(mensagem + "\nDigite a opção: "))
        if(isNaN(produto) || produto < 1 || produto > nomesProdutos.length){
            alert("Produto inválido")
        }
    }

    while(isNaN(quantidade) || quantidade<1){
        quantidade = parseInt(prompt("Digite a quantidade desejada"));
    }

    var subtotal_venda = calcularTotalVenda(precosProdutos[produto-1], quantidade)
    var desconto = calcularDesconto(subtotal_venda)
    var total = subtotal_venda-desconto
    exibirResumoVenda(nomesProdutos[produto-1], precosProdutos[produto-1], quantidade, subtotal_venda, desconto, total);

    confirmacao = confirm("Confirmar compra?")
    if(confirmacao){
        totaisVendas.push(total)
        alert("Venda concluida!")
    }

}


function exibirMenu(){
    var opcao
    do{
        opcao = parseInt(prompt("1 - Cadastrar Produto\n2 - Listar Produtos Cadastrados\n3 - Realizar Venda\n4 - Consultar total de vendas do dia\n5 - Encerrar o sistema\nDigite a opção desejada: "))
        switch(opcao){
            case 1:{
                cadastrarProduto()
                break
            }
            case 2:{
                listarProdutos()
                break
            }
            case 3:{
                realizarVenda()
                break
            }
            case 4:{
                exibirTotalVendasDia()
                break
            }
            case 5:{
                alert("Programa finalizado!")
                break
            }
            default:{
                alert("Opção inválida!")
            }
        }
    }while(opcao!=5)
}

exibirMenu()
