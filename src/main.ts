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
  <div class='botao' style='background-color:${dados.COR_LINK_HOVER[0]}; border-radius:${dados.border_radius}; border: 1px solid ${dados.COR_LINK_HOVER[2] || "none"}'>
    <a class='link' href="" style='text-decoration:none; height:inherit;width:100%;'>
      <img class='icone-cor'src='${link.icone}'/>  
      ${link.texto}
    </a>
  </div>
  `
})

style.innerHTML += `
  .link{
    color:${dados.COR_TEXTO_LINK}
  }
  .icone-cor {
    filter:${dados.COR_TEXTO_LINK === "#010101" ? 'invert(100%)':'invert(00%)'};
  }

`

if (dados.Fundo.length <= 1) {
  if (dados.Fundo[0].includes(".")) {
    app.innerHTML = `
  <div class='fundo'>
  <img class='fundo-imagem' src='${dados.Fundo[0]}'>
      <div class='topo'>
        <p style='color:${dados.Nome[1]};'>${dados.Nome[0]}</p>
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
    console.log("CAIU AQUI")
    app.innerHTML = `
  <div class='fundo'>
    <div class='topo'>
    <p style='color:${dados.Nome[1]};'>${dados.Nome[0]}</p>
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
    .fundo{
      background-color:${dados.Fundo[0]}
    }
    `
  }

}
else {
   app.innerHTML = `
  <div class='fundo'>
      <div class='topo'>
        <p style='color:${dados.Nome[1]};'>${dados.Nome[0]}</p>
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
      .fundo{
       background:linear-gradient(to bottom, ${dados.Fundo[0]}, ${dados.Fundo[1]});
       border: 1px solid ${dados.COR_TEXTO_LINK[2] ? dados.COR_TEXTO_LINK[2] : "none"} ;
      }
    `
}

// }
style.innerHTML += `
.link:hover{
background-color: ${dados.COR_LINK_HOVER[1]};
}
`
if(dados.inverte == true){
  style.innerHTML += `
.link:hover{
  color:#F1F1F1;
}
.link:hover img{
  filter:invert(0%);
}
  
`
}
console.log(dados)
