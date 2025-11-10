const tableBody = document.getElementById('request-list');
const loadingMsg = document.getElementById('loading-message');
const refreshBtn = document.getElementById('btn-refresh');

const requests = [
    { id: 101, nome: "João Silva", data: "20/10/2025", status: "Pendente" },
    { id: 102, nome: "Maria Oliveira", data: "21/10/2025", status: "Aprovada" },
    { id: 103, nome: "Carlos Souza", data: "25/10/2025", status: "Em andamento" }
];

function renderRequests() {
    tableBody.innerHTML = '';
    requests.forEach(req => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${req.nome}</td>
            <td>${req.data}</td>
            <td><span class="status ${req.status.toLowerCase().replace(' ', '-')}">${req.status}</span></td>
            <td>
                <button onclick="alert('Visualizar ${req.id}')">👁️</button>
                <button onclick="alert('Excluir ${req.id}')">🗑️</button>
                <button onclick="alert('? ${req.id}')">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

refreshBtn.addEventListener('click', () => {
    loadingMsg.style.display = 'block';
    tableBody.innerHTML = '';
    setTimeout(() => {
        renderRequests();
        loadingMsg.style.display = 'none';
    }, 800);
});

// Renderiza ao abrir
renderRequests();
