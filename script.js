let isMinimalMode = false;

function toggleMode() {
    const body = document.body;

    if (isMinimalMode) {
        body.classList.remove('minimal-mode');
    } else {
        body.classList.add('minimal-mode');
    }

    isMinimalMode = !isMinimalMode;
}

function updateTime() {
    const now = new Date();

    // Hora actual de Madrid
    const madridTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Madrid"}));
    const timeString = madridTime.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    document.getElementById('current-time').textContent = timeString;

    // Fecha actual
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Madrid'
    };

    const dateString = madridTime.toLocaleDateString('es-ES', dateOptions);
    const weekNumber = getWeekNumber(madridTime);

    document.getElementById('current-date').textContent =
        `${dateString.charAt(0).toUpperCase() + dateString.slice(1)}, Semana ${weekNumber}`;

    // Actualizar horas mundiales
    updateWorldTimes(now);
}

function updateWorldTimes(baseTime) {
    const cities = [
        { name: 'Pekín', timezone: 'Asia/Shanghai' },
        { name: 'Tokio', timezone: 'Asia/Tokyo' },
        { name: 'Nueva York', timezone: 'America/New_York' },
        { name: 'Los Ángeles', timezone: 'America/Los_Angeles' },
        { name: 'Londres', timezone: 'Europe/London' }
    ];

    const cityElements = document.querySelectorAll('.city-time');

    cities.forEach((city, index) => {
        if (cityElements[index]) {
            const cityTime = new Date(baseTime.toLocaleString("en-US", {timeZone: city.timezone}));
            const timeString = cityTime.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            cityElements[index].querySelector('.city-hour').textContent = timeString;
        }
    });
}

function getWeekNumber(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
}

// Inicializar y actualizar cada segundo
updateTime();
setInterval(updateTime, 1000);


// Prevenir la selección de texto al hacer clic
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Añadir cursor pointer a todo el container
document.getElementById('container').style.cursor = 'pointer';