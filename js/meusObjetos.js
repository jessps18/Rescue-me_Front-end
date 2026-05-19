const usuarioId = localStorage.getItem('usuarioId');

if (!usuarioId) {
    window.location.href = '../index.html';
}

const lista = document.getElementById('listaObjetos');
let objetoSelecionado = null;

async function carregarObjetos() {

    try {

        const resposta = await fetch(
            `http://localhost:8000/Objeto/${usuarioId}`
        );

        const dados = await resposta.json();

        lista.innerHTML = '';

        if (
            !dados.objetos ||
            dados.objetos.length === 0
        ) {

            lista.innerHTML = `
            <div class="semObjetos">
                <div class="emoji">📦</div>
                <h2>Nenhum objeto encontrado</h2>
                <p>Você ainda não cadastrou itens</p>
            </div>
            `;

            return;
        }

        dados.objetos.forEach(obj => {

            lista.innerHTML += `
            <div class="card">

                <div class="perfil">

                    <div class="editar"
                    onclick="abrirEditar(${obj.id_objeto})">
                        ✏
                    </div>

                    <div class="foto"></div>

                    <div>
                        <b>${obj.nome_encontrou}</b><br>

                        <small>
                            ${obj.ra_encontrou}
                        </small><br>

                        <small>
                            ${obj.email_encontrou}
                        </small>
                    </div>

                </div>

                <h2>${obj.nome_objeto}</h2>

                <p>${obj.descricao}</p>

                <p>
                <b>Encontrado:</b>
                ${obj.local_encontrado}
                </p>

                <p>
                <b>Deixado:</b>
                ${obj.onde_deixou}
                </p>

                <p>
                📞 ${obj.contato_encontrou}
                </p>

                <p>
                🎓 ${obj.curso_encontrou}
                </p>

            </div>
            `;
        });

    } catch(error){

        console.log(error);

    }
}

carregarObjetos();



const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
const fecharMenu = document.getElementById('fecharMenu');

menuBtn.onclick=()=>{

    menu.classList.add('ativo');
    menuBtn.style.display='none';

}

fecharMenu.onclick=()=>{

    menu.classList.remove('ativo');
    menuBtn.style.display='block';

}

document.getElementById(
'btnSair'
).onclick=()=>{

    localStorage.clear();

    window.location.href=
    '../index.html';

}


// ================= CADASTRAR =================

document.getElementById(
'addBtn'
).onclick=()=>{

document.getElementById(
'modalObjeto'
).style.display='flex';

}

function fecharObjeto(){

document.getElementById(
'modalObjeto'
).style.display='none';

}


document.getElementById(
'salvarObjeto'
).onclick=async()=>{

const data={

nome_objeto:
document.getElementById(
"nome"
).value,

descricao:
document.getElementById(
"descricao"
).value,

local_encontrado:
document.getElementById(
"local"
).value,

onde_deixou:
document.getElementById(
"deixou"
).value,

encontrado_por:
Number(usuarioId)

};


try{

await fetch(

"http://localhost:8000/Objeto",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(data)

}

);

Swal.fire({

icon:'success',

title:'Objeto cadastrado',

timer:1500,

showConfirmButton:false

});

fecharObjeto();

carregarObjetos();

}catch(error){

console.log(error);

}

}

async function carregarUsuarios(){

    try{

        const resposta=
        await fetch(
            "http://localhost:8000/Todos"
        );

        const dados=
        await resposta.json();

        console.log(dados);

        const select=
        document.getElementById(
            "quemRecuperou"
        );

        if(!select){

            console.log(
            "Select quemRecuperou não existe"
            );

            return;

        }

        select.innerHTML=`
        <option value="">
            Selecione quem recuperou
        </option>
        `;

        dados.pessoas.forEach(pessoa=>{

            select.innerHTML += `
            <option value="${pessoa.id_pessoa}">
                ${pessoa.nome}
            </option>
            `;

        });

    }

    catch(error){

        console.log(
            "Erro ao carregar usuários:",
            error
        );

    }

}




async function abrirEditar(id){

try{

objetoSelecionado=id;

await carregarUsuarios();


const resposta=
await fetch(
`http://localhost:8000/Objeto/${usuarioId}`
);

const dados=
await resposta.json();


const objeto=
dados.objetos.find(
obj=>obj.id_objeto==id
);


if(!objeto){

Swal.fire({

icon:'error',

title:'Objeto não encontrado'

});

return;

}


document.getElementById(
"editNome"
).value=
objeto.nome_objeto || "";


document.getElementById(
"editDescricao"
).value=
objeto.descricao || "";


document.getElementById(
"editLocal"
).value=
objeto.local_encontrado || "";


document.getElementById(
"editDeixou"
).value=
objeto.onde_deixou || "";


document.getElementById(
"editRecuperado"
).checked=
objeto.ja_recuperado==1;


document.getElementById(
"quemRecuperou"
).value=
objeto.recuperado_por || "";


document.getElementById(
"modalEditar"
).style.display='flex';


}catch(error){

console.log(error);

}

}


function fecharEditar(){

document.getElementById(
'modalEditar'
).style.display='none';

}



// ================= SALVAR EDIÇÃO =================

document.getElementById(
"salvarEdicao"
).onclick=async()=>{


const data={

id_objeto:
objetoSelecionado,

nome_objeto:
document.getElementById(
"editNome"
).value,

descricao:
document.getElementById(
"editDescricao"
).value,

local_encontrado:
document.getElementById(
"editLocal"
).value,

onde_deixou:
document.getElementById(
"editDeixou"
).value,


ja_recuperado:
document.getElementById(
"editRecuperado"
).checked ? 1 : 0,


recuperado_por:
document.getElementById(
"quemRecuperou"
).value || null

};


try{

await fetch(

"http://localhost:8000/ObjetoA",

{

method:"PUT",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(data)

}

);


Swal.fire({

icon:'success',

title:'Objeto atualizado!',

timer:1500,

showConfirmButton:false

});


fecharEditar();

setTimeout(()=>{

window.location.reload();

},1500);

}
catch(error){

console.log(error);

}

};