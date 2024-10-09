export class Stopwatch {
    // const
    MILLISECOND = 10

    // values
    minutes = 0
    seconds = 0
    milliseconds = 0

    stopwatchInterval = null

    circle = 0

    constructor() {
        this.startButtonElement = document.querySelector('.stopwatch__button--start')
        this.stopButtonElement = document.querySelector('.stopwatch__button--stop')
        this.makeCircleButtonElement = document.querySelector('.stopwatch__button--make-circle')

        this.stopButtonElement.disabled = true
        this.makeCircleButtonElement.disabled = true

        this.startButtonElement.addEventListener('click', () => {
            this.startStopwatch()
        })

        this.stopButtonElement.addEventListener('click', () => {
            this.stopStopwatch()
        })

        this.makeCircleButtonElement.addEventListener('click', () => {
            this.makeCircle()
        })

        this.outputTimeElement = document.querySelector('.stopwatch__output')
        this.outputCircleElement = document.querySelector('.stopwatch__circles')
    }

    showMinutesAndSeconds() {
        let customeMinutes = this.minutes
        let customeSeconds = this.seconds
        let customeMilliseconds = this.milliseconds

        if (customeMinutes < 10) customeMinutes = `0${customeMinutes}`
        if (customeSeconds < 10) customeSeconds = `0${customeSeconds}`
        if (customeMilliseconds < 10) customeMilliseconds = `0${customeMilliseconds}`

        this.outputTimeElement.textContent = `${customeMinutes}:${customeSeconds}:${customeMilliseconds}`
    }

    startStopwatch() {
        clearInterval(this.stopwatchInterval)
        this.startButtonElement.disabled = true
        this.stopButtonElement.disabled = false
        this.makeCircleButtonElement.disabled = false

        this.stopwatchInterval = setInterval(() => {
            if (this.milliseconds === 99) {
                this.seconds++

                this.milliseconds = 0
            } else {
                this.milliseconds++
            }

            if (this.seconds === 59) {
                this.minutes++

                this.seconds = 0
            }

            this.showMinutesAndSeconds()
        }, this.MILLISECOND)
    }

    stopStopwatch() {
        clearInterval(this.stopwatchInterval)
        this.stopButtonElement.disabled = true
        this.makeCircleButtonElement.disabled = true
        this.startButtonElement.disabled = false

        this.minutes = 0
        this.seconds = 0

        this.outputTimeElement.textContent = `00:00:00`
    }

    makeCircle() {
        let timeToInsert = ''

        let customeMinutes = this.minutes
        let customeSeconds = this.seconds
        let customeMilliseconds = this.milliseconds

        if (customeMinutes < 10) customeMinutes = `0${customeMinutes}`
        if (customeSeconds < 10) customeSeconds = `0${customeSeconds}`
        if (customeMilliseconds < 10) customeMilliseconds = `0${customeMilliseconds}`



        const circleHTML = `<div class="stopwatch__circle">
            <p class="stopwatch__circle-name">Circle ${++this.circle}</p>

            <p class="stopwatch__circle-info">${customeMinutes}:${customeSeconds}:${customeMilliseconds}</p>
        </div>`

        this.outputCircleElement.insertAdjacentHTML('beforeend', circleHTML)
    }
}

export default Stopwatch