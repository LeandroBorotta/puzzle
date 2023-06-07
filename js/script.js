let valorCarrinho = 0;
let carrinho = [];
let quantidadeCarrinho = 0;
let lista = document.querySelector('.ul');
let btnComprar = document.querySelectorAll('.btn-comprar');

// Eventos
btnComprar.forEach((btn) => {
  btn.addEventListener('click', comprar);
});

// Funções
function atualizar() {
  if (quantidadeCarrinho <= 0) {
    document.querySelector('.CarrinhoSemItens').style.display = 'block';
    document.querySelector('.CarrinhoComItens').style.display = 'none';
  } else {
    document.querySelector('.CarrinhoSemItens').style.display = 'none';
    document.querySelector('.CarrinhoComItens').style.display = 'block';
  }
}

function criarItem(produto) {
  const novoItem = document.createElement('li');
  novoItem.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-2');
  novoItem.dataset.itemid = produto.id;

  const imagem = document.createElement('img');
  imagem.src = produto.img;
  imagem.style.width = '30%';
  imagem.style.height = '30%';
  novoItem.appendChild(imagem);

  const span = document.createElement('span');
  span.classList.add('h5', 'fw-bolder');
  span.innerHTML = `R$ ${produto.price.toFixed(2)}`;
  novoItem.appendChild(span);

  const div = document.createElement('div');
  div.classList.add('quantidadeItem');

  const divMenos = document.createElement('span');
  divMenos.classList.add('h5', 'fw-bolder', 'menos');
  divMenos.innerHTML = '-';
  divMenos.addEventListener('click', (e) => {
    const quantidadeAtual = parseInt(divQuantidade.innerHTML);
    const itemRemovido = e.target.closest('li');
    quantidadeCarrinho--;
    valorCarrinho -= produto.price;

    if (quantidadeAtual === 1) {
      lista.removeChild(itemRemovido);
    } else {
      divQuantidade.innerHTML = quantidadeAtual - 1;
      span.innerHTML = `R$ ${(produto.price * (quantidadeAtual - 1)).toFixed(2)}`;
    }

    if (quantidadeCarrinho <= 0) {
      document.querySelector('.CarrinhoSemItens').style.display = 'block';
      document.querySelector('.CarrinhoComItens').style.display = 'none';
    }

    document.querySelector('#valorTotal').innerHTML = `R$ ${valorCarrinho.toFixed(2)}`;
  });
  div.appendChild(divMenos);

  const divQuantidade = document.createElement('span');
  divQuantidade.classList.add('h5', 'fw-bolder', 'mx-2', 'quantidade');
  divQuantidade.innerHTML = 1;
  div.appendChild(divQuantidade);

  const divMais = document.createElement('span');
  divMais.classList.add('h5', 'fw-bolder', 'mais');
  divMais.innerHTML = '+';
  divMais.addEventListener('click', () => {
    const quantidadeAtual = parseInt(divQuantidade.innerHTML);
    divQuantidade.innerHTML = quantidadeAtual + 1;
    span.innerHTML = `R$ ${(produto.price * (quantidadeAtual + 1)).toFixed(2)}`;
    quantidadeCarrinho++;
    valorCarrinho += produto.price;

    document.querySelector('#valorTotal').innerHTML = `R$ ${valorCarrinho.toFixed(2)}`;
  });
  div.appendChild(divMais);

  valorCarrinho += produto.price;
  document.querySelector('#valorTotal').innerHTML = `R$ ${valorCarrinho.toFixed(2)}`;

  novoItem.appendChild(div);
  return novoItem;
}

function comprar(e) {
  alert('Adicionado ao carrinho');
  const botao = e.target;
  const card = botao.closest('.card');
  const idProduto = card.dataset.id;
  quantidadeCarrinho++;
  atualizar();

  const produto = produtosJson.find((produto) => produto.id == idProduto);
  carrinho.push(produto);

  const novoItem = criarItem(produto);
  lista.appendChild(novoItem);
}

atualizar();