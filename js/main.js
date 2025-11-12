const main = document.getElementById('main-content');
const links = document.querySelectorAll('.nav-link, .dropdown-menu a');

let currentPage = '';

links.forEach(link => {
    link.addEventListener('click', async e => {
        e.preventDefault();
        const url = link.getAttribute('href');

        console.log('Carregando URL:', url);

        const isDropdownToggle = link.closest('.dropdown') && link.classList.contains('nav-link');
        if (isDropdownToggle || url === '#') { link.parentElement.classList.toggle('open'); return; }

        if (!url || url === 'home.html') {
            console.log('Redirecionando para a home...');
            window.location.href = 'home.html';
            return;
        }

        if (url === currentPage) {
            console.log('Página já está carregada:', url);
            return;
        }

        main.innerHTML = "<p>🔄 Carregando...</p>";

        try {
            console.log('Iniciando fetch para URL:', url);
            const response = await fetch(url);
            console.log('Status da resposta:', response.status);

            if (!response.ok) {
                console.error('Erro ao carregar a página:', response.status);
                throw new Error('Erro ao carregar ' + url);
            }

            const html = await response.text();
            main.innerHTML = html;

            currentPage = url;

            main.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                    newScript.onload = () => console.log(`Script carregado: ${oldScript.src}`);
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                document.body.appendChild(newScript);
            });

        } catch (err) {
            main.innerHTML = "<p>❌ Erro ao carregar a páginaaa.</p>";
            console.error(err);
        }
    });
});


function loadLottieAnimation(containerId, path, preserve = true) {
    lottie.loadAnimation({
        container: document.getElementById(containerId),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path,
        rendererSettings: preserve ? { preserveAspectRatio: 'xMidYMid slice' } : {}
    });
}

loadLottieAnimation('lottie-background', 'css/images/fundo_lottie.json');
loadLottieAnimation('lottie-login', 'css/images/login_lottie.json');


lottie.loadAnimation({
  container: document.getElementById('lottie-register'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'css/images/register_lottie.json',
  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
});

lottie.loadAnimation({
  container: document.getElementById('lottie-body2'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'css/images/register_lottie.json',
  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
});



const sidebar = document.querySelector('.sidebar');
const topBar = document.querySelector('.top-bar');
const mainContent = document.querySelector('.main-content');
const toggleButton = document.querySelector('.top-bar .icons');

toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('collapsed');
    topBar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
});

sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});


const searchInput = document.getElementById('search');
const tableElement = document.getElementById('reportTable');

if (searchInput && tableElement) {
    const table = tableElement.getElementsByTagName('tbody')[0];
    searchInput.addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }
            rows[i].style.display = match ? '' : 'none';
        }
    });
}
