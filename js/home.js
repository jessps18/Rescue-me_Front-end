const usuarioId = localStorage.getItem('usuarioId');

if (!usuarioId) {
    window.location.href = '../index.html';
}

const lista = document.getElementById('listaObjetos');

async function carregarObjetos() {

    try {
        const resposta = await fetch('http://localhost:8000/Objetos');
        const dados = await resposta.json();

        lista.innerHTML = '';

        dados.objetos.forEach(obj => {

            lista.innerHTML += `
            <div class="card">

                <div class="denuncia" onclick="abrirDenuncia(${obj.id_objeto})">⚠</div>

                <div class="perfil">
                    <div class="foto"></div>
                    <div>
                        <b>${obj.encontrado_por_nome}</b><br>
                        <small>${obj.encontrado_por_ra}</small><br>
                        <small>${obj.encontrado_por_email}</small>
                    </div>
                </div>

                <h2>${obj.nome_objeto}</h2>
                <p>${obj.descricao}</p>

                <p><b>Encontrado:</b> ${obj.local_encontrado}</p>
                <p><b>Deixado:</b> ${obj.onde_deixou}</p>

                <p>📞 ${obj.encontrado_por_numero}</p>
                <p>🎓 ${obj.encontrado_por_curso}</p>

            </div>`;
        });

    } catch (error) {
        console.log(error);
    }
}

carregarObjetos();


document.getElementById('addBtn').onclick = () => {
    document.getElementById('modalObjeto').style.display = 'flex';
};


window.addEventListener("DOMContentLoaded", () => {

    document.getElementById('salvarObjeto').onclick = async () => {

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const local = document.getElementById("local").value;
        const deixou = document.getElementById("deixou").value;
        const usuarioId = Number(localStorage.getItem('usuarioId'));

        const data = {
            nome_objeto: nome,
            descricao: descricao,
            local_encontrado: local,
            onde_deixou: deixou,
            encontrado_por: usuarioId
        };

        try {
            const response = await fetch("http://localhost:8000/Objeto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);

            document.getElementById('modalObjeto').style.display = 'none';

            document.getElementById("nome").value = "";
            document.getElementById("descricao").value = "";
            document.getElementById("local").value = "";
            document.getElementById("deixou").value = "";

            Swal.fire({
                icon: 'success',
                title: 'Objeto cadastrado!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })

            // atualiza lista sem reload
            carregarObjetos();

        } catch (error) {
            console.error("Erro ao cadastrar objeto:", error);
        }
    };
});

function fecharObjeto() {
    document.getElementById('modalObjeto').style.display = 'none';
}


function abrirDenuncia(id) {
    localStorage.setItem('idObjeto', id);
    document.getElementById('modalDenuncia').style.display = 'flex';
}

document.getElementById('salvarDenuncia').onclick = async () => {

    const descricao = document.getElementById('descricaoDenuncia').value;
    const objetoId = Number(localStorage.getItem('idObjeto'));
    const usuarioId = Number(localStorage.getItem('usuarioId'));

    const data = {
        titulo: "Denúncia de objeto",
        descricao: descricao,
        objeto_id: objetoId,
        denunciante: usuarioId
    };

    try {
        const response = await fetch("http://localhost:8000/DenunciasP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        // fechar modal
        document.getElementById('modalDenuncia').style.display = 'none';

        // limpar campo
        document.getElementById('descricaoDenuncia').value = "";

       Swal.fire({
                icon: 'success',
                title: 'Denuncia enviada com sucesso!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })

    } catch (error) {
        console.error("Erro ao enviar denúncia:", error);
    }
};

function fecharDenuncia() {
    document.getElementById('modalDenuncia').style.display = 'none';
}


const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
const fecharMenu = document.getElementById('fecharMenu');

menuBtn.onclick = () => {

    menu.classList.add('ativo');

    menuBtn.style.display = 'none';
}

fecharMenu.onclick = () => {

    menu.classList.remove('ativo');

    menuBtn.style.display = 'block';
}

document.getElementById('btnSair').onclick = () => {

    localStorage.clear();

    window.location.href = '../index.html';
};