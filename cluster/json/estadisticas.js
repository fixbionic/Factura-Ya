document.addEventListener('DOMContentLoaded', () => {
    // Verifica si ya hay backups guardados en localStorage, si no, crea dos ejemplos
    if (!localStorage.getItem('fixbionic_backups')) {
        localStorage.setItem('fixbionic_backups', JSON.stringify([
            { fecha: '2025-07-01', nombre: 'backup_01.json' },
            { fecha: '2025-07-03', nombre: 'backup_02.json' }
        ]));
    }

    const backups = JSON.parse(localStorage.getItem('fixbionic_backups')) || [];
    const tablaBackups = document.getElementById('tabla-backups');
    const totalCopias = document.getElementById('total-copias');

    // Limpia y llena la tabla con las copias de seguridad
    tablaBackups.innerHTML = '';
    backups.forEach((bk, i) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${bk.fecha}</td>
      <td>${bk.nombre}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary">Descargar</button>
      </td>
    `;
        tablaBackups.appendChild(fila);
    });

    // Actualiza el total de copias
    totalCopias.textContent = backups.length;

    // Simula datos de métricas del inventario
    document.getElementById('total-registros').textContent = 12;
    document.getElementById('total-unidades').textContent = 48;
    document.getElementById('valor-total').textContent = '150,000';

    // Genera el gráfico con Chart.js
    const ctx = document.getElementById('graficoAccesorios').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cables', 'Audífonos', 'Cargadores'],
            datasets: [{
                label: 'Inventario',
                data: [12, 15, 21],
                backgroundColor: ['#198754', '#0d6efd', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
});
