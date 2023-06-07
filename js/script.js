//Variáveis
let valorCarrinho = 0
let carrinho = []
let quantidadeCarrinho = 0;
let lista = document.querySelector('.ul')
console.log(lista)
let btnComprar = document.querySelectorAll('.btn-comprar')
let menos = document.querySelector('.menos')
let mais = document.querySelector('.mais')
//Eventos
btnComprar.forEach((btn)=>{
   btn.addEventListener('click', comprar)
})

//Funções
function atualizar(){
    if(quantidadeCarrinho <= 0){
        document.querySelector('.CarrinhoSemItens').style.display = 'block'
        document.querySelector('.CarrinhoComItens').style.display = 'none'
    } else{
        document.querySelector('.CarrinhoSemItens').style.display = 'none'
        document.querySelector('.CarrinhoComItens').style.display = 'block'
    }
}


function comprar(e){

    alert('adicionado ao carrinho')
    let botao = e.target;
    let card = botao.closest('.card');
    let idProduto = card.dataset.id;
    quantidadeCarrinho++
    atualizar();

    let produto = produtosJson.find((produto) => produto.id == idProduto);
    carrinho.push(produto)

    let novoItem = document.createElement('li');
    novoItem.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-2');
    novoItem.dataset.itemid = produto.id;

    let imagem = document.createElement('img')
    imagem.src =`${produto.img}`
    imagem.style.width = '30%'
    imagem.style.height = '30%'
    novoItem.appendChild(imagem)

    let span = document.createElement('span')
    span.classList.add('h5', 'fw-bolder')
    span.innerHTML = `R$ ${(produto.price).toFixed(2)}`
    novoItem.appendChild(span)
    
    let div = document.createElement('div')
    div.classList.add('quantidadeItem')

    let divMenos = document.createElement('span')
    divMenos.classList.add('h5', 'fw-bolder', 'menos')
    divMenos.innerHTML = '-'
    
    divMenos.addEventListener('click', () => {
        let quantidadeAtual = parseInt(divQuantidade.innerHTML);
        quantidadeAtual--;
        divQuantidade.innerHTML = quantidadeAtual;
        span.innerHTML = `R$ ${(produto.price * quantidadeAtual).toFixed(2)}`;
        
        if(quantidadeAtual < 1){
            lista.removeChild(novoItem)
            document.querySelector('.CarrinhoSemItens').style.display = 'block'
            document.querySelector('.CarrinhoComItens').style.display = 'none'
        }
        
        valorCarrinho = parseFloat((produto.price * quantidadeAtual));
        document.querySelector('#valorTotal').innerHTML = `R$ ${valorCarrinho.toFixed(2)}`;
      });
      div.appendChild(divMenos)

    let divQuantidade = document.createElement('span');
    divQuantidade.classList.add('h5', 'fw-bolder', 'mx-2', 'quantidade');
    divQuantidade.innerHTML = 1;
    div.appendChild(divQuantidade);

    let divMais = document.createElement('span')
    divMais.classList.add('h5', 'fw-bolder', 'mais')
    divMais.innerHTML = '+'

    divMais.addEventListener('click', () => {
        let quantidadeAtual = parseInt(divQuantidade.innerHTML);
        quantidadeAtual++;
        divQuantidade.innerHTML = quantidadeAtual;
        span.innerHTML = `R$ ${(produto.price * quantidadeAtual).toFixed(2)}`;
        
        valorCarrinho = parseFloat((produto.price * quantidadeAtual));
        document.querySelector('#valorTotal').innerHTML = `R$ ${valorCarrinho.toFixed(2)}`;
      });
      div.appendChild(divMais)

      valorCarrinho += parseFloat(produto.price); 
      document.querySelector('#valorTotal').innerHTML = `R$ ${valorCarrinho.toFixed(2)}`;

    novoItem.appendChild(div)
    lista.appendChild(novoItem)

}

atualizar();