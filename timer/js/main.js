"use strict";

import Timer from "./Timer.js";

const timer = new Timer();

document.querySelector('#run')
    .addEventListener('click', (event) => bnRunClick(event.target));
document.querySelector('#info')
    .addEventListener('click', () => showInfo());

function showInfo(){
    document.querySelector('#cbInfo').click();
}

function bnRunClick(target){
    switch (target.dataset.state)
    {
        case 'ready':
        {
            timer.run();
            target.dataset.state = 'run';
            target.textContent = 'Остановить';
            break;
        }
        case 'run':
        {
            timer.stop();
            target.dataset.state = 'stopped';
            target.textContent = 'Сбросить';
            break;
        }
        case 'stopped':
        {
            timer.reset();
            target.dataset.state = 'ready';
            target.textContent = 'Запустить';
            break;
        }
    }
}
