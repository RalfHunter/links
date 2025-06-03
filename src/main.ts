import './style.css'

const params = new URLSearchParams(window.location.search)

const app = document.querySelector<HTMLDivElement>("#app")!

const id =  params.get("id")

const resultado = await fetch(`http://localhost:3000/usuarios/${id}`)

const dados = await resultado.json()
let links_lista:string = '';

dados.lista_links.forEach(link => {
  links_lista +=`
  <div class='botao'>
    <img src='${link.icone}'/>
    <a href="">${link.texto}</a>
  </div>
  `
})

app.innerHTML = `
  <div class='fundo'>
    <div class='topo'>
    <p>${dados.Nome}</p>
      <img class='foto-perfil' src='${dados.url_foto}'>
    </div>
    <div class='meio'>
    ${links_lista}
    </div>
  <div>
`


console.log(dados)
