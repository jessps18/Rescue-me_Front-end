document.getElementById("login").addEventListener("click", async () => {

    const login = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!login || !senha) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Preencha todos os campos'
        });
        return;
    }

    try {

        const resposta = await fetch('http://localhost:8000/Login',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    senha: senha
                })
            });

        const dados = await resposta.json();

        if (
            dados.status === 200
        ) {
            Swal.fire({
                icon: 'success',
                title: 'Login realizado',
                text: 'Entrando...',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {

                localStorage.setItem('usuario', JSON.stringify(dados.usuario));
                localStorage.setItem('usuarioId', dados.usuario.id_pessoa);
                window.location.href = './html/home.html';
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text:
                    dados.error ||
                    'Credenciais inválidas'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro no servidor'
        });

    }
})

const eyeLogin = document.getElementById('eyeLogin');
let senhaVisivelLogin = false;
eyeLogin.addEventListener('click', () => {
    const inputSenha = document.getElementById('senha');
    senhaVisivelLogin = !senhaVisivelLogin;
    inputSenha.type = senhaVisivelLogin ? 'text' : 'password';
    eyeLogin.src = senhaVisivelLogin ? './imagens/view.png' : './imagens/eye.png';
});

