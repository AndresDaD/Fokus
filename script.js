document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    let pauseTimeRemaining = 0;
    let currentInterval;

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const habitat = this.dataset.habitat;
            showHabitat(habitat);
        });
    });

    function showHabitat(habitat) {
        const habitats = document.querySelectorAll('.habitats > div');
        habitats.forEach((element) => {
            element.style.display = 'none';
        });

        const activeHabitat = document.getElementById(habitat);
        activeHabitat.style.display = 'flex';

        // Mostrar los botones al seleccionar un hábitat
        const startBtn = document.getElementById(`start-${habitat}`);
        const pauseBtn = document.getElementById(`pause-${habitat}`);
        const resumeBtn = document.getElementById(`resume-${habitat}`);
        const restartBtn = document.getElementById(`restart-${habitat}`);

        showStartButton(startBtn, pauseBtn, resumeBtn, restartBtn);

        // Detener el temporizador actual si existe
        if (currentInterval) {
            clearInterval(currentInterval);
        }
    }

    function showStartButton(startBtn, pauseBtn, resumeBtn, restartBtn) {
        startBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'none';
        restartBtn.style.display = 'none'; // Mostraremos el botón de reinicio cuando sea necesario
    }

    function showPauseButton(startBtn, pauseBtn, resumeBtn, restartBtn) {
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        resumeBtn.style.display = 'none';
        restartBtn.style.display = 'block';
    }

    function showResumeButton(startBtn, pauseBtn, resumeBtn, restartBtn) {
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'block';
        restartBtn.style.display = 'block';
    }

    function showRestartButton(startBtn, pauseBtn, resumeBtn, restartBtn) {
        startBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'none';
        restartBtn.style.display = 'block';
    }

    // Función para iniciar o pausar el temporizador
    function toggleTimer(duration, display, startBtn, pauseBtn, resumeBtn, restartBtn) {
        let timer = duration, minutes, seconds;
        currentInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(currentInterval);
                showRestartButton(startBtn, pauseBtn, resumeBtn, restartBtn);
                enableButtons(startBtn, pauseBtn, resumeBtn, restartBtn);
            }
        }, 1000);
    }

    // Enfoque
    const enfoqueTimer = document.getElementById('enfoque-timer')
    const startEnfoqueBtn = document.getElementById('start-enfoque');
    const pauseEnfoqueBtn = document.getElementById('pause-enfoque');
    const resumeEnfoqueBtn = document.getElementById('resume-enfoque');
    const restartEnfoqueBtn = document.getElementById('restart-enfoque');

    startEnfoqueBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showPauseButton(startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
        toggleTimer(25 * 60, enfoqueTimer, startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
    });

    pauseEnfoqueBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showResumeButton(startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
        clearInterval(currentInterval);
        pauseTimeRemaining = getTimeInSeconds(enfoqueTimer);
    });

    resumeEnfoqueBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showPauseButton(startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
        toggleTimer(pauseTimeRemaining, enfoqueTimer, startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
    });

    restartEnfoqueBtn.addEventListener('click', function () {
        const button = this;
        showStartButton(startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
        clearInterval(currentInterval);
        enfoqueTimer.textContent = '25:00';
        enableButtons(startEnfoqueBtn, pauseEnfoqueBtn, resumeEnfoqueBtn, restartEnfoqueBtn);
    });

    // Descanso Corto
    const descansoCortoTimer = document.getElementById('descanso-corto-timer');
    const startDescansoCortoBtn = document.getElementById('start-descanso-corto');
    const pauseDescansoCortoBtn = document.getElementById('pause-descanso-corto');
    const resumeDescansoCortoBtn = document.getElementById('resume-descanso-corto');
    const restartDescansoCortoBtn = document.getElementById('restart-descanso-corto');

    startDescansoCortoBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showPauseButton(startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
        toggleTimer(5 * 60, descansoCortoTimer, startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
    });

    pauseDescansoCortoBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showResumeButton(startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
        clearInterval(currentInterval);
        pauseTimeRemaining = getTimeInSeconds(descansoCortoTimer);
    });

    resumeDescansoCortoBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showPauseButton(startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
        toggleTimer(pauseTimeRemaining, descansoCortoTimer, startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
    });

    restartDescansoCortoBtn.addEventListener('click', function () {
        const button = this;
        showStartButton(startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
        clearInterval(currentInterval);
        descansoCortoTimer.textContent = '05:00';
        enableButtons(startDescansoCortoBtn, pauseDescansoCortoBtn, resumeDescansoCortoBtn, restartDescansoCortoBtn);
    });

    // Descanso Largo
    const descansoLargoTimer = document.getElementById('descanso-largo-timer');
    const startDescansoLargoBtn = document.getElementById('start-descanso-largo');
    const pauseDescansoLargoBtn = document.getElementById('pause-descanso-largo');
    const resumeDescansoLargoBtn = document.getElementById('resume-descanso-largo');
    const restartDescansoLargoBtn = document.getElementById('restart-descanso-largo');

    startDescansoLargoBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showPauseButton(startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
        toggleTimer(15 * 60, descansoLargoTimer, startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
    });

    pauseDescansoLargoBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showResumeButton(startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
        clearInterval(currentInterval);
        pauseTimeRemaining = getTimeInSeconds(descansoLargoTimer);
    });

    resumeDescansoLargoBtn.addEventListener('click', function () {
        const button = this;
        button.style.display = 'none';
        showPauseButton(startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
        toggleTimer(pauseTimeRemaining, descansoLargoTimer, startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
    });

    restartDescansoLargoBtn.addEventListener('click', function () {
        const button = this;
        showStartButton(startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
        clearInterval(currentInterval);
        descansoLargoTimer.textContent = '15:00';
        enableButtons(startDescansoLargoBtn, pauseDescansoLargoBtn, resumeDescansoLargoBtn, restartDescansoLargoBtn);
    });

    // Función para obtener el tiempo en segundos desde el temporizador en formato MM:SS
    function getTimeInSeconds(timerDisplay) {
        const minutesSeconds = timerDisplay.textContent.split(':');
        const minutes = parseInt(minutesSeconds[0], 10);
        const seconds = parseInt(minutesSeconds[1], 10);
        return minutes * 60 + seconds;
    }

    function enableButtons(startBtn, pauseBtn, resumeBtn, restartBtn) {
        startBtn.removeAttribute('disabled');
        pauseBtn.removeAttribute('disabled');
        resumeBtn.removeAttribute('disabled');
        restartBtn.removeAttribute('disabled');
    }

    function disableButtons(startBtn, pauseBtn, resumeBtn, restartBtn) {
        startBtn.setAttribute('disabled', 'disabled');
        pauseBtn.setAttribute('disabled', 'disabled');
        resumeBtn.setAttribute('disabled', 'disabled');
        restartBtn.setAttribute('disabled', 'disabled');
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
});
