class Timer{

    constructor(elementId = "timer"){
        this.MAX_HOURS = 100 * 60 * 60;
        this.timer = 0;
        this.elTimer = document.getElementById(elementId);
        this.timeInterval = null;

        //Colors
        this.timerColorGreen = [0, 187, 0];
        this.timerColorYellow = [255, 128, 0];
        this.timerColorRed = [170, 0, 85];
        this.timerColor = [0, 187, 0];


        this.timeStart = 0;

        this.init();
        this.render();
    }

    init()
    {

        this.setTimerColor();

        this.elHours = document.createElement('span');
        this.elHours.dataset.delta = '3600';
        this.elHours.dataset.max = String(this.MAX_HOURS);
        this.initElement(this.elHours);


        this.elMinutes = document.createElement('span');
        this.elMinutes.dataset.delta = '60';
        this.elMinutes.dataset.max = '3600';
        this.initElement(this.elMinutes);

        this.elSeconds = document.createElement('span');
        this.elSeconds.dataset.delta = '1';
        this.elSeconds.dataset.max = '60';
        this.initElement(this.elSeconds);

        this.elTimer.insertAdjacentElement('beforeend', this.elHours);
        this.elTimer.insertAdjacentText('beforeend', ':');
        this.elTimer.insertAdjacentElement('beforeend', this.elMinutes);
        this.elTimer.insertAdjacentText('beforeend', ':');
        this.elTimer.insertAdjacentElement('beforeend', this.elSeconds);
    }

    initElement(element)
    {
        element.textContent = '00';
        element.addEventListener('click', event => this.eventUpTime(event));
        element.addEventListener('contextmenu', event => this.eventDownTime(event));
        element.addEventListener('dblclick', event => event.preventDefault());
    }

    eventUpTime(event)
    {
        if (this.timeInterval != null) return;

        this.timer += +event.target.dataset.delta * (event.shiftKey ? 10 : 1);
        this.timer = this.getValidatedTimer(+event.target.dataset.max);
        this.render();
    }

    eventDownTime(event)
    {
        event.preventDefault();
        if (this.timeInterval != null) return;

        this.timer -= +event.target.dataset.delta * (event.shiftKey ? 10 : 1);
        this.timer = this.getValidatedTimer(+event.target.dataset.max);

        this.render();
    }

    getValidatedTimer(max)
    {
        if (this.timer < 0) return this.timer + max;
        if (this.timer >= this.MAX_HOURS) return this.timer - this.MAX_HOURS;

        return this.timer;
    }

    run()
    {
        this.timeInterval = setInterval(
            () =>
            {
                this.timer--;
                this.calcTimerColor();
                this.setTimerColor();
                this.render();
            }, 1000
        );
        this.timeStart = this.timer;
    }

    stop()
    {
        if (this.timeInterval != null)
        {
            clearInterval(this.timeInterval);
        }
    }

    reset()
    {
        this.timer = 0;
        this.render();
        this.timeInterval = null;
    }

    render()
    {
        const seconds = Math.abs(this.timer) % 60;
        const minutes = Math.floor(Math.abs(this.timer) % 3600 / 60);
        const hours = Math.floor(Math.abs(this.timer) / 3600);

        this.elSeconds.textContent = this.constructor.addZeroInStr(seconds);
        this.elMinutes.textContent = this.constructor.addZeroInStr(minutes);
        this.elHours.textContent = (this.timer < 0 ? '-' : '') + this.constructor.addZeroInStr(hours);
    }

    static addZeroInStr(value)
    {
        return +value < 10 ? '0' + value : value;
    }

    calcTimerColor()
    {
        if (this.timer < 0) return;
        if (this.timer > this.timeStart / 2){
            this.timerColorGreen.forEach((el, idx) =>
            {
                const step = (this.timerColorYellow[idx] - el) / this.timeStart * 2;
                this.timerColor[idx] = el + step * (this.timeStart - this.timer);
            })
        }else{
            this.timerColorYellow.forEach((el, idx) =>
            {
                const step = (this.timerColorRed[idx] - el) / this.timeStart * 2;
                this.timerColor[idx] = el + step * (this.timeStart / 2 - this.timer);
            })
        }
    }

    setTimerColor()
    {
        this.elTimer.style.color = `rgba(${this.timerColor[0]}, ${this.timerColor[1]}, ${this.timerColor[2]})`;
    }

}

export default Timer;