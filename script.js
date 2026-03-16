// ===== FUNÇÃO PARA MUDAR A COR DOS CARDS AO CLICAR =====
// Esta função é chamada quando clicamos em qualquer card
function mudarCor(elemento) {
    // Array com cores vibrantes para alternar
    const cores = [
        'linear-gradient(135deg, #4CAF50, #FFC107)', // Verde para Amarelo
        'linear-gradient(135deg, #64B5F6, #4CAF50)', // Azul para Verde
        'linear-gradient(135deg, #FFC107, #1565C0)', // Amarelo para Azul escuro
        'linear-gradient(135deg, #2E7D32, #64B5F6)', // Verde escuro para Azul claro
        'linear-gradient(135deg, #1565C0, #FFC107)'  // Azul escuro para Amarelo
    ];

    // Pega uma cor aleatória do array
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    // Aplica a nova cor ao elemento clicado
    elemento.style.background = corAleatoria;
    elemento.style.color = '#333';
    elemento.style.transition = 'all 0.5s';

    // Cria um efeito de clique (feedback visual)
    elemento.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elemento.style.transform = 'scale(1)';
    }, 200);

    // Mostra uma mensagem no console (útil para debug)
    console.log('Card clicado! Cor alterada para:', corAleatoria);
}

// ===== FUNÇÃO PARA O MENU HAMBURGUER =====
// Esta função controla o menu mobile
function toggleMenu() {
    const menuLista = document.querySelector('.menu-lista');
    const barras = document.querySelectorAll('.barra');

    // Alterna a classe 'ativo' no menu (mostra/esconde)
    menuLista.classList.toggle('ativo');

    // Anima as barras do menu hamburguer (cria um X)
    barras.forEach(barra => barra.classList.toggle('ativo'));

    // Muda a cor das barras quando o menu está aberto
    if (menuLista.classList.contains('ativo')) {
        barras.forEach(barra => {
            barra.style.backgroundColor = '#FFC107'; // Amarelo
        });
    } else {
        barras.forEach(barra => {
            barra.style.backgroundColor = '#FFFFFF'; // Branco
        });
    }
}

// ===== FECHAR O MENU AO CLICAR EM UM LINK =====
// Adiciona evento para todos os links do menu
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        const menuLista = document.querySelector('.menu-lista');
        const barras = document.querySelectorAll('.barra');

        // Fecha o menu mobile quando clicar em um link
        menuLista.classList.remove('ativo');

        // Volta as barras para a cor original
        barras.forEach(barra => {
            barra.style.backgroundColor = '#FFFFFF';
        });
    });
});

// ===== SCROLL SUAVE PARA OS LINKS DO MENU =====
// Quando clicar em um link, a página rola suavemente até a seção
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calcula a posição considerando o menu fixo
            const headerHeight = document.querySelector('.cabecalho').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            // Rola suavemente até a posição calculada
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== EFEITO DE APARECER NA TELA =====
// Detecta quando os elementos entram na tela e adiciona animação
window.addEventListener('load', () => {
    // Seleciona todos os cards
    const cards = document.querySelectorAll('.card, .grid-item, .card-conclusao');

    // Criando um observador de interseção
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento está visível, adiciona classe de animação
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Aplica o observador em cada card
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s';
        observer.observe(card);
    });
});

// ===== RELÓGIO OU DATA (OPCIONAL) =====
// Adiciona uma pequena informação de data no rodapé
function atualizarData() {
    const data = new Date();
    const ano = data.getFullYear();
    const rodape = document.querySelector('.rodape p');
    if (rodape) {
        rodape.innerHTML = `Trabalho escolar - 2º ano Ensino Médio | Sustentabilidade no Paraná | ${ano}`;
    }
}

// Chama a função quando a página carrega
atualizarData();

// ===== MENSAGEM DE BOAS-VINDAS (UMA VEZ POR SESSÃO) =====
// Verifica se já mostramos a mensagem nessa sessão
if (!sessionStorage.getItem('bemVindoMostrado')) {
    // Cria um elemento de alerta personalizado
    const alerta = document.createElement('div');
    alerta.style.position = 'fixed';
    alerta.style.top = '100px';
    alerta.style.right = '20px';
    alerta.style.background = 'linear-gradient(135deg, #4CAF50, #FFC107)';
    alerta.style.color = '#333';
    alerta.style.padding = '15px 25px';
    alerta.style.borderRadius = '10px';
    alerta.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    alerta.style.zIndex = '9999';
    alerta.style.fontWeight = 'bold';
    alerta.style.cursor = 'pointer';
    alerta.innerHTML = '🌱 Clique nos cards e veja as cores mudarem! 🌱';

    // Adiciona ao corpo da página
    document.body.appendChild(alerta);

    // Remove após 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);

    // Remove se clicar
    alerta.addEventListener('click', () => {
        alerta.remove();
    });

    // Marca que já mostramos
    sessionStorage.setItem('bemVindoMostrado', 'true');
}