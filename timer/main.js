"use strict";

let timerHours = 0;
let timerMinutes = 0;
let timerSeconds = 0;
let timer = 0;
// showTimer();

document.querySelectorAll('.setting_time').forEach(element => {
    element.addEventListener('click', upTime)
    element.addEventListener('contextmenu', downTime);
    element.addEventListener('dblclick', fn);
});

const elHours = document.querySelector('#hours');
const elMinutes = document.querySelector('#minutes');
const elSeconds = document.querySelector('#seconds');

function upTime(event){
    console.log(event.target)
    console.log(event.target.id)
    const shift = event.shiftKey * 9 + 1;
    console.log(shift);
    switch (event.target.id)
    {
        case 'hours':
        {
            timerHours += shift;
            if (timerHours > 99)
            {
                timerHours -= 100;
            }
            setTimer();
            break;
        }

        case 'minutes':
        {
            timerMinutes += shift;
            if (timerMinutes > 59)
            {
                timerMinutes -= 60;
            }
            setTimer();
            break;
        }

        case 'seconds':
        {
            timerSeconds += shift;
            if (timerSeconds > 59)
            {
                timerSeconds -= 60;
            }
            setTimer();
            break;
        }
    }
    event.preventDefault();
}

function downTime(event){
    const shift = event.shiftKey * 9 + 1;
    switch (event.target.id)
    {
        case 'hours': {
            timerHours -= shift;
            if (timerHours < 0) {
                timerHours += 100;
            }
            setTimer();
            break;
        }

        case 'minutes': {
            timerMinutes -= shift;
            if (timerMinutes < 0) {
                timerMinutes += 60;
            }
            setTimer();
            break;
        }

        case 'seconds': {
            timerSeconds -= shift;
            if (timerSeconds < 0) {
                timerSeconds += 60;
            }
            setTimer();
            break;
        }
    }
    event.preventDefault();
}

function setTimer(){
    timer = timerSeconds + 60 * timerMinutes + 60 * 60 * timerHours;
    showTimer();
}

function showTimer(){
    elHours.innerText = timerHours < 10 ? '0' + timerHours : timerHours;
    elMinutes.innerText = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;
    elSeconds.innerText = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;
}

function fn (event) {
    // event => event.preventDefault()
    console.log("Двойной клик: ", event);
    event.preventDefault();
}
//
//
// const delta = 1;
// const now = new Date();
// const limit = new Date(now.toTimeString() + 1);
//
// console.log(now.toLocaleString('ru'));
// console.log(limit.toLocaleString('ru'));
// debugger;
// const endTime = new Date(Date.now() + (new Date(1000)).getTime());
// setInterval(()=>
// {
//     console.log((new Date(endTime - new Date())).toLocaleTimeString('ru'))
// }, 1000, endTime)
