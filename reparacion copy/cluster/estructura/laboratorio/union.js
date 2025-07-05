// === GUARDAR COPIA EN LOCALSTORAGE ===
function guardarBackup(tipo, datos) {
  const fecha = new Date().toLocaleString();
  const copia = { tipo, datos, fecha };
  const backups = JSON.parse(localStorage.getItem('copiasSeguridad')) || [];
  backups.push(copia);
  localStorage.setItem('copiasSeguridad', JSON.stringify(backups));
  mostrarCopiasEnLista();
  actualizarGraficoCopias();
}

// === MOSTRAR LISTA DE COPIAS ===
function mostrarCopiasEnLista() {
  const lista = document.getElementById('lista-copias');
  if (!lista) return;
  lista.innerHTML = '';
  const backups = JSON.parse(localStorage.getItem('copiasSeguridad')) || [];
  backups.reverse().forEach(b => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${b.tipo} - ${b.fecha}`;
    lista.appendChild(li);
  });
}

// === GRÁFICO DE COPIAS ===
let graficoCopias = null;
function actualizarGraficoCopias() {
  const canvas = document.getElementById('graficoCopias');
  if (!canvas) return;

  const backups = JSON.parse(localStorage.getItem('copiasSeguridad')) || [];
  const conteo = {};

  backups.forEach(b => {
    const fecha = b.fecha.split(',')[0];
    conteo[fecha] = (conteo[fecha] || 0) + 1;
  });

  const labels = Object.keys(conteo);
  const datos = Object.values(conteo);

  if (graficoCopias) graficoCopias.destroy();

  const ctx = canvas.getContext('2d');
  graficoCopias = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Copias realizadas',
        data: datos,
        backgroundColor: 'rgba(25, 135, 84, 0.6)',
        borderColor: '#198754',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}

// === CONTADOR SEMANAL ===
let intervalo;
function iniciarContadorSemanal() {
  const recordatorioKey = 'ultimoBackup';
  const ahora = Date.now();
  let siguiente = localStorage.getItem(recordatorioKey);

  if (!siguiente) {
    siguiente = ahora + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(recordatorioKey, siguiente);
  } else {
    siguiente = parseInt(siguiente);
  }

  intervalo = setInterval(() => {
    const faltan = siguiente - Date.now();
    const display = document.getElementById('contadorCopia');
    if (!display) return;

    if (faltan <= 0) {
      display.textContent = "¡Haz una copia ahora!";
      return;
    }

    const dias = Math.floor(faltan / (1000 * 60 * 60 * 24));
    const horas = Math.floor((faltan / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((faltan / (1000 * 60)) % 60);
    const segundos = Math.floor((faltan / 1000) % 60);
    display.textContent = `${dias}d ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }, 1000);
}

function reiniciarRecordatorio() {
  const siguiente = Date.now() + 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem('ultimoBackup', siguiente);
  clearInterval(intervalo);
  iniciarContadorSemanal();
}

// === INICIALIZAR TODO AL CARGAR ===
document.addEventListener('DOMContentLoaded', () => {
  mostrarCopiasEnLista();
  actualizarGraficoCopias();
  iniciarContadorSemanal();
});
   


    function guardarBackup(tipo, datos) {
      const fecha = new Date().toLocaleString();
      const copia = { tipo, datos, fecha };
      const backups = JSON.parse(localStorage.getItem('copiasSeguridad')) || [];
      backups.push(copia);
      localStorage.setItem('copiasSeguridad', JSON.stringify(backups));
      mostrarCopiasEnLista();
      actualizarGraficoCopias();
    }

    function mostrarCopiasEnLista() {
      const lista = document.getElementById('lista-copias');
      lista.innerHTML = '';
      const backups = JSON.parse(localStorage.getItem('copiasSeguridad')) || [];
      backups.reverse().forEach(b => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${b.tipo} - ${b.fecha}`;
        lista.appendChild(li);
      });
    }

    let graficoCopias = null;
    function actualizarGraficoCopias() {
      const backups = JSON.parse(localStorage.getItem('copiasSeguridad')) || [];
      const conteo = {};
      backups.forEach(b => {
        const fecha = b.fecha.split(',')[0];
        conteo[fecha] = (conteo[fecha] || 0) + 1;
      });
      const labels = Object.keys(conteo);
      const datos = Object.values(conteo);
      if (graficoCopias) graficoCopias.destroy();
      const ctx = document.getElementById('graficoCopias').getContext('2d');
      graficoCopias = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Copias realizadas',
            data: datos,
            backgroundColor: 'rgba(25, 135, 84, 0.6)',
            borderColor: '#198754',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    let intervalo;
    function iniciarContadorSemanal() {
      const recordatorioKey = 'ultimoBackup';
      const ahora = Date.now();
      let siguiente = localStorage.getItem(recordatorioKey);
      if (!siguiente) {
        siguiente = ahora + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(recordatorioKey, siguiente);
      } else {
        siguiente = parseInt(siguiente);
      }

      intervalo = setInterval(() => {
        const faltan = siguiente - Date.now();
        if (faltan <= 0) {
          document.getElementById('contadorCopia').textContent = "¡Haz una copia ahora!";
          return;
        }
        const dias = Math.floor(faltan / (1000 * 60 * 60 * 24));
        const horas = Math.floor((faltan / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((faltan / (1000 * 60)) % 60);
        const segundos = Math.floor((faltan / 1000) % 60);
        document.getElementById('contadorCopia').textContent = `${dias}d ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      }, 1000);
    }

    function reiniciarRecordatorio() {
      const siguiente = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('ultimoBackup', siguiente);
      clearInterval(intervalo);
      iniciarContadorSemanal();
    }

    document.addEventListener('DOMContentLoaded', () => {
      mostrarCopiasEnLista();
      actualizarGraficoCopias();
      iniciarContadorSemanal();
    });

    