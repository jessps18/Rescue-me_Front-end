const usuarioId = localStorage.getItem('usuarioId');

if (!usuarioId) {
    window.location.href = '../index.html';
}

const listaDenuncias = document.getElementById('listaDenuncias');

async function carregarDenuncias() {

    try {
        const resposta = await fetch(`http://localhost:8000/Denuncia/${usuarioId}`);
        const dados = await resposta.json();
        listaDenuncias.innerHTML = '';
        const denuncias = dados.denuncia; 
        if (!denuncias || denuncias.length === 0) {
            listaDenuncias.innerHTML = `
                <div class="semDenuncias">
                    <div class="emoji">🚨</div>
                    <h2>Nenhuma denúncia encontrada</h2>
                    <p>Você ainda não fez nenhuma denúncia</p>
                </div>
            `;
            return;
        }

        denuncias.forEach(d => {
            listaDenuncias.innerHTML += `
                <div class="card">
                    <h2>${d.titulo}</h2>
                    <p>${d.descricao}</p>
                    <p>
                        <b>ID Objeto:</b> ${d.objeto_id}
                    </p>
                    <p>
                        <b>Status:</b> ${d.status_denuncia}
                    </p>
                    <p>
                        📅 ${d.data_criacao}
                    </p>
                    ${
                        d.justificativa
                        ? `<p><b>Justificativa:</b> ${d.justificativa}</p>`
                        : ''
                    }

                </div>
            `;
        });

    } catch (error) {
        console.log('Erro ao carregar denúncias:', error);
    }
}



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

document.getElementById('btnSair').onclick=()=>{
    localStorage.clear();
    window.location.href=
    '../index.html';
}
carregarDenuncias();