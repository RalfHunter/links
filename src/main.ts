import './style.css'

const params = new URLSearchParams(window.location.search)

const app = document.querySelector<HTMLDivElement>("#app")!

const id = params.get("id")

const resultado = await fetch(`http://localhost:3000/usuarios/${id}`)

const style = document.querySelector<HTMLDivElement>('style')!

const dados = await resultado.json()
let links_lista: string = '';

dados.lista_links.forEach(link => {
  links_lista += `
  <div class='botao' style='background-color:${dados.COR_LINK_HOVER[0]}; border-radius:${dados.border_radius};'>
    <a class='link' href="" style='color:${dados.COR_TEXTO_LINK}; text-decoration:none; height:inherit;width:100%;'>
      <img src='${link.icone}'/>  
      ${link.texto}
    </a>
  </div>
  `
})



if (dados.Fundo.length <= 1) {
  if (dados.Fundo[0].includes(".")) {
    app.innerHTML = `
  <div class='fundo'>
  <img class='fundo-imagem' src='${dados.Fundo[0]}'>
      <div class='topo'>
        <p>${dados.Nome}</p>
        <img class='foto-perfil' src='${dados.url_foto}'style='border:2px solid ${dados.COR_LINK_HOVER[1]};'>
      </div>
      <div class='meio'>
        ${links_lista}
      </div>
      <div class='base'>
        <img src='${dados.QR}' />
      </div>
  </div>
`
    style.innerHTML += `
      .fundo-imagem{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.6;
        z-index: -1;
      }
    `
  } else {
    app.innerHTML = `
  <div class='fundo'>
    <div class='topo'>
    <p>${dados.Nome}</p>
      <img class='foto-perfil' src='${dados.url_foto}'style='border:2px solid ${dados.COR_LINK_HOVER[1]};'>
    </div>
    <div class='meio'>
    ${links_lista}
    </div>
    <div class='base'>
      <img src='${dados.QR}' />
    </div>
  </div>
`
    style.innerHTML = `
      .fundo {
        display: flex;
        flex-direction: column;
        width: 393px;
        height: 852px;
        /* background-color: red; */
      }
    `
  }

}

// }
style.innerHTML += `
.link:hover{
background-color: ${dados.COR_LINK_HOVER[1]};
}
`
console.log(dados)
