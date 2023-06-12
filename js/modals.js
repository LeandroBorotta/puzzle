document.querySelector('#pesquisa').addEventListener('click', pesquisa)
document.querySelectorAll('.c').forEach(item =>{
    item.addEventListener('click', c)
})
function c(){
    alert('Em construção')
}

async function  pesquisa(){
    const { value: text } = await Swal.fire({
        title: 'Buscar',
        input: 'text',
        inputPlaceholder: 'Busque em nossa loja',
        inputAttributes: {
          maxlength: 15,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
}