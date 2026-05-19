document.addEventListener("DOMContentLoaded",()=>{

const usuarioId=
localStorage.getItem("usuarioId");

if(!usuarioId){

    redirecionar();
    return;
}

const menu=
document.getElementById("menu");

const menuBtn=
document.getElementById("menuBtn");

const fecharMenu=
document.getElementById("fecharMenu");


menuBtn.addEventListener("click",()=>{

    menu.classList.add("ativo");

    menuBtn.style.display="none";

});


fecharMenu.addEventListener("click",()=>{

    menu.classList.remove("ativo");

    menuBtn.style.display="block";

});


document
.querySelectorAll(
"#btnSair,#btnSair2"
)

.forEach(botao=>{

    botao.addEventListener(
        "click",
        sair
    );

});


async function getInfo(){

try{

    const resposta=
    await fetch(
`http://localhost:8000/Usuario/${usuarioId}`
    );


    if(!resposta.ok){

        throw new Error(
            "Erro servidor"
        );
    }


    const dados=
    await resposta.json();


    if(!dados.usuario){

        Swal.fire({

            icon:"error",

            title:
            "Usuário não encontrado"

        });

        return;
    }

    preencherCampos(
        dados.usuario
    );

}
catch(error){

    console.log(error);

    Swal.fire({

        icon:"error",

        title:"Erro",

        text:
        "Não foi possível carregar dados"

    });

}

}


function preencherCampos(usuario){

document
.getElementById("nome")
.value=
usuario.nome || "";

document
.getElementById("email")
.value=
usuario.email || "";

document
.getElementById("numero_contato")
.value=
usuario.numero_contato || "";

document
.getElementById("ra")
.value=
usuario.registro_academico || "";

document
.getElementById("curso")
.value=
usuario.nome_curso || "";

}


function sair(){

localStorage.clear();

redirecionar();

}


function redirecionar(){

window.location.href=
"../index.html";

}


getInfo();

});